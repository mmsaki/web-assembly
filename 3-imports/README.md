# 3: imports

If we modify previous exercise `assembly/index.ts` to code below we get a `TypeError`

```js
Uncaught (in promise) TypeError:
WebAssembly.instantiate(): Imports argument must be present and must be an object
```

```ts
// assembly/index.ts
export function minusone(n: i32): i32 {
	if (n === 44) {
		abort();
	}

	return n - 1;
}
```

1. this is because `abort()` isn't currently defined in the context of our wasm yet
1. create an import with an `abort()` function

```js
// js/loader.js
constructor() {
  this._imports = {
    env: {
      abort() {
        throw new Error('Abort called from wasm file')
      }
    }
  }
}
```

1. then add the import object to both methods

```js
// js/loader.js

async wasm(path, imports = this._imports) {
  /* ... */
  const { instance } = await WebAssembly.instantiateStreaming(fetch(path), imports);
  /* ... */
}

async wasmFallback(path, imports) {
  /* ... */
  const { instance } = await WebAssembly.instantiate(bytes, imports);
  /* ... */

}

```
