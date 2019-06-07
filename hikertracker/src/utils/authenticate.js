import axios from 'axios'

export default function setAuthenticationHeader(token){

    //console.log(token)
    //set the token in the header
    if(token){
        //set the headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
        //remove the token
        delete axios.defaults.headers.common['Authorization']
    }
}