import axios from 'axios';
import {API_ENDPOINT} from '@env';

export default axios.create({
  baseURL: API_ENDPOINT,
  headers: {'Content-Type': 'application/json'},
});
