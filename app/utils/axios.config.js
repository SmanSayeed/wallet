import axios from 'axios';
import Env from '../lib/Env';
const instance = axios.create({
    baseUrl:Env.SERVER_ENDPOINT
})
export default instance;