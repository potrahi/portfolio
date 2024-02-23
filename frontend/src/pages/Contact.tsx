import { useRef } from "react";
import { useMutation } from "@tanstack/react-query"
import { useSelector, useDispatch } from "react-redux";
import { NotificationState } from "../types/store";
import { MessageType } from "../types/data";
import { ContactFormHandle } from "../types/handle";
import { notificationActions } from "../store/notification";
import ContactForm from "../components/ContactForm";
import NotificationPopup from "../components/NotificationPopup";
import { sendMessage } from "../utils/http"
import "./Contact.css";


export default function ContactPage() {
    const contactForm = useRef<ContactFormHandle>(null);
    const dispatch = useDispatch();
    const message = useSelector((state: NotificationState) => state.notification.message);
    const show = useSelector((state: NotificationState) => state.notification.show);
    const type = useSelector((state: NotificationState) => state.notification.type);

    const { mutate } = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            contactForm.current?.clear();
            dispatch(notificationActions.setSuccess());
        },
        onError: () => {
            dispatch(notificationActions.setError())
        }
    })

    function handleSubmit(message: MessageType) {
        dispatch(notificationActions.setInfo())
        mutate(message);
    }

    const handleCloseNotification = () => dispatch(notificationActions.toggleNotification());

    return (
        <section id="contact">
            {/* <p>If you have any questions,</p>
            <p>feel free to message me,</p>
            <p>and I will try to respond</p>
            <p>as soon as possible.</p> */}
            <p>Until you see this text, I could not receive your message</p>
            <p>But you can play with a popup message in the bottom right corner</p>
            <p>If you try to send a message</p>

            <ContactForm ref={contactForm} onSubmit={handleSubmit} />
            {show && (
                <NotificationPopup
                    message={message}
                    type={type}
                    onClose={handleCloseNotification}
                />
            )}
        </section>
    )
}
