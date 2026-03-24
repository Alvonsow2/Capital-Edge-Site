import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { api_base } from '@/external/bot-skeleton';
import './speedbot.scss';

type MarketOption = { value: string; label: string };
type DigitType = 'Even' | 'Odd' | 'Over' | 'Under';

const MARKETS: MarketOption[] = [
    { value: 'R_10', label: 'Volatility 10 Index' },
    { value: 'R_25', label: 'Volatility 25 Index' },
    { value: 'R_50', label: 'Volatility 50 Index' },
    { value: 'R_75', label: 'Volatility 75 Index' },
    { value: 'R_100', label: 'Volatility 100 Index' },
    { value: '1HZ10V', label: 'Volatility 10 (1s) Index' },
    { value: '1HZ25V', label: 'Volatility 25 (1s) Index' },
    { value: '1HZ50V', label: 'Volatility 50 (1s) Index' },
    { value: '1HZ75V', label: 'Volatility 75 (1s) Index' },
    { value: '1HZ100V', label: 'Volatility 100 (1s) Index' },
];

const DIGIT_TYPES: DigitType[] = ['Even', 'Odd', 'Over', 'Under'];

const SpeedBot = observer(() => {
    const [market, setMarket] = useState('R_100');
    const [digitType, setDigitType] = useState<DigitType>('Even');
    const [ticks, setTicks] = useState(1);
    const [stake, setStake] = useState(0.5);
    const [alternateEvenOdd, setAlternateEvenOdd] = useState(false);
    const [alternateOnLoss, setAlternateOnLoss] = useState(false);
    const [enableMartingale, setEnableMartingale] = useState(true);
    const [martingaleMultiplier, setMartingaleMultiplier] = useState(1.15);
    const [recoveryMode, setRecoveryMode] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [ticksProcessed, setTicksProcessed] = useState(0);
    const [lastDigit, setLastDigit] = useState<number | null>(null);
    const [statusMsg, setStatusMsg] = useState('');
    const subscriptionRef = useRef<any>(null);
    const tickCountRef = useRef(0);

    const stopBot = () => {
        if (subscriptionRef.current) {
            try {
                subscriptionRef.current.unsubscribe();
            } catch (_) {}
            subscriptionRef.current = null;
        }
        setIsRunning(false);
        setStatusMsg('Bot stopped.');
    };

    const startBot = () => {
        if (!api_base?.api) {
            setStatusMsg('Not connected to API. Please log in.');
            return;
        }
        setIsRunning(true);
        setTicksProcessed(0);
        setLastDigit(null);
        tickCountRef.current = 0;
        setStatusMsg('Subscribing to ticks...');

        try {
            subscriptionRef.current = api_base.api.subscribe({ ticks: market, subscribe: 1 }).subscribe(
                (res: any) => {
                    if (res?.msg_type === 'tick') {
                        const tick = res.tick;
                        const quote = tick?.quote ?? 0;
                        const digit = Math.floor((quote * 10) % 10);
                        tickCountRef.current += 1;
                        setTicksProcessed(tickCountRef.current);
                        setLastDigit(digit);
                        setStatusMsg(`Live: ${quote.toFixed(2)}`);
                    }
                },
                (err: any) => {
                    console.error('Speedbot error:', err);
                    setStatusMsg('Error: ' + (err?.message || 'Connection failed'));
                    setIsRunning(false);
                }
            );
        } catch (err: any) {
            setStatusMsg('Failed to start: ' + (err?.message || 'Unknown error'));
            setIsRunning(false);
        }
    };

    useEffect(() => {
        return () => {
            stopBot();
        };
    }, []);

    return (
        <div className='speedbot'>
            <div className='speedbot__left'>
                <div className='speedbot__header'>EXECUTE TRADE ON EVERY TICK</div>

                <div className='speedbot__form'>
                    <div className='speedbot__field'>
                        <label className='speedbot__label'>SELECT MARKET</label>
                        <select
                            className='speedbot__select'
                            value={market}
                            onChange={e => setMarket(e.target.value)}
                            disabled={isRunning}
                        >
                            {MARKETS.map(m => (
                                <option key={m.value} value={m.value}>
                                    {m.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='speedbot__field'>
                        <select
                            className='speedbot__select'
                            value={digitType}
                            onChange={e => setDigitType(e.target.value as DigitType)}
                            disabled={isRunning}
                        >
                            {DIGIT_TYPES.map(dt => (
                                <option key={dt} value={dt}>
                                    {dt}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='speedbot__row'>
                        <div className='speedbot__field speedbot__field--half'>
                            <label className='speedbot__label'>Ticks</label>
                            <input
                                type='number'
                                className='speedbot__input'
                                value={ticks}
                                min={1}
                                max={10}
                                onChange={e => setTicks(Number(e.target.value))}
                                disabled={isRunning}
                            />
                        </div>
                        <div className='speedbot__field speedbot__field--half'>
                            <label className='speedbot__label'>Stake</label>
                            <input
                                type='number'
                                className='speedbot__input'
                                value={stake}
                                min={0.35}
                                step={0.01}
                                onChange={e => setStake(Number(e.target.value))}
                                disabled={isRunning}
                            />
                        </div>
                    </div>

                    <div className='speedbot__toggle-row'>
                        <span className='speedbot__toggle-label'>Alternate Even and Odd</span>
                        <button
                            className={`speedbot__toggle ${alternateEvenOdd ? 'speedbot__toggle--on' : ''}`}
                            onClick={() => setAlternateEvenOdd(!alternateEvenOdd)}
                            disabled={isRunning}
                        >
                            <span className='speedbot__toggle-knob' />
                        </button>
                    </div>

                    <div className='speedbot__toggle-row'>
                        <span className='speedbot__toggle-label'>Alternate on Loss</span>
                        <button
                            className={`speedbot__toggle ${alternateOnLoss ? 'speedbot__toggle--on' : ''}`}
                            onClick={() => setAlternateOnLoss(!alternateOnLoss)}
                            disabled={isRunning}
                        >
                            <span className='speedbot__toggle-knob' />
                        </button>
                    </div>

                    <div className='speedbot__toggle-row'>
                        <span className='speedbot__toggle-label'>Enable Martingale</span>
                        <button
                            className={`speedbot__toggle ${enableMartingale ? 'speedbot__toggle--on' : ''}`}
                            onClick={() => setEnableMartingale(!enableMartingale)}
                            disabled={isRunning}
                        >
                            <span className='speedbot__toggle-knob' />
                        </button>
                    </div>

                    {enableMartingale && (
                        <div className='speedbot__field speedbot__field--inline'>
                            <label className='speedbot__label'>Martingale Multiplier</label>
                            <input
                                type='number'
                                className='speedbot__input speedbot__input--sm'
                                value={martingaleMultiplier}
                                min={1.01}
                                step={0.01}
                                onChange={e => setMartingaleMultiplier(Number(e.target.value))}
                                disabled={isRunning}
                            />
                        </div>
                    )}

                    <div className='speedbot__toggle-row'>
                        <span className='speedbot__toggle-label'>Recovery Mode</span>
                        <button
                            className={`speedbot__toggle ${recoveryMode ? 'speedbot__toggle--on' : ''}`}
                            onClick={() => setRecoveryMode(!recoveryMode)}
                            disabled={isRunning}
                        >
                            <span className='speedbot__toggle-knob' />
                        </button>
                    </div>

                    <button
                        className={`speedbot__btn ${isRunning ? 'speedbot__btn--stop' : ''}`}
                        onClick={isRunning ? stopBot : startBot}
                    >
                        {isRunning ? '⏹ STOP SPEEDBOT' : '▶ START AI SPEEDBOT'}
                    </button>

                    <div className='speedbot__stats'>
                        <span>Ticks Processed: {ticksProcessed}</span>
                        <span>Last Digit: {lastDigit ?? 0}</span>
                    </div>

                    {statusMsg && <div className='speedbot__status'>{statusMsg}</div>}
                </div>
            </div>
        </div>
    );
});

export default SpeedBot;
