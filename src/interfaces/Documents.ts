import { User } from './User';
export interface Documents {
    id?: string
    propietario?: string
    dateCreation?: string 
    name?: string
    size?: string
    type?: string
    base64?: string | null | ArrayBuffer
}