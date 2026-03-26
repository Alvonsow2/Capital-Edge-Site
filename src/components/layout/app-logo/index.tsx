import './app-logo.scss';

export const AppLogo = () => {
    return (
        <a href='/' className='app-header__logo dbt-logo'>
            <div className='dbt-logo-wrapper'>
                <img
                    src='/dbtraders.jpeg'
                    alt='DBTraders - Your Ultimate Partner in Deriv Trading Success'
                    className='dbt-logo-img'
                />
                <span className='dbt-logo-text'>
                    DBTraders<span className='dbt-logo-dot'>.</span>
                </span>
            </div>
        </a>
    );
};
