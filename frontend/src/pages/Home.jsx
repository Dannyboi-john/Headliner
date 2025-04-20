import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    console.log("this is my home page  :)");


    return (
        <>
            <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-300">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span>Headliner</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <span className="text-sm font-medium font-sans hover:underline underline-offset-4">
                        Features
                    </span>
                    <span className="text-sm font-medium font-sans hover:underline underline-offset-4">
                        About
                    </span>
                    <span className="text-sm font-medium font-sans hover:underline underline-offset-4">
                        Contact
                    </span>

                </nav>
            </header>
        </>
    )
}

export default Home;