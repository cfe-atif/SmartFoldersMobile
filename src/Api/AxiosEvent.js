import axios from 'axios';
import APIConstants from '../helpers/APIConstants';

const AxiosEvent = axios.create({
  baseURL: APIConstants.baseUrl,
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});

export default AxiosEvent;
