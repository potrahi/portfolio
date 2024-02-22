import { useMutation } from "@tanstack/react-query"
import { MessageType } from "../types/contact";
import { sendMessage } from "../utils/http"
import ContactForm from "../components/ContactForm";
import "./Contact.css";
import { useState } from "react";
import NotificationPopup from "../components/NotificationPopup";

export default function ContactPage() {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<'success' | 'error' | 'info'>('info');



    const { mutate } = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            setNotificationMessage('Message sent successfully!');
            setNotificationType('success');
            setShowNotification(true);
        },
        onError: () => {
            setNotificationMessage('Something went wrong! Your message didn\'t send.');
            setNotificationType('error');
            setShowNotification(true);
        }
    })

    function handleSubmit(message: MessageType) {
        setNotificationMessage('Sending...');
        setNotificationType('info');
        setShowNotification(true);
        mutate(message);
    }

    const handleCloseNotification = () => setShowNotification(false);

    return (
        <section id="contact">
            {/* <p>If you have any questions,</p>
            <p>feel free to message me,</p>
            <p>and I will try to respond</p>
            <p>as soon as possible.</p> */}
            <p>Until you see this text, I could not receive your message</p>
            <p>But you can play with a popup message in the bottom right corner</p>
            <p>If you try to send a message</p>

            <ContactForm onSubmit={handleSubmit} />
            {showNotification && (
                <NotificationPopup
                    message={notificationMessage}
                    type={notificationType}
                    onClose={handleCloseNotification}
                />
            )}
        </section>
    )
}
