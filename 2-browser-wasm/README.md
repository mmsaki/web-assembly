# 2: loading assembly script in browser

All mordern browsers have the `WebAssembly` global object that acts as the primary API into Web Assembly with the following static methods:

- `WebAssembly.compile()` compile wasm
- `WebAssembly.compileStreaming()` compile wasm from a streaming source
- `WebAssembly.instantiate()` compile and instantiate wasm
- `WebAssembly.instantiateStreaming()` compile and instantiate wasm from a steamed source
- `WebAssembly.validate()` checks if wasm code is valid

## fetching wasm

we're fetching wasm from our server so lets use `instantiate()` and `instantiateStreaming()` to make a utility class for fetching and compiling our wasm

```js
// js/loader.js
class WasmLoader {
	constructor() {}
	async wasm(path) {}
	async wasmFallback(path) {}
}
```

1. Our `wasm()` method taked a path to the wasm file and will return the exported wasm functions
1. The `wasmFallback()` method is for browsers that don't support `instantiateStreaming()`

- the `wasmFallback()` works the same as `wasm()` with the exception that we need to create an imediate array buffer before instantiating our module

```js
// js/loader.js
class WasmLoader {
	constructor() {}
	async wasm(path) {
		console.log(`fetching ${path}`);
		if (!WebAssembly.instantiateStreaming) {
			return this.wasmFallback(path);
		}

		const { instance } = await WebAssembly.instantiateStreaming(fetch(path));
		return instance?.exports;
	}
	async wasmFallback(path) {
		console.log('using fallback');
		const response = await fetch(path);
		const bytes = await response?.arrayBuffer();
		const { instance } = await WebAssembly.intantiate(bytes);

		return instance?.exports;
	}
}
```

## creating server

1. `instantiateStreaming()` requires the wasm being fetched to have a `Content-Type: Application/wasm` response header
1. Fortunately, [express]() will automatically add this header when serving requests for wasm files

install express

```zsh
npm i express --save
```

create a simple server

```js
// server.js
const express = require('express');
const app = express();

// serving static files (don't do this in production)
app.use(express.static('./'));
app.listen(3000, () => console.log(`server up on http://localhost:3000`));
```

1. Add a run script to start the server

```js
// package.json
"server": "node server.js"
```

## Loading in browser

1. Import our `WasmLoader` in `index.html` to access the functions

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<script type="module">
			import { minusone } from './build/release.js';
			document.getElementById('wasm').innerText = minusone(44);
		</script>
	</head>
	<body>
		<div id="wasm"></div>
	</body>
</html>
```

1. Navigate to `https://localhost:3000` 🎉
