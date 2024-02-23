import { forwardRef, useImperativeHandle, useRef } from "react";
import { MessageType } from "../types/data";
import { ContactFormProps } from "../types/props";
import "./ContactForm.css"

const ContactForm = forwardRef(({ onSubmit }: ContactFormProps, ref) => {
    const email = useRef<HTMLInputElement>(null);
    const message = useRef<HTMLTextAreaElement>(null);
    
    useImperativeHandle(ref, () => {
        return {
            clear() {
                if (email.current) email.current.value = "";
                if (message.current) message.current.value = "";
            }
        }
    })

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const target = event.target as HTMLFormElement
        const formData = new FormData(target);
        const message = Object.fromEntries(formData) as MessageType;
        onSubmit(message);
    }

    return (
        <form id="contact-form" onSubmit={handleSubmit}>
            <div>
                <label id="email" htmlFor="email">Write here you email</label>
                <input ref={email} id="email" type="email" name="email" required />
            </div>
            <div>
                <label id="message" htmlFor="message">And here please write you message to me</label>
                <textarea ref={message} id="message" name="message" required></textarea>
            </div>
            <button type="submit">Send</button>
        </form>
    )
});

export default ContactForm;