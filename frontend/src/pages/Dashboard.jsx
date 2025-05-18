import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bigIcon from '../assets/icon-big-nobg.png';

const Dashboard = () => {

    console.log("You are now off the home page");

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
                <div>Look at you go!</div>
            </main>
        </>
    )
}

export default Dashboard;