import { MessageType } from "../types/contact";
import { ContactFormProps } from "../types/props";
import "./ContactForm.css"

export default function ContactForm({ onSubmit }: ContactFormProps) {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const target = event.target as HTMLFormElement
        const formData = new FormData(target);
        const message = Object.fromEntries(formData) as MessageType;
        onSubmit(message);
    }

    return (
        <form id="contact-form" onSubmit={handleSubmit}>
            <span>
                <label id="email" htmlFor="email">Write here you email</label>
                <input id="email" type="email" name="email" required />
            </span>
            <div>
                <label id="message" htmlFor="message">And here please write you message to me</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Send</button>
        </form>
    )
}