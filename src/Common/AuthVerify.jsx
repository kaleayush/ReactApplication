import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const AuthVerify=()=>{
    const dispatch=useDispatch()
    let navigate=useNavigate()
    const parseJwt=(token)=>{
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (error) {
            return null;
        }
    }
    const {userData,isUser}=useSelector((state)=>state?.auth)
    useEffect(()=>{
        if(isUser){
           const decodedJwt=parseJwt(userData?.accessToken)
           if(decodedJwt.exp * 1000 < Date.now()){
            
           }
        }
      
    },[])
    return <></>
}