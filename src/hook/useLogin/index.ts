import api from '@/api';

const getCodeImg = async() => {
    const res = await api.login.getCodeImg();
    return res;
}

const login = async(data) => {
    const res = await api.login.login(data);
    return res;
}

export default function useLogin() {
    return {
        getCodeImg,
        login
    }
}