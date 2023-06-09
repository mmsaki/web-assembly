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
