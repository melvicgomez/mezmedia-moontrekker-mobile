import axiosInstance from "@/Services";

export default async (params) => {
  const response = await axiosInstance.get(`api/user/${params.user.user_id}`);
  return {
    ...params.user,
    ...response.data.data.user,
  };
};
