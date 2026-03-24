import { standalone_routes } from '@/components/shared';
import './nav-bar.scss';

const origin = window.location.origin;

const embed = (url: string, title: string) =>
    `${origin}/embed?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

const NAV_ITEMS = [
    { label: 'Dashboard', href: standalone_routes.bot, icon: '🏠', isInternal: true },
    { label: 'Bot Editor', href: `${standalone_routes.bot}#bot_builder`, icon: '🤖', isInternal: true },
    { label: 'Speedbot', href: `${standalone_routes.bot}#quick_strategy`, icon: '⚡', isInternal: true },
    { label: 'Trading Software', href: standalone_routes.free_bots, icon: '💻', isInternal: true },
    { label: 'Manual Trader', href: embed(standalone_routes.smarttrader, 'Manual Trader'), icon: '👤', isInternal: true },
    { label: 'Analysis Tool', href: standalone_routes.analysis_tool, icon: '📊', isInternal: true },
    { label: 'Charts', href: embed('https://charts.deriv.com', 'Charts'), icon: '📈', isInternal: true },
    { label: 'Copy Trading', href: embed(`${standalone_routes.deriv_app}/copytrade/`, 'Copy Trading'), icon: '📋', isInternal: true },
    { label: 'Tutorial', href: `${standalone_routes.bot}#tutorials`, icon: '🎓', isInternal: true },
    { label: 'Trading View', href: embed('https://charts.deriv.com/deriv', 'Trading View'), icon: '👁', isInternal: true },
];

const NavBar = () => {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    const currentSearch = window.location.search;

    const isActive = (href: string) => {
        try {
            const url = new URL(href, window.location.origin);
            const path = url.pathname;
            const hash = url.hash;
            const search = url.search;

            if (path === '/embed') {
                return currentPath === '/embed' && currentSearch === search;
            }
            if (hash) return currentPath === path && currentHash === hash;
            if (path === '/' && currentPath === '/') return !currentHash;
            return currentPath === path && path !== '/';
        } catch {
            return false;
        }
    };

    return (
        <nav className='ce-navbar'>
            <div className='ce-navbar__inner'>
                {NAV_ITEMS.map(item => (
                    <a
                        key={item.label}
                        href={item.href}
                        className={`ce-navbar__item${isActive(item.href) ? ' ce-navbar__item--active' : ''}`}
                    >
                        <span className='ce-navbar__item-icon'>{item.icon}</span>
                        <span className='ce-navbar__item-label'>{item.label}</span>
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default NavBar;
