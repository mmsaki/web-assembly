# 6: memory wasm

1. memory in web assembly is linear, easiest way to visualize it is to think of a long unbroken chain of `0`'s and `1`'s.

   ![memory](https://young.github.io/intro-to-web-assembly/static/c16532266c9a5a63edc20a729a734cc3/0e149/memory.png)

1. when we instantiate a wasm module, a fixed portion of memory is allocated to the process and all data passed between wasm and javascript takes place in this fixed space
1. this is different from javascript memory which uses both a stack and heap
   - **a heap** is a dynamic, non lineat memory used by a program to arbitrarily read and store data

## arrat buffers

1. naturally we need a way to read and write to this fixed memory space
1. other languages have pointers, addresses to specific locations in memory, whereas javascript we have an `ArrayBuffer` object
   - **an `ArrayBuffer`** is an object that represents raw binary data
   - **a `SharedArrayBuffer`** is an ArrayBuffer that represents a fixed-length portion of memory shared by multiple processes
1. `WebAssembly.Memory` is the name of the memory shared by javascript and WebAssembly that is used to pass data back and forth
1. Because `ArrayBuffer` and `SharedArrayBuffer` are merely representations of raw binary data, we need to used a `TypedArray` to properly coerce the raw data into something useable by our processes

## memory and TypedArrays

1. create an ArrayBuffer and allocate 1 page (64kb) of memory

   ```js
   const memory = new WebAssembly.Memory({
   	initial: 2,
   	shared: true,
   });
   ```

1. create an array-like object where each index is a pointer to a 16-bit unsigned integer

   ```js
   const u16Array = new Uint16Array(memory.buffer);
   ```

1. we can now directly write into memory and the number 42 will be accessible by both javascript and Web Assembly

   ```js
   u16Array[0] = 42;
   ```

## memory in AssemblyScript

```ts
// assembly/index.ts

// grow memory by 2 pages (128kb)
memory.grow(2);

// save 32 at index 0
store<u8>(0, 21);

// save 99 at index 1
store<u8>(1, 99);

export function readMemory(n: i32): i32 {
	return load<u8>(n);
}
```

1. display in browser

   ```js
   // index.html
   const { readMemory, memory } = instance;

   const memoryArray = new Uint8Array(memory.buffer);

   document.write(memoryArray[1]);
   document.write('<br/>');
   memoryArray[2] = 42;
   document.write(readMemory(2));
   ```

## run server

```zsh
npm run asbuild
npm start
```
