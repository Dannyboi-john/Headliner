import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import bigIcon from '../assets/icon-big-nobg.png';

const EventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API}/api/events/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.error(err));
    }, [id]);



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


        <main className="min-h-screen bg-gradient-to-t from-purple-600 to-blue-600 text-white p-8">
            <div className="max-w-3xl mx-auto bg-white text-black rounded-lg shadow-lg p-6">
                {event.image_url && (
                    <img src={`http://localhost:5000${event.image_url}`} alt={event.title} className="w-full rounded my-4" />
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