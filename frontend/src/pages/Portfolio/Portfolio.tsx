import { Form, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import { CreatePortfolioDTO, PortfolioDTO } from "./models/types";
import EmptyState from "./partials/EmptyState";
import LoadingState from "./partials/LoadingState";
import PortfolioForm from "./partials/PortfolioForm";
import { portfolioService } from "./services/portfolioService";
import { portfolioUseCase } from "./usecases/portfolioUseCase";

const Portfolio: React.FC = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<PortfolioDTO | null>(null);
  const { accountId } = useAuthStore();
  const { id } = useParams<{ id: string }>();
  const [submittingForVerification, setSubmittingForVerification] =
    useState(false);

  // Fetch portfolio data on component mount
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const freelancerId = id ? parseInt(id) : accountId;

        if (!freelancerId) {
          throw new Error("No freelancer ID available");
        }

        console.log("Fetching portfolio for freelancer ID:", freelancerId);

        const data = await portfolioUseCase.getPortfolioByFreelancerId(
          freelancerId
        );
        console.log("Portfolio data received:", data);

        // Nếu không tìm thấy portfolio, set portfolio là null và chuyển sang chế độ chỉnh sửa
        if (!data) {
          console.log(`No portfolio found for freelancer ID: ${freelancerId}`);
          setPortfolio(null);
          // Nếu là người dùng hiện tại (không phải xem portfolio của người khác)
          if (!id || parseInt(id) === accountId) {
            setIsEditing(true); // Tự động chuyển sang chế độ chỉnh sửa
            // Khởi tạo form với giá trị mặc định
            form.setFieldsValue({
              title: "",
              description: "",
              skills: [],
              experiences: [],
              certificates: [],
            });
          }
          setLoading(false);
          return;
        }

        setPortfolio(data);

        // Sử dụng hàm parsePortfolioData để phân tích dữ liệu
        const parsedData = portfolioUseCase.parsePortfolioData(data);

        // Set form values
        form.setFieldsValue({
          title: parsedData.title,
          description: parsedData.about,
          skills: parsedData.skills,
          experiences: parsedData.experiences,
          certificates: parsedData.certificates,
        });
      } catch (error: any) {
        // Xử lý lỗi 400 hoặc 404 (không tìm thấy portfolio) một cách thân thiện
        if (
          error.message &&
          (error.message.includes("400") ||
            error.message.includes("404") ||
            error.message.includes("not found") ||
            error.message.includes("No portfolio"))
        ) {
          console.log(
            "No portfolio found or not accessible, showing create form"
          );
          setPortfolio(null);
          // Nếu là người dùng hiện tại (không phải xem portfolio của người khác)
          if (!id || parseInt(id) === accountId) {
            setIsEditing(true); // Tự động chuyển sang chế độ chỉnh sửa
            // Khởi tạo form với giá trị mặc định
            form.setFieldsValue({
              title: "",
              description: "",
              skills: [],
              experiences: [],
              certificates: [],
            });
          }
        } else {
          message.error(
            "An error occurred while loading the portfolio. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [accountId, id, form]);

  const handleSubmit = async (values: any) => {
    try {
      console.log("Form values:", values);
      message.success("Portfolio saved successfully");
      setIsEditing(false);
    } catch (error) {
      message.error("Failed to save portfolio");
    }
  };

  const handleSubmitForReview = async () => {
    try {
      const values = await form.validateFields();
      setSubmittingForVerification(true);

      // Validate title and about length
      if (values.title && values.title.length > 50) {
        message.error("Title must be less than 50 characters");
        setSubmittingForVerification(false);
        return;
      }

      if (values.description && values.description.length > 500) {
        message.error("About must be less than 500 characters");
        setSubmittingForVerification(false);
        return;
      }

      // Sử dụng các hàm tiện ích từ portfolioService để chuyển đổi dữ liệu
      const worksString = portfolioService.parseWorks(
        values.skills || [],
        values.experiences || []
      );

      const certificatesString = portfolioService.parseCertificates(
        values.certificates || []
      );

      // Đảm bảo dữ liệu không bị null hoặc undefined và đúng thứ tự
      const portfolioData: CreatePortfolioDTO = {
        title: values.title || "",
        works: worksString,
        certificate: certificatesString,
        about: values.description || "",
        status: 1, // 1 = Pending for review
      };

      try {
        // Create or update portfolio
        let result;
        if (portfolio && portfolio.portfolioId) {
          // Update existing portfolio
          result = await portfolioUseCase.updatePortfolio(
            portfolio.portfolioId,
            portfolioData
          );
          console.log("Portfolio updated successfully:", result);
          message.success("Portfolio submitted for review successfully");
        } else {
          // Create new portfolio
          result = await portfolioUseCase.createPortfolio(portfolioData);
          console.log("Portfolio created successfully:", result);
          message.success("Portfolio submitted for review successfully");
        }

        setIsEditing(false);

        // Refresh the data
        if (accountId) {
          const refreshedData =
            await portfolioUseCase.getPortfolioByFreelancerId(accountId);
          setPortfolio(refreshedData);

          // Sử dụng hàm parsePortfolioData để phân tích dữ liệu
          const parsedData = portfolioUseCase.parsePortfolioData(refreshedData);

          // Cập nhật form với dữ liệu mới
          form.setFieldsValue({
            title: parsedData.title,
            description: parsedData.about,
            skills: parsedData.skills,
            experiences: parsedData.experiences,
            certificates: parsedData.certificates,
          });
        }
      } catch (error: any) {
        console.error("API Error:", error);
        if (error?.message) {
          if (error.message.includes("System.InvalidOperationException")) {
            message.error("Remote database return 500 again 😥");
          } else {
            const errorMessage = error.message.replace("Error: ", "");
            message.error(errorMessage);
          }
        } else {
          message.error(
            "Failed to submit portfolio for review. Please try again later."
          );
        }
      }
    } catch (formError: any) {
      console.error("Form validation error:", formError);
      message.error("Please complete all required fields before submitting");
    } finally {
      setSubmittingForVerification(false);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      console.log("Form values before processing:", values);

      // Validate title and about length
      if (values.title && values.title.length > 50) {
        message.error("Title must be less than 50 characters");
        setSubmitting(false);
        return;
      }

      if (values.description && values.description.length > 500) {
        message.error("About must be less than 500 characters");
        setSubmitting(false);
        return;
      }

      // Sử dụng các hàm tiện ích từ portfolioService để chuyển đổi dữ liệu
      const worksString = portfolioService.parseWorks(
        values.skills || [],
        values.experiences || []
      );

      const certificatesString = portfolioService.parseCertificates(
        values.certificates || []
      );

      // Đảm bảo dữ liệu không bị null hoặc undefined và đúng thứ tự
      const portfolioData: CreatePortfolioDTO = {
        title: values.title || "",
        works: worksString,
        certificate: certificatesString,
        about: values.description || "",
        status: 3,
      };

      // Log dữ liệu cuối cùng sẽ gửi đến API
      console.log("Final portfolio data to send:", portfolioData);

      try {
        // Create or update portfolio
        let result;
        if (portfolio && portfolio.portfolioId) {
          // Update existing portfolio
          result = await portfolioUseCase.updatePortfolio(
            portfolio.portfolioId,
            portfolioData
          );
          console.log("Portfolio updated successfully:", result);
          message.success("Portfolio updated successfully");
        } else {
          // Create new portfolio
          result = await portfolioUseCase.createPortfolio(portfolioData);
          console.log("Portfolio created successfully:", result);
          message.success("Portfolio created successfully");
        }

        setIsEditing(false);

        // Refresh the data
        if (accountId) {
          const refreshedData =
            await portfolioUseCase.getPortfolioByFreelancerId(accountId);
          setPortfolio(refreshedData);

          // Sử dụng hàm parsePortfolioData để phân tích dữ liệu
          const parsedData = portfolioUseCase.parsePortfolioData(refreshedData);

          // Cập nhật form với dữ liệu mới
          form.setFieldsValue({
            title: parsedData.title,
            description: parsedData.about,
            skills: parsedData.skills,
            experiences: parsedData.experiences,
            certificates: parsedData.certificates,
          });
        }
      } catch (error: any) {
        console.error("API Error:", error);
        if (error?.message) {
          if (error.message.includes("System.InvalidOperationException")) {
            message.error("Remote database return 500 again 😥");
          } else {
            const errorMessage = error.message.replace("Error: ", "");
            message.error(errorMessage);
          }
        } else {
          message.error("Failed to save portfolio. Please try again later.");
        }
      }
    } catch (error: any) {
      console.error("Form validation error:", error);
      message.error("Please check your input and try again");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // If loading, show a loading state
  if (loading) {
    return <LoadingState />;
  }

  // If no portfolio data found and not in editing mode
  if (!portfolio && !isEditing) {
    const isOwnProfile = !id || parseInt(id) === accountId;
    return (
      <EmptyState
        onCreateClick={() => setIsEditing(true)}
        isOwnProfile={isOwnProfile}
      />
    );
  }

  // Render portfolio form for both create and edit modes
  return (
    <PortfolioForm
      form={form}
      isEditing={isEditing}
      submitting={submitting}
      submittingForVerification={submittingForVerification}
      portfolio={portfolio}
      handleSave={handleSave}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      handleSubmitForReview={handleSubmitForReview}
      handleSubmit={handleSubmit}
      id={id}
      accountId={accountId}
    />
  );
};

export default Portfolio;
