import { FastifyInstance } from "fastify";
import { register } from "./register.ts";
import { getAll } from "./getAll.ts";
import { deleteUser } from "./delete.ts";
import { update } from "./update.ts";
import { get } from "./get.ts";
import { verifyJWT } from "../../middleware/verify-jwt.ts";
import { profile } from "./profile.ts";
import { authenticate } from "./authenticate.ts";

export function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/authenticate', authenticate)

    app.get('/profile', { onRequest: [verifyJWT]}, profile)
    app.get('/users', getAll)
    app.get('/users/:userId', get)

    app.delete('/users/:userId', { onRequest: [verifyJWT] }, deleteUser)

    app.patch('/users/:userId',{ onRequest: [verifyJWT] }, update)

}