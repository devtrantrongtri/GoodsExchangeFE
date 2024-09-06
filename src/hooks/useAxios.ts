import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource, AxiosError } from 'axios';
import { GlobalResponse } from '../types/GlobalReponse';
const env = import.meta.env;


// Define types for the API response, error, and options
interface UseAxiosOptions extends AxiosRequestConfig {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
}

interface UseAxiosResponse<T> {
    response: T | null;
    error: string;
    loading: boolean;
    fetchData: (options: UseAxiosOptions) => void;
}

const useAxios = <T = GlobalResponse<any>>(): UseAxiosResponse<GlobalResponse<T>> => {
    const [response, setResponse] = useState<GlobalResponse<T> | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Create an Axios instance
    const axiosInstance = axios.create({
        baseURL: env.VITE_BASE_URL // naof ranh tui se cap nhat .env
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE3MjU1MzIyMDMsImV4cCI6MTcyNTcxMjIwM30.vPBeGEus4W62oTXzrk882m77AZo62-5b_TOZwaFHlchOLxGDrtxyXoQuMWVYzY8DaAMBvKcQhXSzIF2vY87KXw';
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            console.log('Sending request to:', config.url);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // choox nay dungf deer config truocws khi guwir 
    axiosInstance.interceptors.request.use(
        (config) => {
            console.log('Sending request to:', config.url);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // choox nafy dungf derr capp nhaatj response laij as
    axiosInstance.interceptors.response.use(
        (response) => {
            console.log('Received response from:', response.config.url);
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // useEffect(() => {
    //     const source: CancelTokenSource = axios.CancelToken.source();

    //     return () => {
    //         source.cancel('Component unmounted: Request cancelled.');
    //     };
    // }, []);

    const fetchData = async (options: UseAxiosOptions) => {
        setLoading(true);
        try {
            const result: AxiosResponse<GlobalResponse<T>> = await axiosInstance({
                ...options,
                cancelToken: axios.CancelToken.source().token,
            });
            setResponse(result.data);
        } catch (error: unknown) {
            if (axios.isCancel(error)) {
                console.log('Request cancelled');
            } else {
                const axiosError = error as AxiosError;
                const errorMessage = axiosError.response
                    ? axiosError.response.data
                    : axiosError.message;
                setError(typeof errorMessage === 'string' ? errorMessage : 'An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, fetchData };
};

export default useAxios;
