import { FastifyInstance } from "fastify";
import { create } from "./create.ts";
import { verifyJWT } from "../../middleware/verify-jwt.ts";
import { deleteLike } from "./delete.ts";
import { getAll } from "./getAll.ts";
import { getLikesByUser } from "./getByUserId.ts";
import { getLikesByPost } from "./getByPostId.ts";
import { getLikesByComment } from "./get-by-commentId.ts";

export function likesRoutes(app: FastifyInstance) {
    app.post('/like', { onRequest: [verifyJWT] }, create)
    app.delete('/like/:likeId', { onRequest: [verifyJWT] }, deleteLike)
    
    app.get('/like/all', getAll)
    app.get('/like/user/:userId', getLikesByUser);
    app.get('/like/post/:postId', getLikesByPost);
    app.get('/like/comment/:commentId', getLikesByComment);
}