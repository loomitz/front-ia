import { http, authHttp } from "./http-common";
import { useLocalStorage } from "@vueuse/core";

const token = useLocalStorage("token", null);

export const login = async (username: string, password: string) => {
    try {
        // Crear los parámetros en formato x-www-form-urlencoded
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        // Hacer la solicitud POST con axios, incluyendo los headers correctos
        const res = await authHttp.post("token", params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        token.value = res.data.access_token;
        return res.data;
    } catch (error) {
        return error;
    }
};