import { POST } from "@/modules/request";
import useUiStore from "@/stores/uiStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { App, Button } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

const schema = () => {
  return z.object({
    skillName: z
      .string()
      .min(1, "Skill name is required")
      .max(20, "Max 20 characters"),
  });
};

export default function CreateCategoryForm({
  setIsModalOpen,
  record,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  record?: any;
}) {
  const { message } = App.useApp();
  const { requestRevalidate } = useUiStore();

  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      skillName: "",
    },
    resolver: zodResolver(schema()),
  });

  useEffect(() => {
    reset({
      skillName: record?.skillName,
    });
  }, []);

  const onSubmit = async (formData: any) => {
    message.open({
      type: "loading",
      content: "Updating milestone ...",
      duration: 0,
    });
    await POST("/api/SkillCategory", formData);
    message.destroy();
    requestRevalidate();
    message.success(`${record ? "Update" : "Create"} Successfully`);
    setIsModalOpen(false);
  };

  return (
    <form
      className="overflow-y-scroll small-scrollbar h-full overflow-x-hidden"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="col-span-2">
          <div className="font-semibold text-base pb-2">Name</div>
          <input
            {...register("skillName")}
            className="input-style no-ring grow py-[10px] px-2 text-sm"
            placeholder="Enter skill name"
          />
          {errors.skillName && (
            <div className="error-msg">{errors.skillName.message}</div>
          )}
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <Button
          type="primary"
          htmlType="submit"
          className="font-bold"
          onClick={() => console.log(errors)}
        >
          {record ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
