//This is a centralised API that can be re-used
import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activities';

//This adds in delay period
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
} 

axios.defaults.baseURL = 'http://localhost:5000/api';

//Do this when we get the response back from API
//If there is ... in QF to convert to async then do
 axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
 })
 
//The response from Axios is passed here, get response.data and assign to responseBody variable
//<T> is the generic type four our respons body. <T> would then be substitured for the Activity[] below.
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),  
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),  
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody), 
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),    
}

//Object that will store request above for our activities
const Activities = {
    list: () => requests.get<Activity[]>('/activities'), //add a request to list the activities by passing in the url of the activity
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/activities', activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`),

} 
 
const agent = {
    Activities
}

export default agent; 