// 
const createNumberArray = (length: number, element: number): Array<number> => {
    let arr: number[] = new Array<number>(length);
    for(let i = 0; i < length; i++) {
        arr[i] = element;
    }
    return arr;
}

export default {
    createNumberArray
}