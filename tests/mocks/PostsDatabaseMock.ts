import { BaseDatabase } from "../../src/database/BaseDatabase"
import { LikeDislikeDB, PostsDB, PostsWithCreatorsDB, POST_LIKE } from "../../src/types";

export class PostDabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public async findPostById(id: string) {
        const result = 
        {   id: 'id-fake', 
            creator_id: 'creator-mock', 
            content: 'content-mock', 
            likes: 1, 
            dislikes: 1, 
            created_at: '23-03-2023', 
            updated_at: '26-03-2023'
        }  
        if (id === "id-fake") {
            return result                    
        }
    }

    public getPostsWithCreators = async () => {
        const result = [
            {
                id: 'id-fake',
                creator_id: 'creator-mock', 
                content: 'content-mock', 
                likes: 1, 
                dislikes: 1, 
                created_at: '23-03-2023', 
                updated_at: '26-03-2023',
                creator_name: 'maria'
            },
            {
                id: 'id-fake2',
                creator_id: 'creator-mock2', 
                content: 'content-mock2', 
                likes: 1, 
                dislikes: 1, 
                created_at: '23-03-2023', 
                updated_at: '26-03-2023',
                creator_name: 'maria'
            },
        ]
        
        return result     
    }

    public insert = async (postsDB: PostsDB): Promise<void> => {
        
    }

    public findById = async (id: string): Promise<PostsDB | undefined> => {
        const result = [
            {
            id: 'id-fake',
            creator_id: 'creator-mock', 
            content: 'content-mock', 
            likes: 1, 
            dislikes: 1, 
            created_at: '23-03-2023', 
            updated_at: '26-03-2023',
            creator_name: 'maria'
        },
        {
            id: 'id-fake2',
            creator_id: 'creator-mock2', 
            content: 'content-mock2', 
            likes: 1, 
            dislikes: 1, 
            created_at: '23-03-2023', 
            updated_at: '26-03-2023',
            creator_name: 'maria'
        }
    ]

        return result[0]
    }

    public update = async (id: string, postsDB: PostsDB): Promise<void> => {
        
    }

    public delete = async (id: string): Promise<void> => {
     
    }

    public likeOrDislikePost = async (likeDislike: LikeDislikeDB): Promise<void> => {

    }

    public findPostsWithCreatorsById = async (postsId: string
        ): Promise<PostsWithCreatorsDB | undefined> => {
        const result = [
            {
            id: 'id-fake',
            creator_id: 'creator-mock', 
            content: 'content-mock', 
            likes: 1, 
            dislikes: 1, 
            created_at: '23-03-2023', 
            updated_at: '26-03-2023',
            creator_name: 'maria'
        },
        {
            id: 'id-fake2',
            creator_id: 'creator-mock2', 
            content: 'content-mock2', 
            likes: 1, 
            dislikes: 1, 
            created_at: '23-03-2023', 
            updated_at: '26-03-2023',
            creator_name: 'maria'
        }
    ]
        return result[0]
        
    } 

    public findLikeDislike = async (
        likeDislikeDBToFind: LikeDislikeDB): Promise<POST_LIKE | null> => {
          if (likeDislikeDBToFind.like === 1) {
            return POST_LIKE.ALREADY_LIKED 
          } else if (likeDislikeDBToFind.like === 0) {
            return POST_LIKE.ALREADY_DISLIKED
          } else {return null}
            
        }
    
        public removeLikeDislike = async (
            likeDislikeDB: LikeDislikeDB): Promise<void> => {

        }

        public updateLikeDislike = async (
            likeDislikeDB: LikeDislikeDB): Promise<void> => {

        }
}