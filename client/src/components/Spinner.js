import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'

const Spinner = ()=>{

    const [count,setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=>
                --prevValue
        )
        },1000)

        count === 0 && navigate('/login',{
            state:location.pathname
        })

        return ()=>clearInterval(interval)

    },[count,navigate,location])

    return(
        <>
            <div className='d-flex flex-column justify-content-center align-items-center text-center' style={{height:'100vh'}}>
            <div className='text-center  pb-5'> redirecting to you {count} in second </div>
            <div className='spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>
            </div>
        </>
    )
}

export default Spinner