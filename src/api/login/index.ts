/*
 * @Author: chenyt
 * @Date: 2023-11-11 14:11:11
 * @Description: 
 */
import { get, post } from '../../utils/request';

function getCodeImg() {
    return get('user/image', null);
}

function login(data: object) {
    return post('user/login', data);
}

export const loginApi  = {
    getCodeImg,
    login,
}