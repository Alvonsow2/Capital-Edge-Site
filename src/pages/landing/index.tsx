import React from 'react';
import { generateOAuthURL } from '@/components/shared';
import { useOauth2 } from '@/hooks/auth/useOauth2';
import { handleOidcAuthFailure } from '@/utils/auth-utils';
import { requestOidcAuthentication } from '@deriv-com/auth-client';
import useTMB from '@/hooks/useTMB';
import './landing.scss';

const LandingPage: React.FC = () => {
    const { isOAuth2Enabled } = useOauth2();
    const { onRenderTMBCheck, isTmbEnabled } = useTMB();

    const handleLogin = async () => {
        if (!isOAuth2Enabled) {
            window.location.replace(generateOAuthURL());
        } else {
            const getQueryParams = new URLSearchParams(window.location.search);
            const currency = getQueryParams.get('account') ?? '';
            const query_param_currency = currency || sessionStorage.getItem('query_param_currency') || 'USD';

            try {
                const tmbEnabled = await isTmbEnabled();
                if (tmbEnabled) {
                    await onRenderTMBCheck();
                } else {
                    try {
                        await requestOidcAuthentication({
                            redirectCallbackUri: `${window.location.origin}/callback`,
                            ...(query_param_currency
                                ? {
                                      state: {
                                          account: query_param_currency,
                                      },
                                  }
                                : {}),
                        });
                    } catch (err) {
                        handleOidcAuthFailure(err);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleStartTrading = () => {
        window.location.href = 'https://app.deriv.com';
    };

    return (
        <div className='ce-landing'>
            <div className='ce-landing__bg'>
                <div className='ce-landing__grid-overlay' />
                <div className='ce-landing__glow ce-landing__glow--left' />
                <div className='ce-landing__glow ce-landing__glow--right' />
                <div className='ce-landing__glow ce-landing__glow--center' />
                <div className='ce-landing__chart-lines'>
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className={`ce-landing__chart-line ce-landing__chart-line--${i + 1}`} />
                    ))}
                </div>
            </div>

            <nav className='ce-landing__nav'>
                <div className='ce-landing__nav-logo'>
                    <img src='/ce-logo-default.png' alt='Capital Edge Logo' className='ce-landing__logo-img' />
                    <span className='ce-landing__logo-text'>Capital Edge<span className='ce-landing__logo-dot'>.</span></span>
                </div>
                <div className='ce-landing__nav-links'>
                    <button className='ce-landing__nav-btn' onClick={handleLogin}>
                        Log In
                    </button>
                    <button className='ce-landing__nav-btn ce-landing__nav-btn--outline' onClick={handleStartTrading}>
                        Start Trading
                    </button>
                </div>
            </nav>

            <div className='ce-landing__content'>
                <div className='ce-landing__badge'>
                    <span className='ce-landing__badge-dot' />
                    Trusted by 50,000+ Traders Worldwide
                </div>

                <h1 className='ce-landing__title'>
                    <span className='ce-landing__title--brand'>Capital Edge</span>
                    <br />
                    <span className='ce-landing__title--sub'>Built for Traders</span>
                </h1>

                <p className='ce-landing__tagline'>The Future of Automated Trading</p>

                <p className='ce-landing__description'>
                    Harness the power of AI-driven bots, real-time analytics, and copy trading to maximize your profits.
                    Join the revolution today.
                </p>

                <div className='ce-landing__cta'>
                    <button className='ce-landing__btn ce-landing__btn--primary' onClick={handleStartTrading}>
                        Start Trading Now &rarr;
                    </button>
                    <div className='ce-landing__trust-badges'>
                        <span>&#10003; No Credit Card Required</span>
                        <span>&#10003; $10,000 Virtual Account</span>
                        <span>&#10003; 24/7 Bot Automation</span>
                    </div>
                </div>

                <div className='ce-landing__stats'>
                    <div className='ce-landing__stat'>
                        <span className='ce-landing__stat-value'>50.0K++</span>
                        <span className='ce-landing__stat-label'>Active Traders</span>
                    </div>
                    <div className='ce-landing__stat'>
                        <span className='ce-landing__stat-value'>$2.5B++</span>
                        <span className='ce-landing__stat-label'>Trading Volume</span>
                    </div>
                    <div className='ce-landing__stat'>
                        <span className='ce-landing__stat-value'>99.9%</span>
                        <span className='ce-landing__stat-label'>Uptime</span>
                    </div>
                    <div className='ce-landing__stat'>
                        <span className='ce-landing__stat-value'>150++</span>
                        <span className='ce-landing__stat-label'>Trading Pairs</span>
                    </div>
                </div>
            </div>

            <div className='ce-landing__features'>
                <div className='ce-landing__feature'>
                    <div className='ce-landing__feature-icon'>🤖</div>
                    <h3 className='ce-landing__feature-title'>Bot Builder</h3>
                    <p className='ce-landing__feature-desc'>Build automated trading bots with our visual drag-and-drop editor. No coding required.</p>
                </div>
                <div className='ce-landing__feature'>
                    <div className='ce-landing__feature-icon'>📈</div>
                    <h3 className='ce-landing__feature-title'>Live Charts</h3>
                    <p className='ce-landing__feature-desc'>Access real-time market data and advanced charting tools to make informed decisions.</p>
                </div>
                <div className='ce-landing__feature'>
                    <div className='ce-landing__feature-icon'>⚡</div>
                    <h3 className='ce-landing__feature-title'>Copy Trading</h3>
                    <p className='ce-landing__feature-desc'>Follow expert traders and automatically replicate their strategies for consistent profits.</p>
                </div>
            </div>

            <footer className='ce-landing__footer'>
                <p>© {new Date().getFullYear()} Capital Edge. All rights reserved. Built for Traders.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
