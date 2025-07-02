'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import css from './Modal.module.css';

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

export default function Modal({ onClose, children }: ModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Escape') onClose();
        };
        const originalOverflow = document.body.style.overflow;
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [onClose]);

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget)
            onClose();
    };

    if (!mounted) {
        return null;
    }

    return createPortal(
        <div className={css.backdrop} onClick={handleClickOutside}>
            <div className={css.modal} onClick={(event) => event.stopPropagation()}
            >{children}</div>
        </div>,
        document.body
    );
}