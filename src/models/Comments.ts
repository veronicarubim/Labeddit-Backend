import { CommentsDB, CommentsModel } from "../types"

export class Comments {
    constructor(
        private id: string, 
        private postId: string,
        private userId: string,
        private content: string, 
        private likes: number, 
        private dislikes: number, 
        private createdAt: string, 
        private creatorName: string,

    ) {}

    public addLike() {
        this.likes += 1
    }

    public removeLike() {
        this.likes -= 1
    }

    public addDislike() {
        this.dislikes += 1
    }

    public removeDislike() {
        this.dislikes -= 1
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number) {
        this.likes = value
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number) {
        this.dislikes = value
    }

    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }
 
    public getPostId(): string {
        return this.postId
    }

    public setPostId(value: string): void {
        this.postId = value
    }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getcreatedAt(): string {
        return this.createdAt
    }

    public setcreatedAt(value: string): void {
        this.createdAt = value
    }

    public toDBModel(): CommentsDB {
        return {
         id: this.id, 
         user_id: this.userId,
         post_id: this.postId,
         content: this.content, 
         likes: this.likes, 
         dislikes: this.dislikes, 
         created_at: this.createdAt, 
        }
    }

    public toBusinessModel(): CommentsModel {
        return {
            id: this.id,
            userId: this.userId,
            postId: this.postId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            creator: {
                name: this.creatorName }
                }
    }

}