import getObjectID from './getObjectID';

const store = {};

/**
 * 
 * @param {Function} cb 
 * @param {Array} deps 
 * @param {Object} options 
 */
function memoMoo(cb, deps, options) {
    if(typeof cb !== 'function') {
        throw Error('Invalid callback');
    }
    if(!Array.isArray(deps) || !deps.length) {
        throw Error('Memo Moo needs atleast one input argument and a callback value');
    }
    if(!options) {
        options = {};
    }
    if(!options.expiresIn) {
        options.expiresIn = 300;
    }
    let depsIDs = [];
    for(let i = 0; i < deps.length; i++) {
        depsIDs.push(
            getObjectID(deps[i])
        );
    }
    let finalID = (options.id || '') + depsIDs.sort().join('-');
    if(!store[finalID]) {
        store[finalID] = {
            createdAt: new Date(),
            data: cb.apply(null, deps)
        };
        if(options.expiresIn) {
            const expiresAt = new Date();
            expiresAt.setSeconds(expiresAt.getSeconds() + options.expiresIn);
            store[finalID].expiresAt = expiresAt;
        }
    }
    store[finalID].accessedAt = new Date();
    options.expiresIn && initGC(options);
    return store[finalID].data;
}

let gcInterval;
let gcTimeout = 250 * 1000;

function initGC() {
    if(!gcInterval) {
        gcInterval = setInterval(() => {
            const currentTime = new Date();
            let yetToBeExpired = false;
            for(let i in store) {
                if(store[i].expiresAt) {
                    if(currentTime >= store[i].expiresAt) {
                        delete store[i];
                    } else {
                        yetToBeExpired = true;
                    }
                }
            }
            if(!yetToBeExpired) {
                clearInterval(gcInterval);
                gcInterval = null;
            }
        }, gcTimeout);
    }
}

function setGCTimeout(ts) {
    gcTimeout = ts * 1000;
}

export default memoMoo;
export {
    setGCTimeout
}
