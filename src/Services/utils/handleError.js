export default function ({ headers, message, data, status, config }) {
  return Promise.reject({ headers, message, data, status, config });
}
