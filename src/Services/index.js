import axios from 'axios';
import handleError from '@/Services/utils/handleError';
import { Config } from '@/Config';
import { navigate } from '@/Navigators/Root';

export const createFormData = (body) => {
  const data = new FormData();

  if (body.submitted_image !== undefined && body.submitted_image !== null) {
    body.submitted_image = {
      name: body.submitted_image.substring(
        body.submitted_image.lastIndexOf('/') + 1,
      ),
      type:
        'image/' +
        body.submitted_image.substring(
          body.submitted_image.lastIndexOf('.') + 1,
        ),
      uri: body.submitted_image,
    };
  }

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

let instance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

instance.interceptors.response.use(
  (response) => response,
  ({ message, response: { headers, data, status, config } }) => {
    if (status === 401) {
      navigate('Reset Page');
    }
    return handleError({ headers, message, data, status, config });
  },
);

export default instance;
