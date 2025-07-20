import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const app: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

app.interceptors.request.use(
  (res: InternalAxiosRequestConfig) => res,
  (err: AxiosError) => Promise.reject(err)
);

app.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => res,
  async (err: AxiosError): Promise<AxiosResponse | Promise<never>> => {
    const originalConfig = err.config as RetryConfig;

    if (err.response && err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`,
          { withCredentials: true }
        );
        if (data) return app(originalConfig);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;

