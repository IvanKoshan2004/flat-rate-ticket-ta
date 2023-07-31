import { Router } from "express";
import {
    getGraphQLPackageTicketsFromMyLaphil,
    getPackageTicketsFromMyLaphil,
} from "../controllers/controller";

export default async function createRouter() {
    const router = Router();
    router.get("/api", getPackageTicketsFromMyLaphil);
    router.post("/graphql", await getGraphQLPackageTicketsFromMyLaphil);
    return router;
}
