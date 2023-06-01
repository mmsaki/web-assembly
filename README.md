# intro-wasm

- runs at near native speed
- is memory safe
- designed to run on many platforms not just the browser

## bits - little endian byte order

wasm reads and writes instructions in little endian byte order

![Alt text](https://young.github.io/intro-to-web-assembly/static/d9da94163f3e364955ee75b7aeb6e9f2/84bf8/endian.png)

## hexadecimal

- hex is used as a base 16

![Alt text](https://young.github.io/intro-to-web-assembly/static/3b96b0fc9dc83cd9f3c46c2fa10568b7/63ec5/hex.png)

## convertions using `toString()`

`Object.prototype.toString(radix)`

| radix/base | type        |
| ---------- | ----------- |
| 2          | binary      |
| 10         | decimal     |
| 16         | hexadecimal |

convert hex to decimal

```js
function hexToDecimal(r) {
	return r.toString(10);
}
// returns '743'
```

covert decimal to binary

```js
function decimalToBinary(d) {
	return d.toString(2);
}
// returns '1100100'
```

## [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)

For large numbers consider using [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

```js
const x = Number.MAX_SAFE_INTEGER + 1;
const y = Number.MAX_SAFE_INTEGER + 2;

console.log(Number.MAX_SAFE_INTEGER);
// Expected output: 9007199254740991

console.log(x);
// Expected output: 9007199254740992

console.log(x === y);
// Expected output: true
```

```js
const previousMaxSafe = BigInt(Number.MAX_SAFE_INTEGER);
// 9007199254740991n

const maxPlusOne = previousMaxSafe + 1n;
// 9007199254740992n
```

> Under the hood, numbers in JavaScript are 64-bit floating points whereas in Web Assembly all memory pointers are 32-bits. This is important because understanding memory is fundamental to working with web assembly.

## file types

- `.wasm`
- `.wat`

![Alt text](https://young.github.io/intro-to-web-assembly/static/d8d72f7cdc4a83eca6afbfd95f750161/d1442/wasm-v-wat.png)

# modules

Use [web assembly studio](https://wasm-studio.surge.sh/)

```wat
;; main.wat
(module
  (func $helloWorld (param $num1 i32) (result i32)
    get_local $num1
  )
  (export "helloWorld" (func $helloWorld))
)
```

## stacks

- A stack is memory region where variables are stored and accessed by the running program
- Web Assembly is stack based language so all operations read and write to the stack in a linear fashion

# opcodes

- Opcodes (Operation Code) are readable computer instructions representing machine language instructions

![Alt text](https://young.github.io/intro-to-web-assembly/static/027948fff5c7689cc6e23adeea36e47b/30d16/opcodes.png)

[See interactive table for opcodes](https://pengowray.github.io/wasm-ops/)

![Alt text](https://young.github.io/intro-to-web-assembly/static/c9a9fb06258fab96e14057eebf1787f4/cb93d/opcode-table.png)

1. A function that subtracts one on an `i32` number

```wasm
(module
  (export "minusone" (func $minusone))
  (func $minusone (param $x i32) (result i32)
      get_local $x
      i32.const 1
      i32.sub
  )
)
```

2. The following code compare to jascript

```js
function example(n) {
	if (n === 2) {
		return n * 2;
	}

	if (n === 3) {
		return n * 3;
	}

	return n * n;
}
```

- wasm

```wasm
(func $example (param $0 i32) (result i32)
  get_local $0
  i32.const 2
  i32.eq
  if
   get_local $0
   i32.const 2
   i32.mul
   return
  end
  get_local $0
  i32.const 3
  i32.eq
  if
   get_local $0
   i32.const 3
   i32.mul
   return
  end
  get_local $0
  get_local $0
  i32.mul
 )

```

## web-assembly script

![Alt text](https://young.github.io/intro-to-web-assembly/static/e2c4efb306890c63ab849e5ce81f5758/908b1/as.png)

- Web assembly is a typescript webassembly compiler.

- It provides both high-level language features such as loops but also allows for low-level memory access.

See [documentation](https://www.assemblyscript.org/introduction.html)

## set-up

Make sure you have version 14 or above

```zsh
nvm install --lts
```

install npx

```zsh
npm i -g  npx
```

create a working directory

```zsh
mkdir iwasm && cd iwasm
```

install the loader

```zsh
npm i --save @assemblyscript/loader
```

install AssemblyScript

```zsh
npm i --save-dev assemblyscript
```

scaffold and build an empty project

```zsh
npx asinit .
npm run asbuild
```

You can also follow the [getting started project documentation](https://www.assemblyscript.org/getting-started.html#setting-up-a-new-project)
