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

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    if (!mounted) {
        return null;
    }

    return createPortal(
        <div className={css.backdrop} onClick={e => e.target === e.currentTarget && onClose()}>
            <div className={css.modal}>{children}</div>
        </div>,
        document.body
    );
}