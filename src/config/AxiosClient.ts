import React, { useState } from 'react'
import axios from 'axios';
import { User } from '../interfaces/User';

/*export default axios.create({
  baseURL: "http://localhost:5000/api/user",
  headers: {
    "Content-type": "application/json"
  }
});*/
export class AxiosClient {
  /*function AxiosClient() {
    const post = axios.post('http://localhost:4000/login').then(res => {
      console.log(res);
    })

  const get = axios.get('http://localhost:4000/login').then(res => {
    console.log(res);
  })
}*/
  async getAllUser() {
    return await axios.get<Array<User>>('http://localhost:5000/api/user')
      .then(res => {
        console.log(res.data);
      });

  }

  async insertUser(user: User) {
    return await axios.post('http://localhost:5000/api/user', { user }).then(res => {
      console.log(res);
    })
  }

}
//export default new AxiosClient();
//export default getAllUser 
