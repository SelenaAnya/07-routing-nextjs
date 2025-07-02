import React from "react";
import css from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <p>&copy; {new Date().getFullYear()} NoteHub. All rights reserved.</p>
                <div className={css.wrap}>
                    <p>Developer: your name</p>
                    <p>
                        Contact us: {" "}
                        <a href="mailto:selena.anya@mail.com">selena.anya@mail.com</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;