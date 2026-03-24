import './app-logo.scss';

export const AppLogo = () => {
    return (
        <a href='/' className='app-header__logo capital-edge-logo'>
            <div className='ce-logo-wrapper'>
                <img
                    src='/ce-logo-default.png'
                    alt='Capital Edge - Built for Traders'
                    className='ce-logo-img ce-logo-img--default'
                />
                <img
                    src='/capital-edge-logo.png'
                    alt='Capital Edge - Built for Traders'
                    className='ce-logo-img ce-logo-img--dark'
                />
                <span className='ce-logo-shimmer' aria-hidden='true' />
            </div>
        </a>
    );
};
