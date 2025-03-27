import UploadImage from "@/components/UploadImage";
import { storage } from "@/modules/firebase";
import { PUT } from "@/modules/request";
import useUiStore from "@/stores/uiStore";
import { Transaction, TransactionStatus } from "@/types/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { App, Button, UploadFile } from "antd";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

const schema = z.object({
  proofUrl: z.string().optional(),
});

const CreateProofForm = ({
  setIsModalOpen,
  record,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  record?: Transaction;
}) => {
  const { message } = App.useApp();
  const { requestRevalidate } = useUiStore();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      proofUrl: "",
    },
  });

  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "proof.png",
        status: "done",
        url: record.detail.split("|")[1],
      },
    ]);
  }, []);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSubmit = async (formData: any) => {
    try {
      formData.detail = record.detail;
      if (fileList.length == 0) {
        setError("proofUrl", { type: "manual", message: "Required" });
        return;
      }
      message.open({
        type: "loading",
        content: "Updating profile ...",
        duration: 0,
      });
      if (!formData.detail.includes("|")) {
        formData.detail = formData.detail + "|";
      }

      // Delete old images
      if (
        formData.detail.split("|")[1].includes("firebase") &&
        fileList.every((file) => file?.url !== formData.detail.split("|")[1])
      ) {
        try {
          const oldImageRef = ref(storage, formData.detail.split("|")[1]);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.error("Failed to delete old image:", error);
        }
      }
      const urlList: string[] = [];
      try {
        // Update new image to firebase
        const uploadPromises = fileList.map(async (file: UploadFile) => {
          const imgRef = ref(storage, `images/${v4()}`);
          if (file?.url) {
            const blob = await fetch(file?.url).then((r) => r?.blob());
            const uploadResult = await uploadBytes(imgRef, blob as Blob);
            const url = await getDownloadURL(uploadResult.ref);
            urlList.push(url);
            if (file?.url.includes("firebase")) {
              const oldImageRef = ref(storage, file?.url);
              await deleteObject(oldImageRef);
            }
          } else {
            const uploadResult = await uploadBytes(
              imgRef,
              file.originFileObj as Blob
            );
            const url = await getDownloadURL(uploadResult.ref);
            urlList.push(url);
          }
        });
        await Promise.all(uploadPromises);
      } catch (error) {
        console.error("Failed to upload image");
      }

      formData["details"] = formData.detail.split("|")[0] + "|" + urlList[0];
      formData["transactionId"] = record.transactionId;
      formData["status"] = TransactionStatus.COMPLETED;
      console.log("formData", formData);

      // const res = true;
      const res = await PUT(`/api/Transaction`, formData);
      console.log("res", res);

      message.destroy();
      if (!res) {
        message.error("Update failed");
        return;
      } else {
        requestRevalidate();
        message.success("Updated successfully");
        setIsModalOpen(false);
      }
    } catch (error) {
      message.destroy();
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div {...register("proofUrl")}>
        <UploadImage fileList={fileList} setFileList={setFileList} />
        {errors.proofUrl && (
          <div className="error-msg">{errors.proofUrl.message}</div>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          className="font-bold"
          //   onClick={() => console.log(errors)}
        >
          {record ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default CreateProofForm;
