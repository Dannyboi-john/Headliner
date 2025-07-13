import React, { useState, useEffect } from 'react';
import redHeart from '../assets/red-heart-icon.svg';
import clearHeart from '../assets/heart-thin-icon.svg';

const LikeButton = ({ eventId }) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const token = localStorage.getItem('token');

useEffect(() => {
    const fetchLikesAndStatus = async () => {
        try {
            const [likesRes, userRes] = await Promise.all([
                fetch(`${import.meta.env.VITE_APP_API}/api/eventLikes/${eventId}/likes`),
                fetch(`${import.meta.env.VITE_APP_API}/api/eventLikes/${eventId}/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            if (!likesRes.ok || !userRes.ok) {
                throw new Error(`Bad response: likes ${likesRes.status}, user ${userRes.status}`);
            }

            const likesData = await likesRes.json();
            const userData = await userRes.json();

            setLikes(likesData.likes);
            setIsLiked(userData.liked);
        } catch (err) {
            console.error(`Error loading likes for the event ${eventId}`, err);
        }
    };

    if (eventId && token) {
        fetchLikesAndStatus();
    }
}, [eventId, token]);

    const handleLikeToggle = async () => {
        try {
            await fetch(`${import.meta.env.VITE_APP_API}/api/eventLikes/${eventId}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            setIsLiked((prev) => !prev);
            setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
        } catch (err) {
            console.error(`Failed to toggle like for event: ${eventId}`, err);
        }
    };

    return (
        <button onClick={handleLikeToggle} className="p-2 rounded cursor-pointer flex items-center gap-2">
            <img src={isLiked ? redHeart : clearHeart} alt="like icon" className="w-6 h-6" />
            <span>{likes}</span>
        </button>
    )
};

export default LikeButton;