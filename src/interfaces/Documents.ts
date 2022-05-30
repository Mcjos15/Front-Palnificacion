import { User } from './User';
export interface Documents {
    id?:number
    user?:User
    base64:string|null|ArrayBuffer
}