import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigator = useNavigate();

    useEffect(
        ()=>{
            const lsAdmin = localStorage.getItem("admin");
            if(!lsAdmin){
                navigator("sign-in")
            }
        },[]
    )
    
    return (
        <div className='mb-14'>
            Dashboard
        </div>
    );
}

export default Dashboard;
