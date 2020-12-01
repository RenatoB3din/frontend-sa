import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rs-pdv.herokuapp.com',  
})

export default api; 

