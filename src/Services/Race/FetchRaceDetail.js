import api from '@/Services';
import { Config } from '@/Config';
import { OfflineImageStore } from '@/Components/react-native-image-offline';

export default async (params) => {
  const response = await api
    .get('api/challenge?show_status=race')
    .catch((e) => console.log(e));

  if (!response || response.status !== 200) {
    return params.oldData;
  }

  let raceData = response.data.data[0];
  let uri = [
    `${Config.IMAGE_URL_PREFIX}challenge/${raceData.challenge_id}/${raceData.checkpoint_preview_image}`,
  ];
  if (raceData.trails.length) {
    let request = raceData.trails.map((trail) => {
      if (trail.images.length) {
        trail.images.map((image) => {
          uri.push(
            `${Config.IMAGE_URL_PREFIX}trail/${trail.trail_id}/${image.image_filename}`,
          );
        });
      }
    });

    Promise.all(request).then(() => {
      OfflineImageStore.preLoad(uri);
      console.log('done preload race image');
    });
  }

  return response.data.data[0];
};
