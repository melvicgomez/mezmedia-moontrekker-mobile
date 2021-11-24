import api from '@/Services';

export default async (params) => {
  const response = await api.get(`api/attempt/${params.id}`);
  return response.data.data;
};
