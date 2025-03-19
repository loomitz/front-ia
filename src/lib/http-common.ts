import axios from "axios";
import { useLocalStorage } from "@vueuse/core";

// get token from local storage if it exists
const token = useLocalStorage("token", null);

const base = {
    baseURL: "https://apiuro.loo.casa/",
}

const baseConfig = () => {
    if (token.value) {
        return {
            ...base,
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.value}`,
            },
        };
    }
}

const authConfig = () => {
    return {
        ...base,
        withCredentials: true,
        headers: {
            "Content-Type": "x-www-form-urlencoded",
        },
    };
}

export const authHttp = axios.create(authConfig());

export const http = axios.create(baseConfig());

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 400) {
            const responseData = error.response.data;
            if (responseData.detail === 'Invalid token') {
              token.value = null;
              console.log('Token eliminado debido a respuesta 400 con "Invalid token"');
            }
          }
            return Promise.reject(error);
    }
);