import { CommentsModel, PostsModel } from "../types"

// ENDPOINTS: 

/* Signup */

  export interface SignupInputDTO {
    name: unknown,
    email: unknown,
    password: unknown
  }

  export interface SignupOutputDTO {
    token: string
  }

/* Login  */

  export interface LoginInputDTO {
    email: unknown,
    password: unknown
  }

  export interface LoginOutputDTO {
    token: string
  }

/* Get Posts */

  export interface GetPostsInputDTO {
    token: string | undefined
  }

  export type GetPostsOutputDTO = PostsModel[]

/* Create Posts */

  export interface CreatePostsInputDTO {
    token: string | undefined,
    content: string

  }

/* Edit Posts */

  export interface EditPostsInputDTO {
    idToEdit: string,
    token: string | undefined,
    content: string | unknown
  }

/* Delete Posts */

  export interface DeletePostsInputDTO {
    idToDelete: string,
    token: string | undefined
  }

/* Like ou Dislike Posts */

  export interface LikeOrDislikePostsInputDTO {
    idToLikeOrDislike: string,
    token: string | undefined,
    like: unknown
  }

/* Comentários */
 //GET
 
  export interface GetCommentsInputDTO {
    token: string | undefined,
    postId: string,
  }

  export type GetCommentsOutputDTO = CommentsModel[]

  // CREATE

  export interface CreateCommentsInputDTO {
    token: string | undefined,
    postId: string,
    content: string
  }

  // DELETE

  export interface DeleteCommentsInputDTO {
    id: string,
    token: string | undefined
  }

  export interface likeDislikeCommentsInputDTO {
    id: string,
    token: string | undefined,
    like: unknown
  }

