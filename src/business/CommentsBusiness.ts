import { CommentsDatabase } from "../database/CommentsDatabase"
import { CreateCommentsInputDTO, DeleteCommentsInputDTO, GetCommentsInputDTO, GetCommentsOutputDTO, likeDislikeCommentnputDTO } from "../dtos/userDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Comments } from "../models/Comments"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { CommentsWithCreatorsDB, USER_ROLES } from "../types"

export class CommentsBusiness { 
    
    constructor (
        private commentsDatabase: CommentsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
        
    ) {}
   
    public getComments = async (input: GetCommentsInputDTO): Promise<GetCommentsOutputDTO> => {
        const {token, postId} = input
        if (!token) {
            throw new BadRequestError("Token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (!payload === null) {
            throw new BadRequestError("Token inválido")
        }       

        const commentsWithCreatorsDB: CommentsWithCreatorsDB[] 
        = await this.commentsDatabase
            .getComments(postId)

            console.log(commentsWithCreatorsDB)
            
        const comments = commentsWithCreatorsDB.map(
            (commentsWithCreatorsDB) => {
                const comments = new Comments (
                    commentsWithCreatorsDB.id,
                    commentsWithCreatorsDB.post_id,
                    commentsWithCreatorsDB.user_id,
                    commentsWithCreatorsDB.content,
                    commentsWithCreatorsDB.likes,
                    commentsWithCreatorsDB.dislikes,
                    commentsWithCreatorsDB.created_at,
                    commentsWithCreatorsDB.creator_name
                )

                return comments.toBusinessModel()
                
        })

        const output: GetCommentsOutputDTO = comments

        return output
    }

    public createComments = async (input: CreateCommentsInputDTO): Promise<void> => {
        const { token, content, postId} = input

        if (!token) {
            throw new BadRequestError("Token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("Token inválido")
        }

        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser uma string")
        }

        if (typeof postId !== "string") {
            throw new BadRequestError("'postId' deve ser uma string")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()
        const creatorName = payload.name

        const comments = new Comments(
            id,
            postId, 
            payload.id,
            content,
            0,
            0,
            createdAt,
            creatorName,
        )

        const commentsDB = comments.toDBModel()

       await this.commentsDatabase.insert(commentsDB)
    }



    public deleteComments = async (input: DeleteCommentsInputDTO): Promise<void> => {
        const {id, token} = input

        if (token === undefined) {
            throw new BadRequestError("Token ausente")
        }

        if (!token) {
            throw new BadRequestError("Token ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("Token inválido.")
        }

        const commentsDB = await this.commentsDatabase.findById(id)
        
        if (!commentsDB) {
            throw new NotFoundError("id não encontrado")
        }

        const userId = payload.id

        if (payload.role !== USER_ROLES.ADMIN &&
            commentsDB.user_id !== userId) {
            throw new BadRequestError("Somente quem criou o post pode deletá-lo.")
        }

        await this.commentsDatabase.delete(id)
    }

    /* public likeDislikeComment = async (input: likeDislikeCommentnputDTO): Promise<void> => {

    } */
}