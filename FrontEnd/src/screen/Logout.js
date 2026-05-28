import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'



const Logout = () => {
    const navigate=useNavigate()

    useEffect(()=>{
        const token=localStorage.getItem("token")
        if(token!=null){
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('email')
            localStorage.removeItem('id')
            navigate("/login")
        }
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Logout
