## defining imports

assemblyscript has special imports build into its loader [see documentation](https://www.assemblyscript.org/concepts.html#special-imports)

## creating a logging function in wasm

1. we have to declare a function since it doen't exist yet

```ts
declare function log(n: i32): void;

export function minusone(n: i32): i32 {
	log(n);
	return n - 1;
}
```

1. run `npm run asbuild`
2. this will create the function in the `release.wat` file

```wasm
;; the log function
(import "index" "log" (func $assembly/index/log (param i32)))
;; and then opecode call to the function
call $assembly/index/log
```

1. add "index" `log` function to the loader

```js
// js/loader.js
export class WasmLoader {
	constructor() {
		this._imports = {
			env: {
				abort() {
					throw new Error('Abort called from wasm file');
				},
			},
			index: {
				log(n) {
					console.log(n);
				},
			},
		};
	}
	//  ...REST OF THE CODE LOGIC
}
```

1. 🎉 you can now add javascript functions to your wasm files and vice versa
