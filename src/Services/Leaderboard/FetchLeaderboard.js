import api from '@/Services';

export default async (params) => {
  // type moontrekker-points | race-times
  // category solo | duo | team | corporate-team | corporate-cup *available only to moontrekker-points
  // page

  const type = params.type || 'moontrekker-points';
  const category = params.category || 'solo';
  const page = params.page || 1;

  const response = await api.get(`api/leaderboard/${type}/${category}`, {
    params: {
      page,
    },
  });

  return response.data;
};
