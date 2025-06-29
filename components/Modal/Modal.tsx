'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import css from './Modal.module.css';

interface ModalProps {
    children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
    const router = useRouter();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                router.back();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [router]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            router.back();
        }
    };

    return (
        <div className={css.backdrop} onClick={handleBackdropClick}>
            <div className={css.modal}>
                {children}
            </div>
        </div>
    );
}