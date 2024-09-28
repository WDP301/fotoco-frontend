'use server';

import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosRequestHeaders,
    InternalAxiosRequestConfig,
} from 'axios';
import { siteConfig } from './site';
import { cookies } from 'next/headers';

const config: AxiosRequestConfig = {
    baseURL: siteConfig.baseApiURL,
    // timeout: 5000,
};

const http: AxiosInstance = axios.create(config);

const onRequest = (
    config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
    const accessToken = cookies().get('access-token')?.value;
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
    } as AxiosRequestHeaders;
    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

// Request interceptor
http.interceptors.request.use(onRequest, onRequestError);

export default http;
