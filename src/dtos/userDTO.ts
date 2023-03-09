import { PostsModel } from "../types"

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
