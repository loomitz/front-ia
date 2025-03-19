import { http, authHttp } from "./http-common";
import { useLocalStorage } from "@vueuse/core";
import { promiseTimeout } from "@vueuse/core";
import { ref } from "vue";

const token = useLocalStorage("token", null);
const userEmail = useLocalStorage("userEmail", null);

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
        // throw new Error(error.response.data.detail);
        return error;
    }
};

export const logout = async () => {
    try {
        token.value = null;
        return true;
    } catch (error) {
        return error;
    }
}

export const getUserEmail = async () => {
    try {
        const res = await http.get("users/me/");
        userEmail.value = res.data.email;
        return res.data;
    } catch (error) {
        return error;
    }
}


const thread_id = ref(null)
const run_id = ref(null)
const loadingStart = ref(false)
const loadingResponse = ref(false)

const messages = ref<any[]>([])

export const useOpenAi = () => {

    const getOrCreateThread = async() => {
        try {
            const res = await http.post("assistant/thread/latest/");
            thread_id.value = res.data.thread_id;
            return
        } catch (error) {
            console.error(error);
        }
    }

    const newThread = async() => {
        try {
            loadingStart.value = true
            const res = await http.post("assistant/new-thread/");
            thread_id.value = res.data.thread_id;
            messages.value = [];
            loadingStart.value = false
            return
        } catch (error) {
            console.error(error);
        }
    }

    const getMessages = async() => {
        try {
            const res = await http.get(`assistant/thread/${thread_id.value}/messages/`);
            const data = res.data;
            if(!data.data || data.data.length === 0){
                return
            }
            messages.value = data.data.reverse();
            return
        } catch (error) {
            console.error(error);
        }
    }

    const getNewMessages = async() => {
        try{
            // se llama a la api para obtener los mensajes nuevos y solo se toman los mensajes que estan antes del ultimo mensaje
            // si thread_id es null se espera y se vuelve a llamar a la funcion
            if(thread_id.value === null){
                await promiseTimeout(1000);
                await getNewMessages();
                return
            }
            const res = await http.get(`assistant/thread/${thread_id.value}/messages/`);
            const data = res.data;
            // se agregan los mensajes nuevos a la lista de mensajes filtrando los que su content sea un array vacio Y los mensajes que ya estan en la lista
            messages.value = messages.value.concat(
                data.data.reverse().filter((message: any) => 
                    message.content !== "" && !messages.value.some((m: any) => m.id === message.id)
                ));
        } catch (error) {
            console.error(error);
        }
    }

    const createMessage = async(message: string) => {
        try{
            const res = await http.post(`assistant/message/`, { "message": message })
            return res.data
        } catch (error) {
            console.error(error);
        }
    }
    
    const startRun = async() => {
        try {
            const res = await http.post(`assistant/run/${thread_id.value}/`);
            run_id.value = res.data.id;
            return
        } catch (error) {
            console.error(error);
        }
    }


    const getRunStatus = async() => {
        try {
            const res = await http.get(`assistant/run/${thread_id.value}/${run_id.value}/`);
            const status = res.data.status;
            if(status === "completed"){
                return true
            }
            return false
        } catch (error) {
            console.error(error);
        }
    }


    const cancelRun = async() => {
        try {
            const res = await http.post(`assistant/run/${thread_id.value}/${run_id.value}/cancel/`);
            if(res.status === 200){
                run_id.value = null;
            }
            return
        } catch (error) {
            console.error(error);
        }
    }

    const mountedSetup = async() => {
        loadingResponse.value = true;
        await getOrCreateThread();
        await getMessages();
        await getUserEmail();
        loadingResponse.value = false;
    }

    const newPrompt = async(prompt: string) => {
        loadingResponse.value = true;
        await createMessage(prompt);
        await startRun();
        // esperamos 2 segundo y comprobamos si el run ha terminado si es asi obtenemos los mensajes nuevos
        // lo intentamos 10 veces
        let i = 0;
        while(i < 10){
            await promiseTimeout(2000);
            const status = await getRunStatus();
            if(status){
                await getNewMessages();
                break;
            }
            i++;
        }
        loadingResponse.value = false;

    }


    return {
        thread_id,
        run_id,
        loadingResponse,
        loadingStart,
        messages,
        mountedSetup,
        getOrCreateThread,
        createMessage,
        getNewMessages,
        startRun,
        newPrompt,
        cancelRun,
        newThread
    }

}   
