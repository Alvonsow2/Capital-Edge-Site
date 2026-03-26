import React from 'react';
import './landing.scss';

const LandingPage: React.FC = () => {
    const handleStartTrading = () => {
        window.location.href = 'https://app.deriv.com';
    };

    return (
        <div className='dbt-landing'>
            <div className='dbt-landing__bg'>
                <div className='dbt-landing__grid-overlay' />
                <div className='dbt-landing__glow dbt-landing__glow--left' />
                <div className='dbt-landing__glow dbt-landing__glow--right' />
                <div className='dbt-landing__glow dbt-landing__glow--center' />
                <div className='dbt-landing__chart-lines'>
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className={`dbt-landing__chart-line dbt-landing__chart-line--${i + 1}`} />
                    ))}
                </div>
            </div>

            <nav className='dbt-landing__nav'>
                <div className='dbt-landing__nav-logo'>
                    <img src='/dbtraders.jpeg' alt='DBTraders Logo' className='dbt-landing__logo-img' />
                    <span className='dbt-landing__logo-text'>DBTraders<span className='dbt-landing__logo-dot'>.</span></span>
                </div>
                <div className='dbt-landing__nav-links'>
                    <a href='https://www.dbtraders.com' target='_blank' rel='noopener noreferrer' className='dbt-landing__nav-link'>About</a>
                    <a href='https://www.dbtraders.com' target='_blank' rel='noopener noreferrer' className='dbt-landing__nav-link'>Community</a>
                    <button className='dbt-landing__nav-btn' onClick={handleStartTrading}>
                        Start Trading
                    </button>
                </div>
            </nav>

            <div className='dbt-landing__content'>
                <div className='dbt-landing__badge'>
                    <span className='dbt-landing__badge-dot' />
                    Your Ultimate Partner in Deriv Trading Success
                </div>

                <h1 className='dbt-landing__title'>
                    <span className='dbt-landing__title--brand'>DBTraders</span>
                    <br />
                    <span className='dbt-landing__title--sub'>We Build Traders</span>
                </h1>

                <p className='dbt-landing__tagline'>
                    Proven Strategies · Real-Time Mentorship · Powerful Tools
                </p>

                <p className='dbt-landing__description'>
                    At DBTraders, we don't just teach trading — we build traders. Join a growing community where you'll
                    access proven strategies, real-time mentorship, and powerful tools designed to boost your trading
                    consistency and profitability.
                </p>

                <div className='dbt-landing__cta'>
                    <button className='dbt-landing__btn dbt-landing__btn--primary' onClick={handleStartTrading}>
                        Start Trading Now &rarr;
                    </button>
                    <div className='dbt-landing__trust-badges'>
                        <span>&#10003; Proven Strategies</span>
                        <span>&#10003; Real-Time Mentorship</span>
                        <span>&#10003; Powerful Tools</span>
                    </div>
                </div>

                <div className='dbt-landing__stats'>
                    <div className='dbt-landing__stat'>
                        <span className='dbt-landing__stat-value'>50K+</span>
                        <span className='dbt-landing__stat-label'>Active Traders</span>
                    </div>
                    <div className='dbt-landing__stat'>
                        <span className='dbt-landing__stat-value'>$2.5B+</span>
                        <span className='dbt-landing__stat-label'>Trading Volume</span>
                    </div>
                    <div className='dbt-landing__stat'>
                        <span className='dbt-landing__stat-value'>99.9%</span>
                        <span className='dbt-landing__stat-label'>Uptime</span>
                    </div>
                    <div className='dbt-landing__stat'>
                        <span className='dbt-landing__stat-value'>150+</span>
                        <span className='dbt-landing__stat-label'>Trading Pairs</span>
                    </div>
                </div>
            </div>

            <div className='dbt-landing__features'>
                <div className='dbt-landing__feature'>
                    <div className='dbt-landing__feature-icon'>📊</div>
                    <h3 className='dbt-landing__feature-title'>Bot Builder</h3>
                    <p className='dbt-landing__feature-desc'>Build automated trading bots with our visual drag-and-drop editor. No coding required.</p>
                </div>
                <div className='dbt-landing__feature'>
                    <div className='dbt-landing__feature-icon'>📈</div>
                    <h3 className='dbt-landing__feature-title'>Live Charts</h3>
                    <p className='dbt-landing__feature-desc'>Access real-time market data and advanced charting tools to make informed decisions.</p>
                </div>
                <div className='dbt-landing__feature'>
                    <div className='dbt-landing__feature-icon'>🤝</div>
                    <h3 className='dbt-landing__feature-title'>Community</h3>
                    <p className='dbt-landing__feature-desc'>Join thousands of traders sharing strategies, insights, and mentorship daily.</p>
                </div>
            </div>

            <footer className='dbt-landing__footer'>
                <p>© {new Date().getFullYear()} DBTraders. All rights reserved. &nbsp;|&nbsp;
                    <a href='https://www.dbtraders.com' target='_blank' rel='noopener noreferrer'>dbtraders.com</a>
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
