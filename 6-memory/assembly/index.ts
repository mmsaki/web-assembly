// The entry file of your WebAssembly module.
declare function log(n: i32): void;

export function minusone(n: i32): i32 {
	log(n);
	return n - 1;
}

export function fizzbuzz(n: i32): String | null {
	if (n % 15 === 0) {
		return 'fizzbuzz';
	}
	if (n % 5 === 0) {
		return 'fizz';
	}
	if (n % 3 === 0) {
		return 'buzz';
	}

	return null;
}

// grow memory by 2 pages (128kb)
memory.grow(2);

// save 32 at index 0
store<u8>(0, 21);

// save 99 at index 1
store<u8>(1, 99);

export function readMemory(n: i32): i32 {
	return load<u8>(n);
}
