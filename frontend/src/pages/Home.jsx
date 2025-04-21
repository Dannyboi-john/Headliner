import React /*, { useState } */ from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/icon-small-nobg.png';
import bigIcon from '../assets/icon-big-nobg.png';

const Home = () => {
    console.log("this is my home page  :)");


    return (
        <>
            <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-300">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <img src={icon} className="h-10"/>
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

            <main className="bg-gradient-to-t from-[#363636] to-[#242424] h-screen">
                <div className="grid grid-cols-[2fr_1fr] items-center mt-[20%] ml-[5%]"> {/* Container for the body */}
                    <div className="flex items-center"> {/* Container for the left 2/3rds: logo / header / description */}
                        <img src={bigIcon} className="w-1/5"/>
                        <p className="text-6xl font-primary pl-[5%]">Connect with Local Musicians</p>
                    </div>
                    <div> {/* Container for the right 1/3rd: login & register toggle buttons / login & register forms */}
                    </div>
                </div>
            </main>

        </>
    )
}

export default Home;