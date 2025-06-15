import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API}/api/events/${id}`)
            .then(res => setEvent(res.data))
            .catch(err => console.error(err));
    }, [id]);


if (!event) return <p className="text-white p-4">Loading event...</p>

return (
    <main className="min-h-screen bg-gradient-to-t from-purple-600 to-blue-600 text-white p-8">
        <div className="max-w-3xl mx-auto bg-white text-black rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <p className="italic text-gray-600 mb-2">{event.location}</p>
            <p className="mb-2">
                {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
            </p>
            {event.image && (
                <img src={event.image} alt={event.title} className="w-full rounded my-4" />
            )}
            <div className="prose">{event.details}</div>
        </div>
    </main>
    );
};

export default EventPage;