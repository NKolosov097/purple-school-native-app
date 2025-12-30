import { API_PREFIX } from "@/shared/constants/api"

export const AUTH_API = {
  login: `${API_PREFIX}/auth/login`,
  logout: `${API_PREFIX}/auth/logout`,
  refreshToken: `${API_PREFIX}/auth/refresh-token`,
}
