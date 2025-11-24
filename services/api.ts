import axios from 'axios';

const api = axios.create({
  baseURL: 'https://smart-blog-deploy-be-psi.vercel.app/api/v1',
  withCredentials: true,
});

const PUBLIC_ENDPOINTS = ['/auth/login', '/auth/register'];

api.interceptors.request.use((config) => {
  // config.headers;
  // config.url;

  const token = localStorage.getItem('accessToken');
  const isPublic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url));

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          'http://localhost:5000/api/v1/auth/refresh',
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;
        localStorage.setItem('accessToken', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // try original request again with new token
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (err: AxiosError)=>{
//       const originalRequest:any = err.config;
//
//       if (err.response?.status === 401 && !PUBLIC_ENDPOINTS && !originalRequest._retry) {
//
//         originalRequest._retry = true;
//
//         const refreshToken = localStorage.getItem('accessToken');
//
//         if (!refreshToken) {
//           throw new Error('Not logged in');
//         }
//
//         const res = await refreshTokens(refreshToken);
//         localStorage.setItem('accessToken', res.accessToken);
//
//         originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
//
//         return axios(originalRequest);
//
//       }
//       return Promise.reject(err);
//     }
// )

export default api;
