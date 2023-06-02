import express from 'express';
const app = express();

app.use('/wasm', express.static('./build/'));

app.listen(3000, () => console.log(`server running on http://localhost:3000`));
