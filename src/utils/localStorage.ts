const set = (key: string, value: any, expirationTime: number) => {
    if (!key) {
        return false;
    }
    if (expirationTime) {
        const currentTime = new Date();
        currentTime.setSeconds(currentTime.getSeconds() + expirationTime);
        localStorage.setItem(key, JSON.stringify({
            value,
            expirationTime: currentTime.getTime()
        }));
    } else if (get(key)) {
        const data = get(key);

        if (data) {
            localStorage.setItem(key, JSON.stringify({
                data,
                expirationTime: data.expirationTime
            }));
        }
    } else {
        localStorage.setItem(key, JSON.stringify({
            value,
            expirationTime: -1
        }))
    }
}

const get = (key: string) => {
    if (!key) {
        return null;
    }
    const keyData = localStorage.getItem(key);
    const data = keyData ? JSON.parse(keyData) : null;
    if (data === null) {
        return null;
    }
    if (data.expirationTime !== -1 && Date.now() > data.expirationTime) {
        del(key);
        return null;
    }
    return data.value;
}

const del = (key: string) => {
    if (!key) {
        return false;
    }
    localStorage.removeItem(key);
    return true;
}

const delAll = () => {
    localStorage.clear();
    return true;
}

export default {
    set,
    get,
    del,
    delAll
}