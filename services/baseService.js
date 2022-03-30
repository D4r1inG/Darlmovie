import Axios  from "axios"
import { DOMAIN,TOKEN } from '../util/settings/config'

export class baseService {
    Put = (url, model) =>{
        return  Axios({
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }

    Post = (url, model) => {
        return  Axios({
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }

    Get = (url) => {
        return  Axios({
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }

    Delete = (url) => {
        return  Axios({
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })  
    }
}