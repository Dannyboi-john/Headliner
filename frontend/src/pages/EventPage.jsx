import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bigIcon from '../assets/icon-big-nobg.png';
import arrowLeft from '../assets/arrow-left.svg';
import { useNavigate } from 'react-router-dom';

const EventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('token');

            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/events/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEvent(res.data);
            } catch (err) {
                console.error('Unauthorized or failed to fetch event :(', err);
            }
        };

        fetchEvents();
    }, [id]);

    const handleReturn = () =>
        navigate('/Dashboard');
        

    const formatDateTime = (datetimeString) => {
    const date = new Date(datetimeString);
    if (isNaN(date.getTime())) {
        // Invalid date
        return '';
    }

    return new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })
        .format(date)
    };


if (!event) return <p className="text-white p-4">Loading event...</p>

return (
    <>

        <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-blue-600 border-gray-300">
            <Link to="/Dashboard" className="flex items-center gap-2 font-semibold">
                <img src={bigIcon} className="h-10"/>
                <span>Headliner</span>
            </Link>
            <nav className="ml-auto flex justify-end gap-4 sm:gap-6">
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


        <main className="min-h-screen bg-gradient-to-t from-purple-600 to-blue-600 text-white p-8">

            <button onClick={handleReturn}
            className="px-8 py-4 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700"
            >
                <span className="flex items-center">
                    <svg className="w-6 h-6 pr-2 text-blue-50" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M15.75 19.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.44 6.44a.75.75 0 010 1.06z" />
                        </svg>
                    Back to Events
                </span>

            </button>

            <div className="max-w-3xl mx-auto bg-white text-black rounded-lg shadow-lg p-6">
                {event.image_url && (
                    <img src={`http://localhost:5000${event.image_url}`} alt={event.title} className="w-full object-contain rounded my-4" />
                )}
                <h1 className="text-3xl font-bold mb-4">{event.event_name}</h1>
                <p className="italic text-gray-600 mb-2">{event.event_location}</p>
                <p className="mb-2">
                    Starts: {formatDateTime(event.start_time)}
                </p>
                <p className="mb-2">
                    Ends: {formatDateTime(event.end_time)}
                </p>
                <div className="prose">{event.event_description}</div>
            </div>
        </main>
    </>
    );
};

export default EventPage;