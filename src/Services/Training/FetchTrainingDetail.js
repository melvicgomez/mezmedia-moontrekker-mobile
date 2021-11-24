import api from '@/Services';
import { Config } from '@/Config';
import { OfflineImageStore } from '@/Components/react-native-image-offline';

export default async (params) => {
  const response = await api
    .get('api/challenge?show_status=training')
    .catch((e) => console.log(e));

  if (!response || response.status !== 200) {
    return params.oldData;
  }

  let trainingData = response.data.data[0];
  let uri = [
    `${Config.IMAGE_URL_PREFIX}challenge/${trainingData.challenge_id}/${trainingData.checkpoint_preview_image}`,
  ];
  if (trainingData.trails.length) {
    let request = trainingData.trails.map((trail) => {
      if (trail.images.length) {
        trail.images.map((image) => {
          uri.push(
            `${Config.IMAGE_URL_PREFIX}trail/${trail.trail_id}/${image.image_filename}`,
          );
        });
      }
    });

    Promise.all(request).then(() => {
      console.log('done preload training image');
      OfflineImageStore.preLoad(uri);
    });
  }

  return response.data.data[0];
};
