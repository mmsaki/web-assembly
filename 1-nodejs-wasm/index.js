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
