import React, { useState } from 'react';

function Button({ onClick, children }) {

    return (
        <button
            className="text-gray-100 bg-indigo-600 hover:text-white border border-red-50 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 w-[25%] py-2.5 text-center h-1/2"
            onClick={onClick}
                >{children}
            </button>
    )
} export default Button;