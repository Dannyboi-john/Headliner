import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bigIcon from '../assets/icon-big-nobg.png';
import Login from '../components/Login';
import Register from '../components/Register';
import Button from '../components/Button';

const Home = () => {

    const [isRegistered, setIsRegistered] = useState(false);

    const handleShowLogin =(e) => {
        e.preventDefault();
        setIsRegistered(true);

    }

    const handleShowRegister =(e) => {
        e.preventDefault();
        setIsRegistered(false);
    }



    return (
        <>
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-blue-600 border-gray-300">
                <Link href="/" className="flex items-center gap-2 font-semibold">
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

            <main className="bg-gradient-to-t from-purple-600 to-blue-600 h-screen">
                <div className="grid grid-cols-[3fr_2fr] items-start mt-0  ml-[3%] mr-[3%]"> {/* Container for the body */}
                    <div className="grid grid-rows-2 items-start pt-[30%] mr-[5%] ml-[7%]"> {/* Container for the left 2/3rds: logo / header / description */}
                        <div className="flex items-center">
                            <img src={bigIcon} className="w-1/10"/>
                            <p className="text-7xl font-primary pl-[5%]">Connect with Local Musicians</p>
                        </div>
                        <p className="block text-2xl pl-[2%] mt-[2%] italic">Find bandmates, collaborate on projects,
                            and join the local music scene. Headliner helps you build your
                            musical network and get in touch with noise-makers in your area.
                        </p>
                    </div>
                    <div className="pt-[20%] ml-[20%] mr-[20%]"> {/* Container for the right 1/3rd: login & register toggle buttons / login & register forms */}
                        <div className="flex flex-row flex-[25%_25%] justify-evenly">
                        <Button onClick={handleShowLogin}>Login</Button>
                        <Button onClick={handleShowRegister}>Register</Button>
                        </div>
                        {isRegistered
                            ? <Login />
                            : <Register />}
                    </div>
                </div>
            </main>

        </>
    )
}

export default Home;