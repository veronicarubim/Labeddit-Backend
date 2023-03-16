import { Request, Response } from "express";
import { CommentsBusiness } from "../business/CommentsBusiness";
import { CreateCommentsInputDTO, DeleteCommentsInputDTO, GetCommentsInputDTO } from "../dtos/userDTO";
import { BaseError } from "../errors/BaseError";

export class CommentsController {
    constructor(
        private commentsBusiness: CommentsBusiness
    ) {} 

    public getComments = async (req: Request, res: Response) => {
        try {
            const input: GetCommentsInputDTO = {
                token: req.headers.authorization,
                postId: req.params.postId
            }

            console.log(input)

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

    public createComments = async (req: Request, res: Response) => {
        try {

            const input: CreateCommentsInputDTO = {
                token: req.headers.authorization,
                content: req.body.content,
                postId: req.params.postId
            }

            await this.commentsBusiness.createComments(input)

            res.status(201).send("Comentário criado com sucesso").end()

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                console.log("controller error", error)
                res.status(400).send("Erro Inesperado")
            }
        }
    }

    public deleteComments = async (req: Request, res: Response) => {
        try {
            const input: DeleteCommentsInputDTO = {
                id: req.params.id,
                token: req.headers.authorization
            }

            await this.commentsBusiness.deleteComments(input)

            res.status(200).end().send("Deletado com sucesso")

        } catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                console.log("controller error", error)
                res.status(400).send("Erro Inesperado")
            }
        }
    } 

}