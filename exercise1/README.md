# exercise 1

## intall

```zsh
npm i --save @assemblyscript/loader
npm i --save-dev assemblyscript
```

## initalize wasm

```zsh
npx asinit .
```

## build

```zsh
npm run asbuild
```

## import wasm in `index.js`

```js
const fs = require('fs');
const loader = require('@assemblyscript/loader');
const imports = {
	/* imports go here */
};
const wasmModule = loader.instantiateSync(
	fs.readFileSync(__dirname + '/build/release.wasm'),
	imports
);

module.exports = wasmModule.exports;
```

## use wasm in `node`

Run node

```zsh
node
```

```node
> const minusOne = require('./index.js');
> minusOne.minusone(2)
1
>
```
