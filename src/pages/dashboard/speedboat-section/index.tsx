import React from 'react';
import './speedboat-section.scss';

const SpeedboatSection = () => {
    return (
        <div className='speedboat-section'>
            <div className='speedboat-section__bg-glow' />
            <div className='speedboat-section__content'>
                <div className='speedboat-section__left'>
                    <div className='speedboat-section__badge'>⚡ AUTOMATED TRADING</div>
                    <h1 className='speedboat-section__title'>
                        Your <span className='speedboat-section__title--green'>Unfair</span><br />
                        Advantage in<br />
                        Trading
                    </h1>
                    <p className='speedboat-section__subtitle'>
                        DBTraders gives you the tools to build, test, and deploy automated trading bots —
                        running 24/7 with precision and speed no human can match.
                    </p>
                    <div className='speedboat-section__stats'>
                        <div className='speedboat-section__stat'>
                            <span className='speedboat-section__stat-value'>24/7</span>
                            <span className='speedboat-section__stat-label'>Auto Trading</span>
                        </div>
                        <div className='speedboat-section__stat-divider' />
                        <div className='speedboat-section__stat'>
                            <span className='speedboat-section__stat-value'>0ms</span>
                            <span className='speedboat-section__stat-label'>Emotion Bias</span>
                        </div>
                        <div className='speedboat-section__stat-divider' />
                        <div className='speedboat-section__stat'>
                            <span className='speedboat-section__stat-value'>100%</span>
                            <span className='speedboat-section__stat-label'>Strategy Control</span>
                        </div>
                    </div>
                </div>
                <div className='speedboat-section__right'>
                    <div className='speedboat-section__boat-container'>
                        <svg
                            className='speedboat-section__boat'
                            viewBox='0 0 520 320'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                        >
                            <defs>
                                <linearGradient id='hullGrad' x1='0' y1='0' x2='0' y2='1'>
                                    <stop offset='0%' stopColor='#10b981' />
                                    <stop offset='100%' stopColor='#059669' />
                                </linearGradient>
                                <linearGradient id='deckGrad' x1='0' y1='0' x2='1' y2='0'>
                                    <stop offset='0%' stopColor='#1e293b' />
                                    <stop offset='100%' stopColor='#0f172a' />
                                </linearGradient>
                                <linearGradient id='waterGrad' x1='0' y1='0' x2='1' y2='0'>
                                    <stop offset='0%' stopColor='#10b981' stopOpacity='0' />
                                    <stop offset='50%' stopColor='#10b981' stopOpacity='0.4' />
                                    <stop offset='100%' stopColor='#10b981' stopOpacity='0' />
                                </linearGradient>
                                <filter id='glow'>
                                    <feGaussianBlur stdDeviation='4' result='coloredBlur' />
                                    <feMerge>
                                        <feMergeNode in='coloredBlur' />
                                        <feMergeNode in='SourceGraphic' />
                                    </feMerge>
                                </filter>
                            </defs>

                            <ellipse cx='260' cy='248' rx='220' ry='12' fill='#10b981' opacity='0.12' />

                            <g className='speedboat-section__boat-group'>
                                <path
                                    d='M60 220 L70 240 L430 240 L460 220 Z'
                                    fill='url(#hullGrad)'
                                    filter='url(#glow)'
                                />
                                <path d='M70 220 L80 205 L420 205 L430 220 Z' fill='url(#deckGrad)' />

                                <rect x='100' y='155' width='220' height='50' rx='6' fill='#1e293b' />
                                <rect x='108' y='162' width='88' height='36' rx='4' fill='#0f172a' opacity='0.9' />
                                <rect x='204' y='162' width='108' height='36' rx='4' fill='#0f172a' opacity='0.9' />

                                <rect x='115' y='169' width='74' height='22' rx='3' fill='#10b981' opacity='0.15' />
                                <line x1='120' y1='175' x2='140' y2='175' stroke='#10b981' strokeWidth='1.5' opacity='0.6' />
                                <line x1='120' y1='180' x2='155' y2='180' stroke='#10b981' strokeWidth='1' opacity='0.4' />
                                <line x1='120' y1='185' x2='145' y2='185' stroke='#10b981' strokeWidth='1' opacity='0.4' />
                                <circle cx='178' cy='180' r='6' fill='none' stroke='#10b981' strokeWidth='1.5' opacity='0.7' />
                                <circle cx='178' cy='180' r='3' fill='#10b981' opacity='0.8' />

                                <rect x='211' y='169' width='94' height='22' rx='3' fill='#10b981' opacity='0.15' />
                                <polyline points='214,182 224,172 234,179 244,170 254,176 264,168 274,174 284,166 294,172 304,165' stroke='#10b981' strokeWidth='2' fill='none' opacity='0.9' />

                                <rect x='158' y='120' width='8' height='40' rx='4' fill='#334155' />
                                <path d='M162 120 L162 85 L210 100 Z' fill='#10b981' opacity='0.9' />

                                <rect x='310' y='100' width='6' height='55' rx='3' fill='#334155' />
                                <path d='M313 100 L313 70 L350 88 Z' fill='#10b981' opacity='0.7' />

                                <line x1='162' y1='120' x2='313' y2='100' stroke='#475569' strokeWidth='1.5' opacity='0.6' />

                                <rect x='370' y='190' width='20' height='15' rx='3' fill='#0f172a' />
                                <circle cx='380' cy='198' r='4' fill='#10b981' opacity='0.9' filter='url(#glow)' />

                                <circle cx='140' cy='213' r='4' fill='#1e293b' stroke='#10b981' strokeWidth='1.5' opacity='0.7' />
                                <circle cx='200' cy='213' r='4' fill='#1e293b' stroke='#10b981' strokeWidth='1.5' opacity='0.7' />
                                <circle cx='320' cy='213' r='4' fill='#1e293b' stroke='#10b981' strokeWidth='1.5' opacity='0.7' />
                                <circle cx='380' cy='213' r='4' fill='#1e293b' stroke='#10b981' strokeWidth='1.5' opacity='0.7' />
                            </g>

                            <path
                                className='speedboat-section__wake-1'
                                d='M30 238 Q60 230 90 238 Q120 246 150 238'
                                stroke='#10b981'
                                strokeWidth='2'
                                fill='none'
                                opacity='0.5'
                            />
                            <path
                                className='speedboat-section__wake-2'
                                d='M10 248 Q55 238 100 248 Q145 258 190 248'
                                stroke='#10b981'
                                strokeWidth='1.5'
                                fill='none'
                                opacity='0.3'
                            />

                            <g className='speedboat-section__sparks' filter='url(#glow)'>
                                <circle cx='450' cy='210' r='3' fill='#10b981' opacity='0.9' />
                                <circle cx='465' cy='225' r='2' fill='#10b981' opacity='0.7' />
                                <circle cx='475' cy='215' r='2.5' fill='#10b981' opacity='0.6' />
                                <circle cx='490' cy='230' r='1.5' fill='#10b981' opacity='0.5' />
                                <circle cx='480' cy='205' r='2' fill='#10b981' opacity='0.8' />
                                <circle cx='500' cy='218' r='1.5' fill='#10b981' opacity='0.4' />
                            </g>
                        </svg>

                        <div className='speedboat-section__water'>
                            <svg viewBox='0 0 520 40' preserveAspectRatio='none' aria-hidden='true'>
                                <path
                                    d='M0 20 Q65 5 130 20 Q195 35 260 20 Q325 5 390 20 Q455 35 520 20 L520 40 L0 40 Z'
                                    fill='url(#waterGrad)'
                                    opacity='0.4'
                                />
                            </svg>
                        </div>
                    </div>

                    <div className='speedboat-section__card speedboat-section__card--top'>
                        <span className='speedboat-section__card-icon'>🤖</span>
                        <div>
                            <div className='speedboat-section__card-title'>Bot Automation</div>
                            <div className='speedboat-section__card-desc'>Build with drag & drop blocks</div>
                        </div>
                    </div>
                    <div className='speedboat-section__card speedboat-section__card--bottom'>
                        <span className='speedboat-section__card-icon'>📈</span>
                        <div>
                            <div className='speedboat-section__card-title'>Live P&L Tracking</div>
                            <div className='speedboat-section__card-desc'>Real-time results dashboard</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='speedboat-section__waves'>
                <svg viewBox='0 0 1440 60' preserveAspectRatio='none' aria-hidden='true'>
                    <path
                        d='M0 30 Q180 0 360 30 Q540 60 720 30 Q900 0 1080 30 Q1260 60 1440 30 L1440 60 L0 60 Z'
                        fill='#10b981'
                        opacity='0.06'
                    />
                    <path
                        d='M0 40 Q180 15 360 40 Q540 65 720 40 Q900 15 1080 40 Q1260 65 1440 40 L1440 60 L0 60 Z'
                        fill='#10b981'
                        opacity='0.04'
                    />
                </svg>
            </div>
        </div>
    );
};

export default SpeedboatSection;
