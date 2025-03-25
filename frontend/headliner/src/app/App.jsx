import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

    const [info, setInfo] = useState([]);

    const fetchAPI = async () => {
        const response = await axios.get("http://localhost:3000/api");
        setInfo(response.data.fruits);
        console.log(response.data.fruits);
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <>

        <h2>Welcome 2 my web app :3 {info}</h2>

        </>
    )
}

export default App;