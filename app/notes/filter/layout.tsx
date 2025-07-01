import React from "react";
import css from './layout.module.css';

type Props = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
    return (
        <div className={css.container}>
            <aside>{sidebar}</aside>
            <main>{children}</main>
        </div>
    );
}

export default NotesLayout;