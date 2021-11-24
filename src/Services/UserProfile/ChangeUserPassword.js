import api from "@/Services";

export default async (params) => {

  const response = await api.post(`api/change-password/${params.user_id}`, {
    old_password: params.old_password,
    new_password: params.new_password,
  });

  return { status: response.status };
};
