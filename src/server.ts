import express from "express";
import createRouter from "./routes/router";

export default async function createServer() {
    const server = express();
    server.use(await createRouter());
    return server;
}
