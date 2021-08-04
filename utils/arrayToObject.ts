export default function arrayToObject(array: any) {
    var obj = {};
    let keys = Object.keys(array);
    console.log(keys);
    for (let i in array) {
        obj[i] = array[i];
    }

    return obj;
}