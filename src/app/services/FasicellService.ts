import axios from "axios";
import { environment } from "../../environments/enviroment";
//servicio que se encarga de conectar el front con la base
export class FasicellSerce {
    static baseURL = environment.baseURL;

    public static post(path: string, obj: any): Promise<any> {
        return axios.post(this.baseURL + path, obj);
    }
}