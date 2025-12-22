import axios from "axios";



const axiosNew = axios.create({
    baseURL : "https://6904a8da6b8dabde49649a5f.mockapi.io/dashbord"
})


axiosNew.interceptors.request.use(
    (config)=>{
        var token = sessionStorage.getItem('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        console.log(config);
        return config
        

} , 
(error)=>{console.error(error);
})


export default axiosNew;