'use client';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

export default function Modal({ onClose, children }: ModalProps) {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    // Prevent hydration mismatch by not rendering on server
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      };
    
    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>{children}</div>
        </div>,
      document.body
    );
}