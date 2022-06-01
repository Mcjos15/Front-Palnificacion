
import axios from 'axios';
import { User } from '../interfaces/User';

const AxiosClient = axios.create({
  baseURL: "http://localhost:5000",
})
export default AxiosClient
/*export class AxiosClient {
  /*function AxiosClient() {
    const post = axios.post('http://localhost:4000/login').then(res => {
      console.log(res);
    })

  const get = axios.get('http://localhost:4000/login').then(res => {
    console.log(res);
  })
}*/
/*async getAllUser() {
  return await axios.get<Array<User>>('http://localhost:43012/api/user')
    .then(res => {
      console.log(res.data);
    });

}

async insertUser(user: User) {
  return await axios.post('http://localhost:43012/api/user', user).then(res => {
    console.log(JSON.stringify(res.data));
  })
}

}*/
//export default new AxiosClient();
//export default getAllUser 
