import api from '@/Services';

export default async (params) => {
  const page = params.page || 1;
  const response = await api.get(
    `api/leaderboard/corporate-cup/${params.corporate_id}`,
    {
      params: {
        page,
      },
    },
  );

  return response.data;
};
