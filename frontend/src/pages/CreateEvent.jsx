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
    };

    const [event, setEvent] = useState({
        title: '',
        location: '',
        endTime: '',
        startTime: '',
        details: '',
        imageFile: null,
        imagePreview: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload =(e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEvent((prev) => ({
                    ...prev,
                    imageFile: file,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };


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


    const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('location', event.location);
    formData.append('startTime', event.startTime);
    formData.append('endTime', event.endTime);
    formData.append('details', event.details);
    if (event.imageFile) {
        formData.append('image', event.imageFile);
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_APP_API}/api/events`, {
        method: 'POST',
        body: formData
        });

        const data = await response.json();
        if (response.ok) {
        alert('Event created successfully!');
        navigate('/Dashboard');
        } else {
        alert(data.error || 'Error creating event.');
        }
    } catch (err) {
        console.error(err);
        alert('Network error.');
    }
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

                        <button className="md:col-span-2">
                        {/* <label className="block font-medium">Upload Image</label> */}
                        <input
                            type="file"
                            name="image/*"
                            value={event.image}
                            onChange={handleImageUpload}
                            className="px-4 py-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700"
                        />
                        </button>
                    </div>

                    {/* Live Preview */}
                    <div className="border rounded-lg p-6 bg-gray-50 w-[25%]">
                        <h2 className="text-xl text-gray-900 font-semibold mb-2">{event.title || 'Event Title'}</h2>

                        {event.imagePreview && (
                        <img
                            src={event.imagePreview}
                            alt="Event"
                            className="mt-4 max-h-64 object-cover rounded border"
                        />
                        )}

                        <p className="text-gray-600 mb-1">
                        <strong>Where:</strong> {event.location || 'TBD'}
                        </p>

                        <p className="text-gray-600 mb-1">
                        <strong>Start Time:</strong> {formatDateTime(event.startTime) || 'N/A'}
                        </p>

                        <p className="text-gray-600 mb-1">
                        <strong>End Time:</strong> {formatDateTime(event.endTime) || 'N/A'}
                        </p>

                        <p className="text-gray-600 text-wrap mb-1">
                        <strong>Details:</strong> {event.details || 'N/A'}
                        </p>

                        
                    </div>
                </div>

            <div className="flex justify-center pt-[5%]">
                <button onClick={handleSubmit}
                className="px-8 py-4 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700"
                >
                    Create Event
                </button>
            </div>
            </main>

        </>
    )

}

export default CreateEvent;