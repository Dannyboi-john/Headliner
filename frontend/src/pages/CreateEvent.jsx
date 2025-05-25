import react, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bigIcon from '../assets/icon-big-nobg.png';
import { useNavigate } from 'react-router-dom';
import plusIcon from '../assets/plus-circle.svg';

const CreateEvent = () => {

    const navigate = useNavigate();
    const handleDashboardNav = (e) => {
        e.preventDefault();
        navigate("/Dashboard");
    }

    const [event, setEvent] = useState({
        title: '',
        location: '',
        endTime: '',
        startTime: '',
        details: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    return (
        <>
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-blue-600 border-gray-300">
                <Link href="/Dashboard" 
                    className="flex items-center gap-2 font-semibold"
                    onClick={handleDashboardNav}>
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

            <main className="bg-gradient-to-t from-purple-600 to-blue-600 h-screen pt-[2%]">
                <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
      
                {/* Form */}
                <div className="flex justify-center flex-row gap-[2rem]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div>
                        <label className="block font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={event.title}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        </div>

                        <div>
                        <label className="block font-medium">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={event.location}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        </div>

                        <div>
                        <label className="block font-medium">Start Time</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={event.startTime}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        </div>

                        <div>
                        <label className="block font-medium">End Time</label>
                        <input
                            type="datetime-local"
                            name="endTime"
                            value={event.endTime}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        </div>

                        <div className="md:col-span-2">
                        <label className="block font-medium">Details</label>
                        <textarea
                            name="details"
                            value={event.details}
                            onChange={handleChange}
                            className="w-full border p-2 rounded h-32"
                        />
                        </div>

                        <div className="md:col-span-2">
                        <label className="block font-medium">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={event.image}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div className="border rounded-lg p-6 bg-gray-50 w-[25%]">
                        <h2 className="text-xl text-gray-900 font-semibold mb-2">{event.title || 'Event Title'}</h2>

                        <p className="text-gray-600 mb-1">
                        <strong>Where:</strong> {event.location || 'TBD'}
                        </p>

                        <p className="text-gray-600 mb-1">
                        <strong>When:</strong> {event.startTime || 'N/A'}
                        </p>

                        <p className="text-gray-600 mb-1">
                        <strong>Until:</strong> {event.endTime || 'N/A'}
                        </p>

                        <p className="text-gray-600 text-wrap mb-1">
                        <strong>Details:</strong> {event.details || 'N/A'}
                        </p>

                        {event.image && (
                        <img
                            src={event.image}
                            alt="Event"
                            className="mt-4 max-h-64 object-cover rounded border"
                        />
                        )}
                    </div>
                </div>
            </main>

        </>
    )

}

export default CreateEvent;