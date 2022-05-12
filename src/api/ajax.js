import axios from 'axios';
import storageUtils from '../utils/storageUtils';
const qs = require('qs');

export default function ajax(url, data = {}, method = 'GET') {
    const user = storageUtils.getUser();
    const token = user.token;
    const instance = axios.create();
    return new Promise((resolve) => {
        let promise;
        console.log(token);
        console.log(data);
        if (method === 'GET') {
            promise = instance.get(url, { headers: { 'Authorization': `Bearer ${ token }`}});
        } else if (method === 'POST') {
            promise = token ? instance.post(url, data, { headers: { 'Authorization': `Bearer ${ token }` } }) : axios.post(url, data);
        } else if (method === 'PUT') {
            promise = instance.put(url, qs.stringify(data), { headers: {'Content-Type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${ token }` }});
        } else {
            promise = undefined;
        }
        promise.then((response) => {
            console.log(url+':'+response.data);   
            resolve(response.data);
            
        }).catch((error) => {
            //const parsedMessage = JSON.parse(error.request.responseText);
            //message.error('Request failed: ' + parsedMessage['message'], 10);
        });
    })
} 