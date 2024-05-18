import express from 'express';
import { handler as ssrHandler } from './frontend/dist/server/entry.mjs'

const app = express()
const base = '/'
app.use(base, express.static('dist/client'))
app.use(ssrHandler);
const PORT = process.env.PORT || 3000
app.listen(PORT)
