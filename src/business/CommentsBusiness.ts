import { CommentsDatabase } from "../database/CommentsDatabase"
import { CreateCommentsInputDTO, DeleteCommentsInputDTO, GetCommentsInputDTO, GetCommentsOutputDTO, likeDislikeCommentnputDTO } from "../dtos/userDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { Comments } from "../models/Comments"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { CommentsWithCreatorsDB } from "../types"

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

    }

    public deleteComments = async (input: DeleteCommentsInputDTO): Promise<void> => {

    }

    public likeDislikeComment = async (input: likeDislikeCommentnputDTO): Promise<void> => {

    }
}