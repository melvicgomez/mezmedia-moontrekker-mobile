import api from '@/Services';
import Progress from '@/Store/Progress/CreateAttemptTiming';

export default async (params, { dispatch }) => {
  const response = await api
    .post('api/attempt', params.data)
    .catch((e) => console.log(e));

  if (!response || response.status !== 200) {
    return params.data;
  }

  let progress = params.progressData;
  progress.attempt_id = response.data.data.attempt_id;

  await dispatch(Progress.action({ data: progress }));

  return response.data.data;
};
