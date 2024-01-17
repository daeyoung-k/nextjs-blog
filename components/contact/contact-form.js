import { useEffect, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData(contactDetails) {
    const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(contactDetails),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }
}

function ContactForm() {
    const [e_email, set_e_email] = useState("");
    const [e_name, set_e_name] = useState("");
    const [e_message, set_e_message] = useState("");
    const [requestStatus, setRequestStatus] = useState();
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000)

            return () => clearTimeout(timer);
        }
    });

    async function sendMessageHandler(event) {
        event.preventDefault();

        setRequestStatus("pending");

        try {
            await sendContactData({
                email: e_email,
                name: e_name,
                message: e_message,
            });
            setRequestStatus("success");
            set_e_email('');
            set_e_name('');
            set_e_message('');
        } catch (error) {
            setRequestError(error.message);
            setRequestStatus("error");
        }

        setRequestStatus("success");
    }

    let notification;

    if (requestStatus === "pending") {
        notification = {
            status: "pending",
            title: "Sending message...",
            message: "Your message is on it`s way!",
        };
    }

    if (requestStatus === "success") {
        notification = {
            status: "success",
            title: "Success!",
            message: "Message sent successfully!",
        };
    }

    if (requestStatus === "error") {
        notification = {
            status: "error",
            title: "Error!",
            message: requestError,
        };
    }

    return (
        <section className={classes.contact}>
            <h1>test</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">email</label>
                        <input type="email" id="email" required value={e_email} onChange={(event) => set_e_email(event.target.value)} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">name</label>
                        <input type="text" id="name" required value={e_name} onChange={(event) => set_e_name(event.target.value)} />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">message</label>
                    <textarea id="message" rows="5" required value={e_message} onChange={(event) => set_e_message(event.target.value)}></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
        </section>
    );
}

export default ContactForm;
