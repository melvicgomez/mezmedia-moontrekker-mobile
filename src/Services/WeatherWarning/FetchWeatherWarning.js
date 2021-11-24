import api from '@/Services';

export default async () => {
  const response = await api.get('api/weather-warning');
  return { data: response.data };
};
