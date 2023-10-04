import {useState,useEffect} from 'react'
import {useAuth} from '../../context/auth'
import {Outlet} from 'react-router-dom'
import Spinner from '../Spinner'

export default function PrivateRoute()
{
    const [ok,setOk] = useState(false)
    const [auth,setAuth]=useAuth()

    useEffect(()=>{
        const authCheck= async()=>{       

            const response = await fetch(`/api/v1/auth/user-auth`, {
                method: 'GET',
                headers: {
                    Authorization:auth?.token,
                }
              });
    
            if(response.ok)
            {
                setOk(true)
            }
            else
            {
                setOk(false)
            }
        }
    
        if(auth?.token)
            authCheck()

    },[auth?.token])

    return ok ? <Outlet/> : <Spinner/>

}