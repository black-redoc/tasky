import express from "express";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const app = express();
const base = "/";
app.use("/public", express.static("public"));
app.use(base, express.static("dist/client"));
app.use(ssrHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT);
