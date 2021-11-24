import { Observable } from 'rxjs/Observable';
import { _catch } from 'rxjs/add/operator/catch';
import OFFLINE_IMAGES from './constants';
import ReactNativeBlobUtil from 'react-native-blob-util';

import {
  downloadImageOfflineFailure,
  downloadImageOfflineNetworkError,
  downloadImageOfflineSuccess,
} from './actions';

import { getImageFilePath } from './utils';

const defaultTimeout = 5000;

const downloadImageEpic = (action$, store) =>
  action$.ofType(OFFLINE_IMAGES.DOWNLOAD_IMAGE_OFFLINE).flatMap((action) => {
    console.log('downloadImage', 'Entry');
    console.log('downloadImage', action.payload);
    // TODO: Replace NetInfo
    //      if (!store.getState().networkReducer.isConnected) {
    //        console.log('downloadImage', 'Network not connected');
    //        return Observable.of(downloadImageOfflineNetworkError());
    //      }

    const source = action.payload;

    const method = source.method ? source.method : 'GET';
    const imageFilePath = getImageFilePath(source.uri);

    ReactNativeBlobUtil.config({
      path: imageFilePath,
    })
      .fetch(method, source.uri, source.headers)
      .then(() => {
        console.log(
          'ReactNativeBlobUtil',
          'success',
          imageFilePath,
          source.uri,
        );
        store.dispatch(downloadImageOfflineSuccess(source.uri, imageFilePath));
      })
      .catch(() => {
        console.log(
          'ReactNativeBlobUtil',
          'failure',
          imageFilePath,
          source.uri,
        );
        ReactNativeBlobUtil.fs.unlink(imageFilePath);
        store.dispatch(downloadImageOfflineFailure());
      });

    return Observable.of({
      type: 'DOWNLOAD_IMAGE_OFFLINE_REQUEST_SENT',
    });
  });

export default downloadImageEpic;
