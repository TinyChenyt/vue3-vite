import { get } from '../../utils/request'

async function getMenu() {
    let result = await get('caidan', null);
    return result;
}

export const menuApi  = {
    getMenu,
}