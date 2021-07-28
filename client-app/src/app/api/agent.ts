import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';


// Add fake delay
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

//Setting the base URL
axios.defaults.baseURL = 'http://localhost:5000/api';

/**
 * setting up loading/ waiting
 * interceptors are checkpoints
 * we can send recieved reponse through this checkpoint to perform something
 */
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);        
        return response;
    } catch (err) {
        console.log(err);
        return await Promise.reject(err);
    }    
});

const responseBody = <T> (response: AxiosResponse<T>) =>  response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post:<T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}


 /**
   * client-app is running on port 3000
   * here it is trying to send requests to a different port (different domain) (see base URL)
   * Browser security will stop this
   * To allow that we need to add CORS support in Startup.cs class (to whitelist new port or domain)
   * In Configure() and ConfigureServices()
*/

//object to store requests for Activity
const Activities = {
    list: () => requests.get<Activity[]>('/activities'), //Base URL will automatically bind here
    details: (id:string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity:Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}              

export default agent;//Now we can use agent in other places