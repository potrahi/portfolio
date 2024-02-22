import { useEffect, useState } from 'react';
import { NotificationPopupProps } from '../types/props';

import "./NotificationPopup.css"

export default function NotificationPopup({ message, type, onClose }: NotificationPopupProps) {
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsActive(false), 5000);
        return () => clearTimeout(timer)
    }, []);

    useEffect(() => {
        if (!isActive) {
            const fadeOutTimer = setTimeout(onClose, 500);
            return () => clearTimeout(fadeOutTimer);
        }
    }, [isActive, onClose]);

    return (
        <div
            className={`notification-popup ${type} ${isActive ? 'active' : 'fade-out'}`}
            onClick={() => setIsActive(false)}
        >
            {message}
        </div>
    )
}