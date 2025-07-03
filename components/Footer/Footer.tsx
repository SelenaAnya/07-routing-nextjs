'use client';

import React, { useState, useEffect } from "react";
import css from "./Footer.module.css";

const Footer = () => {
    const [currentYear, setCurrentYear] = useState<number | null>(null);

    useEffect(() => {
        // Set current year only on client side
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <p>&copy; {currentYear || 2024} NoteHub. All rights reserved.</p>
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