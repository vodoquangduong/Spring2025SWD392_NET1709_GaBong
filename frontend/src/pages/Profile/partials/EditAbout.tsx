import { FaCamera } from "react-icons/fa";
import { UserProfileData } from "../models/types";
import UploadImage from "@/components/UploadImage";
import { useEffect, useState } from "react";
import { App, UploadFile } from "antd";
import { useNavigate } from "react-router-dom";
import { defaultAvatar } from "@/modules/default";
import { useQueries } from "@tanstack/react-query";
import { GET, POST, PUT } from "@/modules/request";
import useAuthStore from "@/stores/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/modules/firebase";
import dayjs from "dayjs";
import countries from "@/mocks/countries.json";

export const formSchema = () => {
  return z.object({
    // images: z.string().min(1, "Required"),
    name: z
      .string()
      .min(3, "Name must be at least 8 characters")
      .max(50, "Name must be less than 50 characters"),
    phone: z
      .string()
      .min(3, "Phone number must be at least 3 characters")
      .max(50, "Phone number must be less than 50 characters"),
    address: z
      .string()
      .min(3, "Address must be at least 3 characters")
      .max(50, "Address must be less than 50 characters"),
    avatarURL: z.string().optional(),
    birthday: z.coerce
      .date()
      .min(new Date(1950, 0, 1), "Birthday must be after 1950")
      .max(
        new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000),
        "User must be at least 18 years old"
      ),
    nationality: z.string().min(1, "Required"),
    gender: z.coerce.number().min(0, "Required"),
  });
};

const EditAbout = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { accountId, updateAccount } = useAuthStore();
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
      name: "",
      phone: "",
      address: "",
      avatarURL: "",
      birthday: "",
      nationality: "",
      gender: 0,
    },
    resolver: zodResolver(formSchema()),
  });

  const [profileData] = useQueries({
    queries: [
      {
        queryKey: ["profile", 1],
        queryFn: async () => {
          const profileData = await GET(`/api/Account/${accountId}`);
          reset({
            name: profileData?.value?.name,
            phone: profileData?.value?.phone,
            address: profileData?.value?.address,
            avatarURL: profileData?.value?.avatarURL,
            birthday: dayjs(profileData?.value?.birthday).format("YYYY-MM-DD"),
            nationality: profileData?.value?.nationality,
            gender: profileData?.value?.gender,
          });
          setFileList([
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: profileData?.value?.avatarURL || defaultAvatar,
            },
          ]);
          return profileData?.value;
        },
      },
    ],
  });

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: defaultAvatar,
    },
  ]);

  const onSubmit = async (formData: any) => {
    message.open({
      type: "loading",
      content: "Updating profile ...",
      duration: 0,
    });
    if (!fileList || fileList?.length == 0) {
      // setError("images", {
      //   type: "manual",
      //   message: "Please upload at least one image",
      // });
      return;
    }
    let submitForm: any;
    for (const [key, value] of Object.entries(formData)) {
      if (value) {
        submitForm = { ...submitForm, [key]: value };
      }
    }

    // Delete old images
    if (
      profileData?.data?.avatarURL.includes("firebase") &&
      fileList.every((file) => file?.url !== profileData?.data?.avatarURL)
    ) {
      try {
        const oldImageRef = ref(storage, profileData?.data?.avatarURL);
        await deleteObject(oldImageRef);
      } catch (error) {
        console.error("Failed to delete old image:", error);
      }
    }

    // Update new image to firebase
    const urlList: string[] = [];
    const uploadPromises = fileList.map(async (file: UploadFile) => {
      const imgRef = ref(storage, `images/${v4()}`);
      if (file?.url) {
        const blob = await fetch(file?.url).then((r) => r.blob());
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

    console.log(urlList[0]);

    formData["avatarURL"] = urlList[0];
    await PUT(`/api/Account`, formData);
    message.destroy();
    message.success("Updated successfully");
    navigate("/profile");
    updateAccount({
      name: formData.name,
      avatar: formData.avatarURL,
    });
  };

  return (
    <form className="mx-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Edit Profile
          </h2>
          <div className="flex gap-4">
            <button
              onClick={(e: any) => {
                e.preventDefault();
                navigate("/profile");
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log(errors);
                console.log("co zo cai nay ko ");
              }}
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Avatar Edit */}
        <div className="flex justify-between mt-6 gap-10">
          <div className="">
            <label className="block text-sm font-medium mb-2">Avatar</label>
            <UploadImage fileList={fileList} setFileList={setFileList} />
          </div>
          <div className="grow grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="input-style w-full p-2"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <span className="error-msg">{errors.name.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Nationality
              </label>
              <select
                className="py-2 px-2 input-style"
                {...register("nationality")}
              >
                <option className="input-style" value={""}>
                  Select a country
                </option>
                {countries.map((item: string) => (
                  <option className="input-style" value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.nationality && (
                <span className="error-msg">{errors.nationality.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                {...register("phone")}
                type="tel"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                className="w-full p-2 input-style"
                placeholder="+1 234 567 890"
              />
              {errors.phone && (
                <span className="error-msg">{errors.phone.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Birthday</label>
              <input
                {...register("birthday")}
                type="date"
                className="w-full p-2 input-style"
              />
              {errors.birthday && (
                <span className="error-msg">{errors.birthday.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select
                {...register("gender")}
                // { defaultValue: profileData?.data?.gender })}
                className="w-full p-2 input-style"
              >
                {["Male", "Female", "Other"].map((item, index) => (
                  <option key={index} value={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="col-span-3">
              <label className="block text-sm font-medium mb-2">Address</label>
              <textarea
                {...register("address")}
                className="w-full p-2 input-style"
                rows={5}
                placeholder="Enter your address"
              />
              {errors.address && (
                <span className="error-msg">{errors.address.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* avatarURL */}
        <textarea className="hidden" {...register("avatarURL")} />
      </div>
    </form>
  );
};

export default EditAbout;
