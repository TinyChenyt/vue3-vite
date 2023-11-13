import api from '@/api';

const getCodeImg = async() => {
    const res = api.login.getCodeImg();
    return res;
}

export default function useLogin() {
    return {
        getCodeImg
    }
}