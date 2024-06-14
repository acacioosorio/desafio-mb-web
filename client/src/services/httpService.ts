import axios, { type AxiosInstance } from "axios";

const httpService: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

httpService.interceptors.request.use((config) => {
	config.params = {
		...config.params,
	};
	return config;
});

export default httpService;
