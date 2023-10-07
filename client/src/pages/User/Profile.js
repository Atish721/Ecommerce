import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Profile = () =>{
    return (
        <Layout title={'Profile | Atish'}>
            <div className='container-fluid m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9">
                        <h4>Profile</h4>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
