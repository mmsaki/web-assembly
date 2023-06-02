// The entry file of your WebAssembly module.
declare function log(n: i32): void;

export function minusone(n: i32): i32 {
	log(n);
	return n - 1;
}
