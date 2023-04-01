import axios from 'axios';
import APIConstants from '../helpers/APIConstants';

const ChatAxiosEvent = axios.create({
  baseURL: APIConstants.chatBaseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default ChatAxiosEvent;
