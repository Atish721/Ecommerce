import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ()=>{
    return (
        <div className='footer'>
            <p>
                <p>All right reserved &copy; Atish</p>
                <Link to='/about'>About</Link>
                |
                <Link to='/contact'>Contact</Link>
                |
                <Link to='/policy'>Privacy Policy</Link>
            </p>
        </div>
    )
}

export default Footer