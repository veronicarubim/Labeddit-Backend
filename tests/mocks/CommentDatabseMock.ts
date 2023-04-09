import { CommentsDB, CommentsWithCreatorsDB, COMMENT_LIKE, LikeDislikeCommentDB } from "../../src/types";
import { BaseDatabase } from "../../src/database/BaseDatabase";

export class CommentsDatabaseMock extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_LIKES_DISLIKES_COMMENT = "likes_dislikes_comment"

    public delete = async (id: string): Promise<void> => {
    }

    public findById = async (id: string): Promise<CommentsDB | undefined> => {
        const result = [
            {
                id: 'id-mock', 
                post_id: 'postid-mock', 
                user_id: 'userid-mock',
                content: 'content-mock', 
                likes: 1, 
                dislikes: 1, 
                created_at: '23-03-2023',
            },
            {
                id: 'id-mock', 
                post_id: 'postid-mock', 
                user_id: 'userid-mock',
                content: 'content-mock', 
                likes: 1, 
                dislikes: 1, 
                created_at: '23-03-2023',
            }
        ]
        return result[0]
    }

    public insert = async (commentsDB: CommentsDB): Promise<void> => {

    }

    public getComments = async (postId: string): Promise<CommentsWithCreatorsDB[]> => {
        const result = [
            {
                id: 'id-mock', 
                post_id: 'postid-mock', 
                user_id: 'userid-mock',
                content: 'content-mock', 
                likes: 1, 
                dislikes: 1, 
                created_at: '23-03-2023',
                creator_name: 'maria'
            },
            {
                id: 'id-mock2', 
                post_id: 'postid-mock', 
                user_id: 'userid-mock2',
                content: 'content-mock2', 
                likes: 1, 
                dislikes: 1, 
                created_at: '23-03-2023',
                creator_name: 'maria'
            },
        ]
            return result
    }        

    public findCommentsWithCreatorsById = async (postsId: string
        ): Promise<CommentsWithCreatorsDB | undefined> => {

            const result = [
                {
                id: 'id-mock2', 
                post_id: 'postid-mock', 
                user_id: 'userid-mock2',
                content: 'content-mock2', 
                likes: 1, 
                dislikes: 1, 
                created_at: '23-03-2023',
                creator_name: 'maria'},
                {
                id: 'id-mock2', 
                post_id: 'postid-mock', 
                user_id: 'userid-mock2',
                content: 'content-mock2', 
                likes: 1, 
                dislikes: 1, 
                created_at: '23-03-2023',
                creator_name: 'maria'}
            ]


        return result[0]
        
    }     

    public findLikeDislike = async (
        likeDislikeDBToFind: LikeDislikeCommentDB): Promise<COMMENT_LIKE | null> => {
            
            if (likeDislikeDBToFind.like === 1) {
                return COMMENT_LIKE.ALREADY_LIKED 
              } else if (likeDislikeDBToFind.like === 0) {
                return COMMENT_LIKE.ALREADY_DISLIKED
                } else { return null}
    }

    public removeLikeDislike = async (
        likeDislikeDB: LikeDislikeCommentDB): Promise<void> => {
    }

    public updateLikeDislike = async (
        likeDislikeDB: LikeDislikeCommentDB): Promise<void> => {

    }

    public likeOrDislikeComment = async (likeDislike: LikeDislikeCommentDB): Promise<void> => {

    }

    public update = async (id: string, commentsDB: CommentsDB): Promise<void> => {

    }
    
}