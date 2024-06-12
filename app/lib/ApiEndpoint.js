import Env from "./Env";

export const SERVER_ENDPOINT = Env.SERVER_ENDPOINT;
export const authApi = {
    'register':SERVER_ENDPOINT+"/register",
    'login':SERVER_ENDPOINT+"/login",
    'logout':SERVER_ENDPOINT+"/logout",
}