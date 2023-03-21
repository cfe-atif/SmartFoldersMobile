import AxiosRequest from '../AxiosRequest';

function apiLoginRequest(payload) {
  return AxiosRequest.post(`/api/v1/login/`, payload);
}

export const AuthApiServices = {
  apiLoginRequest,
};
