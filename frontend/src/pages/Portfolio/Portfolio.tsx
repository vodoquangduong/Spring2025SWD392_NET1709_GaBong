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

// Thêm enum PortfolioStatus vào Portfolio.tsx nếu chưa có
enum PortfolioStatus {
  Pending = 0,
  Verified = 1,
  Rejected = 2,
  Modifying = 3,
}
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

        if (!data) {
          console.log(`No portfolio found for freelancer ID: ${freelancerId}`);
          setPortfolio(null);
          if (!id || parseInt(id) === accountId) {
            setIsEditing(true);
            form.setFieldsValue({
              title: "",
              description: "",
              skillPerforms: [], // Set empty skill performs array
              experiences: [],
              certificates: [],
            });
          }
          setLoading(false);
          return;
        }

        setPortfolio(data);
        const parsedData = portfolioUseCase.parsePortfolioData(data);

        // Set form values including skillPerforms
        form.setFieldsValue({
          title: parsedData.title,
          description: parsedData.about,
          skillPerforms: parsedData.skillPerforms, // Set skill performs from parsed data
          experiences: parsedData.experiences,
          certificates: parsedData.certificates,
        });
      } catch (error: any) {
        console.error("Error fetching portfolio:", error);
        setPortfolio(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [accountId, id, form]);

  useEffect(() => {
    console.log("Portfolio in Portfolio component:", portfolio);
    console.log("Portfolio status:", portfolio?.status);
  }, [portfolio]);

  const getCurrentStatus = () => {
    if (!portfolio) return PortfolioStatus.Modifying;
    return portfolio.status !== undefined
      ? portfolio.status
      : PortfolioStatus.Modifying;
  };

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
      console.log("Submit for review:", values);

      // Set loading state to true
      setSubmittingForVerification(true);

      try {
        await portfolioUseCase.submitPortfolioForVerification();
        message.success(
          "Portfolio has been successfully submitted for verification"
        );
        if (accountId) {
          try {
            const refreshedData =
              await portfolioUseCase.getPortfolioByFreelancerId(accountId);

            if (refreshedData) {
              setPortfolio(refreshedData);

              const parsedData =
                portfolioUseCase.parsePortfolioData(refreshedData);

              form.setFieldsValue({
                title: parsedData.title,
                description: parsedData.about,
                skillPerforms: parsedData.skillPerforms,
                experiences: parsedData.experiences,
                certificates: parsedData.certificates,
              });
            }
          } catch (refreshError) {
            console.error("Error refreshing portfolio data:", refreshError);
          }
        }
      } catch (error: any) {
        console.error("Error submitting portfolio for verification:", error);
        message.error(
          error.message ||
            "Unable to submit portfolio for verification. Please try again later."
        );
      }
    } catch (formError: any) {
      console.error("Form validation error:", formError);
      message.error("Please complete all required fields before submitting");
    } finally {
      // Set loading state back to false
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

      // Validate skills
      if (!values.skillPerforms || values.skillPerforms.length === 0) {
        message.error("At least one skill is required");
        setSubmitting(false);
        return;
      }

      // Validate dates
      let hasDateError = false;

      if (values.experiences && values.experiences.length > 0) {
        for (let i = 0; i < values.experiences.length; i++) {
          const exp = values.experiences[i];

          if (exp.startDate) {
            const startDate = new Date(exp.startDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (startDate > today) {
              message.error(
                `Experience ${i + 1}: Start date must be in the past`
              );
              hasDateError = true;
              break;
            }
          }

          if (exp.endDate) {
            const endDate = new Date(exp.endDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (endDate > today) {
              message.error(
                `Experience ${i + 1}: End date must be in the past`
              );
              hasDateError = true;
              break;
            }

            if (exp.startDate) {
              const startDate = new Date(exp.startDate);
              if (startDate > endDate) {
                message.error(
                  `Experience ${i + 1}: Start date must be before end date`
                );
                hasDateError = true;
                break;
              }
            }
          }
        }
      }

      if (
        !hasDateError &&
        values.certificates &&
        values.certificates.length > 0
      ) {
        for (let i = 0; i < values.certificates.length; i++) {
          const cert = values.certificates[i];
          if (cert.issueDate) {
            const issueDate = new Date(cert.issueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (issueDate > today) {
              message.error(
                `Certificate ${i + 1}: Issue date must be in the past`
              );
              hasDateError = true;
              break;
            }
          }
        }
      }

      if (hasDateError) {
        setSubmitting(false);
        return;
      }

      // Now only pass experiences to parseWorks (skills are handled separately)
      const worksString = portfolioService.parseWorks(values.experiences || []);
      const certificatesString = portfolioService.parseCertificates(
        values.certificates || []
      );

      // Prepare skill performs data
      const skillPerforms = values.skillPerforms || [];

      // Validate skills
      if (!skillPerforms || skillPerforms.length === 0) {
        message.error("At least one skill is required");
        setSubmitting(false);
        return;
      }

      // Đảm bảo dữ liệu không bị null hoặc undefined và đúng thứ tự
      const portfolioData: CreatePortfolioDTO = {
        title: values.title || "",
        works: worksString,
        certificate: certificatesString,
        about: values.description || "",
        status: 3,
        skillPerforms: skillPerforms,
      };

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

          const parsedData = portfolioUseCase.parsePortfolioData(refreshedData);

          form.setFieldsValue({
            title: parsedData.title,
            description: parsedData.about,
            skillPerforms: parsedData.skillPerforms,
            experiences: parsedData.experiences,
            certificates: parsedData.certificates,
          });
        }
      } catch (apiError: any) {
        console.error("API Error:", apiError);

        if (apiError.message) {
          message.error(apiError.message);
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
    const currentStatus = getCurrentStatus();
    console.log("Current status in handleEdit:", currentStatus);

    if (
      currentStatus !== PortfolioStatus.Modifying &&
      currentStatus !== PortfolioStatus.Rejected
    ) {
      console.log(
        `Cannot edit: Portfolio status is ${currentStatus}, not Modifying or Rejected`
      );
      message.info("Portfolio is being verified or rejected, please wait.");
      return;
    }

    console.log("Setting isEditing to true");
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
