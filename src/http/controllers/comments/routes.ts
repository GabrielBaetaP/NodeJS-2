import { FastifyInstance } from "fastify";
import { createComment } from "./create.ts";
import { deleteComment } from "./delete.ts";
import { updateComment } from "./update.ts";
import { verifyJWT } from "../../middleware/verify-jwt.ts";
import { getAllComments } from "./getAll.ts";
import { getCommentById } from "./getById.ts";
import { getCommentsByUser } from "./getByUserId.ts";
import { getCommentsByPost } from "./getByPostId.ts";

export async function commentsRoutes(app: FastifyInstance) {

    app.get("/comments", getAllComments);
    app.get("/comments/:commentId", getCommentById);
    app.get("/comments/user/:userId", getCommentsByUser);
    app.get("/comments/post/:postId", getCommentsByPost);

    app.post("/comments", { onRequest: [verifyJWT] }, createComment);
    app.delete("/comments/:commentId", { onRequest: [verifyJWT] }, deleteComment);
    app.patch("/comments/:commentId", { onRequest: [verifyJWT] }, updateComment);
}
