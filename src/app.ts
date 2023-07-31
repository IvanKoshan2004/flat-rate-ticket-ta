import "reflect-metadata";
import createServer from "./server";

async function main() {
    const server = await createServer();
    server.listen(3000, () => {
        console.log("Service listening on port 3000");
    });
}
main();
