import api from '@/Services';

export default async (params) => {
  const response = await api
    .get('api/challenge/' + params.id)
    .catch((e) => console.log(e));

  if (!response || response.status !== 200) {
    return params.oldData;
  }

  return response.data.data;
};
