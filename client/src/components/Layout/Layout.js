import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'

const Layout = (props)=>{
    return (
        <div>

            <Helmet>
                <meta charset='utf-8'/>
                <meta name='description' content={props.description}/>
                <meta name='keywords' content={props.keywords}/>
                <meta name='author' content={props.author}/>
                <meta name='robots' content='noindex,nofollow'/>
                <title>{props.title}</title>
            </Helmet>

            <Header/>
            <main>
                {props.children}
            </main>
            <Footer/>
        </div>
    )
}

Layout.defaultProps = {
    title: 'Atish',
    description : 'Mern stack',
    keywords:'Products',
    author:'Atish'
}

export default Layout