import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bigIcon from '../assets/icon-big-nobg.png';
import { useNavigate } from 'react-router-dom';
import plusIcon from '../assets/plus-circle.svg';

const Dashboard = () => {

    const navigate = useNavigate();
/* 
    const [token, setToken] = useState('');
    // const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        setToken(accessToken || 'No token found');
      }, []);
 */

    const handleCreateEvent = () => {
        navigate('/CreateEvent');
    }

    return (
        <>
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-blue-600 border-gray-300">
                <Link href="/Dashboard" className="flex items-center gap-2 font-semibold">
                    <img src={bigIcon} className="h-10"/>
                    <span>Headliner</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <span className="text-sm font-medium font-sans hover:underline underline-offset-4 cursor-pointer">
                        Features
                    </span>
                    <span className="text-sm font-medium font-sans hover:underline underline-offset-4 cursor-pointer">
                        About
                    </span>
                    <span className="text-sm font-medium font-sans hover:underline underline-offset-4 cursor-pointer">
                        Contact
                    </span>
                </nav>
            </header>

            <main className="bg-gradient-to-t from-purple-600 to-blue-600 h-screen pt-[2%]">
                <div className="flex justify-center items-center">
                    <div className="items-center justify-center rounded-[45px] cursor-pointer flex bg-cyan-500/40 h-[40vh] w-[30vw]"
                        onClick={handleCreateEvent}>
                        <div className="items-center justify-center">
                            <img src={plusIcon} className="m-auto block h-20" />
                            <p className="pt-[10%] text-3xl">Create an event</p>
                        </div>
                        
                    </div>
                </div>
            </main>
        </>
    )
}

export default Dashboard;