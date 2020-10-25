# MemoMoo
MemoMoo provides an easy way to cache the function results.

MemoMoo internally maintains a unique id for every passed dependency. Irrespective to the order of dependencies, it automatically sorts and finds the cached results. 

```js
memoMoo(someFunction, [dependency1, dependency2], options);
```

```js
import memoMoo from 'memo-moo';

const names = ['anurag', 'anusha'];
const moreNames = ['akira', 'tara'];

function arrayToCSV() {
    console.log('CONVERTING...');
    return names.concat(moreNames).join(', ');
}

// First time: Searches the store
const result1 = memoMoo(arrayToCSV, [names, moreNames]);

// Second time: Returns cached result. 
// ORDER OF DEPENDENCIES DOESN'T MATTER
const result2 = memoMoo(arrayToCSV, [moreNames, names]);
```

**HEADS-UP:**
Results are cached based on the passed dependencies. You will end up getting the same result even when you pass different functions with same dependencies. To fix this, You must send an `id` through `options`.

```js
const namesInCSV = memoMoo(arrayToCSV, [moreNames, names], {
    id: 'id1'
});
const namesObject = memoMoo(arrayToObject, [moreNames, names], {
    id: 'id2'
});
```

By default results are cached for 300 seconds. It can be configured.

```js
memoMoo(arrayToCSV, [moreNames, names], {
   expiresIn: 60 // Seconds 
});
```

Garbage collector cleans the expired data after 250 seconds. It can be configured

```js
import memoMoo, { setGCTimeout } from 'memoMoo';

setGCTimeout(30); // Now GC will clean expired data after 30 seconds

memoMoo(() => {
    console.log('nothing..');
}, []);

```
