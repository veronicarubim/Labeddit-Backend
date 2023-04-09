import { CommentsDB, CommentsWithCreatorsDB, COMMENT_LIKE, LikeDislikeCommentDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CommentsDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_LIKES_DISLIKES_COMMENT = "likes_dislikes_comment"

    public delete = async (id: string): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
        .delete()
        .where({id})
    }

    public findById = async (id: string): Promise<CommentsDB | undefined> => {
        const result: CommentsDB[] = await BaseDatabase
        .connection(CommentsDatabase.TABLE_COMMENTS)
        .select()
        .where({id})

        return result[0]
    }

    public insert = async (commentsDB: CommentsDB): Promise<void> => {
        await BaseDatabase
        .connection(CommentsDatabase.TABLE_COMMENTS)
        .insert(commentsDB)
    }

    public getComments = async (postId: string): Promise<CommentsWithCreatorsDB[]> => {
        const result: CommentsWithCreatorsDB[] = await BaseDatabase
        .connection(CommentsDatabase.TABLE_COMMENTS)
        .select(
            "comments.id",
            "comments.post_id",
            "comments.user_id",
            "comments.content",
            "comments.likes",
            "comments.dislikes", 
            "comments.created_at",
            "users.name AS creator_name",
            /* "post.id AS posts_id" */
        )
        .join("users","comments.user_id","=","users.id")
        .join("posts","comments.post_id","=","posts.id")
        .where("comments.post_id", postId)

        return result
    }        

    public findCommentsWithCreatorsById = async (postsId: string
        ): Promise<CommentsWithCreatorsDB | undefined> => {
        const result: CommentsWithCreatorsDB[] = await BaseDatabase
        .connection(CommentsDatabase.TABLE_COMMENTS)
        .select(
            "comments.id",
            "comments.post_id",
            "comments.user_id",
            "comments.content",
            "comments.likes",
            "comments.dislikes", 
            "comments.created_at",
            "users.name AS creator_name",
        )
        .join("users","comments.user_id","=","users.id")
        .where("comments.id", postsId)

        return result[0]
        
    }     

    public findLikeDislike = async (
        likeDislikeDBToFind: LikeDislikeCommentDB): Promise<COMMENT_LIKE | null> => {
            const [likeDislikeDB]: LikeDislikeCommentDB[] = await BaseDatabase
            .connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENT)
            .select()
            .where({user_id: likeDislikeDBToFind.user_id,
                    comment_id: likeDislikeDBToFind.comment_id
            })

            if (likeDislikeDB) {
                return likeDislikeDB.like === 1 ? COMMENT_LIKE.ALREADY_LIKED : COMMENT_LIKE.ALREADY_DISLIKED
            } else {
                return null
            }
            
    }

    public removeLikeDislike = async (
        likeDislikeDB: LikeDislikeCommentDB): Promise<void> => {
            await BaseDatabase.connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENT)
            .delete()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.comment_id
            })
    }

    public updateLikeDislike = async (
        likeDislikeDB: LikeDislikeCommentDB): Promise<void> => {
            await BaseDatabase.connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENT)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.comment_id
            })
    }

    public likeOrDislikeComment = async (likeDislike: LikeDislikeCommentDB): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_LIKES_DISLIKES_COMMENT)
        .insert(likeDislike)
    }

    public update = async (id: string, commentsDB: CommentsDB): Promise<void> => {
        await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS)
        .update(commentsDB)
        .where({id})
    }
    
}