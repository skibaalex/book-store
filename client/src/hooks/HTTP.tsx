import axios from 'axios';
import { apiUrl } from '../config';

const HTTP = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
});

export default HTTP;
