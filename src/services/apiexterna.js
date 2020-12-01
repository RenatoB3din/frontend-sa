import axios from 'axios';

const apiexterna = axios.create({ 
    baseURL: 'https://viacep.com.br/ws/',  
})

export default apiexterna; 
