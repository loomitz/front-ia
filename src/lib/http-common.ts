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
            Authorization: `Bearer ${token.value}`,
        },
    };
}

export const authHttp = axios.create(authConfig());

export const http = axios.create(baseConfig());
