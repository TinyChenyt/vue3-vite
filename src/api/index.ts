import { loginApi } from "./login";
import { menuApi } from "./menu";

export const api = {
   ...loginApi,
   ...menuApi
}