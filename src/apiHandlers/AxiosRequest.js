import axios from 'axios';
import APIConstants from '../helpers/APIConstants';

const AxiosRequest = axios.create({
  baseURL: APIConstants.baseUrl,
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});

export default AxiosRequest;
