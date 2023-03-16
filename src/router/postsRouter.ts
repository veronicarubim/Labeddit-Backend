import express from 'express'
import { CommentsBusiness } from '../business/CommentsBusiness'
import { PostsBusiness } from '../business/PostsBusiness'
import { CommentsController } from '../controller/CommentsController'
import { PostsController } from '../controller/PostsController'
import { CommentsDatabase } from '../database/CommentsDatabase'
import { PostsDatabase } from '../database/PostsDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'

export const postsRouter = express.Router()

const postsController = new PostsController(
    new PostsBusiness(
        new PostsDatabase(),
        new IdGenerator(),
        new TokenManager()

    )
) 

 const commentsController = new CommentsController (
    new CommentsBusiness(
        new CommentsDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postsRouter.get("/", postsController.getPosts)
postsRouter.post("/", postsController.createPosts)

postsRouter.put("/:id", postsController.editPosts)
postsRouter.delete("/:id", postsController.deletePosts)
postsRouter.put("/:id/like", postsController.likeOrDislikePosts)

postsRouter.get("/comments/:postId", commentsController.getComments)
postsRouter.post("/comments/:postId", commentsController.createComments)
postsRouter.delete("/comments/:id", commentsController.deleteComments)