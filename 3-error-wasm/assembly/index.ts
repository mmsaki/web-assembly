// The entry file of your WebAssembly module.

export function minusone(n: i32): i32 {
	if (n === 44) {
		abort();
	}

	return n - 1;
}
