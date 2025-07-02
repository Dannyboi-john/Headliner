import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bigIcon from '../assets/icon-big-nobg.png';
import { useNavigate } from 'react-router-dom';
import plusIcon from '../assets/plus-circle.svg';
import axios from 'axios';

const Dashboard = ({ eventId }) => {

    const navigate = useNavigate();

    const [events, setEvents] = useState([]);

    const [selected, setSelected] = useState(null);

    const [selectedReactions, setSelectedReactions] = useState({});

    const fetchReactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/attendance`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const reactionsMap = {};
            res.data.forEach(({ event_id, status }) => {
                reactionsMap[event_id] = status;
            });

            setSelectedReactions(reactionsMap);
        } catch (err) {
            console.error('Error fetching reactions', err);
        };
    }

    const handleCreateEvent = () => {
        navigate('/CreateEvent');
    }

    const handleReact = async (eventId, reaction) => {
        try {
            await axios.post(`${import.meta.env.VITE_APP_API}/api/attendance/${eventId}`, { reaction }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setSelected(reaction);
            setSelectedReactions(prev => ({
                ...prev,
                [eventId]: reaction,
            }));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('token');

            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/events/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEvents(res.data);
            } catch (err) {
                console.error('Error fetching events :(', err);
            }
        };

        fetchEvents();
        fetchReactions();         
    }, []);

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



            <main className="bg-gradient-to-t from-purple-600 to-blue-600 min-h-screen pt-[2%]">

                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{/*                         {events.map(event => (

                            <div key={event.id} className="bg-white text-black p-4 rounded shadow">
                                <Link to={`/events/${event.id}`}>
                                    
                                    <h2 className="text-xl font-semibold">{event.event_name}</h2>
                                    <p className="text-sm text-gray-600">{event.event_location}</p>
                                    <p className="text-sm text-gray-600">
                                        {new Date(event.start_time).toLocaleString()} → {new Date(event.end_time).toLocaleString()}
                                    </p>
                                    {event.image_url && (
                                        <img src={`http://localhost:5000${event.image_url}`} alt="event" className="w-[25%] h-40 object-cover mt-2 rounded" />
                                    )}
                                    <p className="mt-2">{event.event_description}</p>
                                </Link>

                                <div className="flex space-x-4 mt-4">
                                    {['Going', 'Interested', 'Liked'].map((reaction) => (
                                        <button
                                            key={reaction}
                                            className={`px-4 py-2 rounded transition ${
                                                selectedReactions[event.id] === reaction
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 hover:bg-blue-500 hover:text-white'
                                                }`}
                                            onClick={() => handleReact(event.id, reaction)}
                                        >
                                            {reaction}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            ))}  */}





                        {events.map(event => (

                            <div key={event.id} className="bg-white text-black p-4 rounded shadow">
                                <Link to={`/events/${event.id}`}>

                                    <div className="grid grid-col grid-cols-[1fr_3fr] gap-x-[1em]">
                                        <div>
                                            {event.image_url && (
                                                <img src={`http://localhost:5000${event.image_url}`} alt="event" className="w-full h-40 object-cover mt-2 rounded" />
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold">{event.event_name}</h2>
                                            <p className="text-sm text-gray-600">{event.event_location}</p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(event.start_time).toLocaleString()} → {new Date(event.end_time).toLocaleString()}
                                            </p>
                                            <p className="mt-2">{event.event_description}</p>
                                        </div>
                                    </div>
                                    
                                    
                                </Link>

                                <div className="flex space-x-4 mt-4">
                                    {['Going', 'Interested', 'Liked'].map((reaction) => (
                                        <button
                                            key={reaction}
                                            className={`px-4 py-2 rounded transition ${
                                                selectedReactions[event.id] === reaction
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 hover:bg-blue-500 hover:text-white'
                                                }`}
                                            onClick={() => handleReact(event.id, reaction)}
                                        >
                                            {reaction}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            ))}

                        <div className="items-center justify-center rounded-[45px] cursor-pointer flex bg-cyan-500/40 h-[40vh] w-[30vw]"
                            onClick={handleCreateEvent}>
                            <div className="items-center justify-center">
                                <img src={plusIcon} className="m-auto block h-20" />
                                <p className="pt-[10%] text-3xl">Create an event</p>
                            </div>
                        
                    </div>
                        

                    </div>
                </div>

            </main>
        </>
    )
}

export default Dashboard;