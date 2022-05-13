import { ApiResponse } from "../../interfaces/response/ApiResponse";
import { User } from "../../interfaces/user/user";
import { FasicellSerce } from '../FasicellService';

export class AuthService {
    public static async login(obj: User): Promise<ApiResponse> {
        return (await FasicellSerce.post('/login', obj)).data
    }
}