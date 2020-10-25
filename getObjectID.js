// 0, 1, 2, 3 are reserved for undefined, null, true, false
let objectIDCounter = 4;

/**
 * Returns unique id for Objects
 * @param {ANY} input 
 */
function getObjectID(input) {
    if(input === undefined) {
        return 0;
    }
    if(input === null) {
        return 1;
    }
    if(input === true) {
        return 2;
    }
    if(input === false) {
        return 3;
    }
    if(typeof input === 'number' || typeof input === 'string') {
        return input;
    }
    if(!input.memoMooId) {
        Object.defineProperty(input, 'memoMooId', {
            value: objectIDCounter++,
            writable: false,
            enumerable: false
        })
    }
    return input.memoMooId;
}

export default getObjectID;
