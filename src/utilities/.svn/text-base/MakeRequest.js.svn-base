import Axios from 'axios';
import { baseUrl } from '../constants/constants';
export default {
    post(url,data) {
        return new Promise((resolve, reject) => {
             Axios(
                {
                    method: 'post',
                    url: `${baseUrl}${url}`,
                    data: JSON.stringify(data),
                    withCredentials: true,
                    responseType: 'json',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                    }
                }
            )
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                })
        }
        )
    }
    ,
    postAuth() {

    },
    get() {

    },
    getAuth() {

    }

}