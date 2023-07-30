import express from "express";
import router from "./routes/router";
const app = express();

app.use(router);
app.listen(3000, () => {
    console.log("Service listening on port 3000");
});
