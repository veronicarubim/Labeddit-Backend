import { Request, Response } from "express";
import { CommentsBusiness } from "../business/CommentsBusiness";
import { GetCommentsInputDTO } from "../dtos/userDTO";
import { BaseError } from "../errors/BaseError";

export class CommentsController {
    constructor(
        private commentsBusiness: CommentsBusiness
    ) {} 

    public getComments = async (req: Request, res: Response) => {
        try {
            const input: GetCommentsInputDTO = {
                token: req.headers.authorization,
                postId: req.body.id
            }

            const output = await this.commentsBusiness.getComments(input)
        
            res.status(200).send(output)

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro Inesperado")
            }
        }
    }

    /* public getCommentsWithCreators = async () */

}