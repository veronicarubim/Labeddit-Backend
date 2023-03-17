import { CommentsDatabase } from "../database/CommentsDatabase"
import { CreateCommentsInputDTO, DeleteCommentsInputDTO, GetCommentsInputDTO, GetCommentsOutputDTO, likeDislikeCommentsInputDTO } from "../dtos/userDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Comments } from "../models/Comments"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { CommentsWithCreatorsDB, COMMENT_LIKE, LikeDislikeCommentDB, USER_ROLES } from "../types"

export class CommentsBusiness { 
    
    constructor (
        private commentsDatabase: CommentsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
        
    ) {}
   
    public getComments = async (input: GetCommentsInputDTO): Promise<GetCommentsOutputDTO> => {
        const {token, postId} = input

        console.log(input)

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
                /* console.log(comments); */

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

     public likeDislikeComments = async (input: likeDislikeCommentsInputDTO): Promise<void> => {

            const {id, token, like} = input
    
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
    
            if (typeof like !== "boolean") {
                throw new BadRequestError("Like deve ser boolean")
            }
            
            const commentsWithCreatorsDB = await this.commentsDatabase
            .findCommentsWithCreatorsById(id)
            console.log(commentsWithCreatorsDB)

            if (!commentsWithCreatorsDB) {
                throw new NotFoundError("id não encontrado")
            }

            const userId = payload.id
            const likeSQL = like? 1 : 0

            const LikeDislikeCommentDB: LikeDislikeCommentDB = {
                user_id: userId,
                comment_id: commentsWithCreatorsDB.id,
                like: likeSQL
            }

            const comments = new Comments(
                commentsWithCreatorsDB.id, 
                commentsWithCreatorsDB.post_id,
                commentsWithCreatorsDB.user_id,
                commentsWithCreatorsDB.content,
                commentsWithCreatorsDB.likes,
                commentsWithCreatorsDB.dislikes,
                commentsWithCreatorsDB.created_at,
                commentsWithCreatorsDB.creator_name,
            )

            const commentLikeOrDislike = await this.commentsDatabase
            .findLikeDislike(LikeDislikeCommentDB)

            console.log(commentLikeOrDislike)

            if (commentLikeOrDislike === COMMENT_LIKE.ALREADY_LIKED) {
                if (like) {
                    await this.commentsDatabase.removeLikeDislike(LikeDislikeCommentDB)
                    comments.removeLike()
                } else {
                    await this.commentsDatabase.updateLikeDislike(LikeDislikeCommentDB)
                    comments.removeLike()
                    comments.addDislike()
                }
            
            } else if (commentLikeOrDislike === COMMENT_LIKE.ALREADY_DISLIKED) {

                if (like) {
                    await this.commentsDatabase.updateLikeDislike(LikeDislikeCommentDB)
                    comments.removeDislike()
                    comments.addLike()
                } else {
                    await this.commentsDatabase.removeLikeDislike(LikeDislikeCommentDB)
                    comments.removeDislike()
                } 
    
            } else {
            
                await this.commentsDatabase.likeOrDislikeComment(LikeDislikeCommentDB)
    
            if (like) {
                comments.addLike()
            } else {
                comments.addDislike()
            }
        }

        const updateCommentDB = comments.toDBModel()

        await this.commentsDatabase.update(id, updateCommentDB)

    } 
}