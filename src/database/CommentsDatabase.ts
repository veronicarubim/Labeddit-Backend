import { CommentsDB, CommentsWithCreatorsDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CommentsDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"

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

        return result
    }        
    
    
}