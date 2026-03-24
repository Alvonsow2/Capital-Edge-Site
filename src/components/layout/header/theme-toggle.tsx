import { useEffect, useState } from 'react';
import './theme-toggle.scss';

const USD_TO_KES = 129.5;

type TThemeToggleProps = {
    isLoggedIn?: boolean;
};

const ThemeToggle = ({ isLoggedIn = false }: TThemeToggleProps) => {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('ce_theme');
        return saved ? saved === 'dark' : true;
    });

    const [showKES, setShowKES] = useState(() => localStorage.getItem('ce_show_kes') === 'true');

    useEffect(() => {
        const body = document.body;
        if (isDark) {
            body.classList.remove('theme--light');
            body.classList.add('theme--dark');
            localStorage.setItem('ce_theme', 'dark');
        } else {
            body.classList.remove('theme--dark');
            body.classList.add('theme--light');
            localStorage.setItem('ce_theme', 'light');
        }
    }, [isDark]);

    useEffect(() => {
        if (!isLoggedIn) {
            setShowKES(false);
            return;
        }
        localStorage.setItem('ce_show_kes', String(showKES));
        (window as any).__ce_show_kes = showKES;
        (window as any).__ce_kes_rate = USD_TO_KES;
        window.dispatchEvent(new CustomEvent('ce_kes_toggle', { detail: { showKES } }));
    }, [showKES, isLoggedIn]);

    return (
        <div className='ce-header-controls'>
            {isLoggedIn && (
                <button
                    className={`ce-kes-btn ${showKES ? 'ce-kes-btn--active' : ''}`}
                    onClick={() => setShowKES(p => !p)}
                    title={showKES ? 'Hide KES rate' : 'Show balance in KES'}
                >
                    🇰🇪 KES
                </button>
            )}
            <button
                className='ce-theme-toggle'
                onClick={() => setIsDark(p => !p)}
                title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                aria-label='Toggle theme'
            >
                {isDark ? '☀️' : '🌙'}
            </button>
        </div>
    );
};

export default ThemeToggle;
