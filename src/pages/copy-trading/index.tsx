import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { api_base } from '@/external/bot-skeleton';
import './copy-trading.scss';

type ClientToken = {
    token: string;
    loginid: string;
    balance: string;
    currency: string;
};

const CopyTrading = observer(() => {
    const [clientToken, setClientToken] = useState('');
    const [clients, setClients] = useState<ClientToken[]>([]);
    const [accountId, setAccountId] = useState('');
    const [balance, setBalance] = useState('0.00');
    const [currency, setCurrency] = useState('USD');
    const [isRunning, setIsRunning] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        const accts = JSON.parse(localStorage.getItem('clientAccounts') ?? '{}');
        const ids = Object.keys(accts);
        if (ids.length > 0) {
            const id = ids.find(i => !i.startsWith('VRT')) ?? ids[0];
            setAccountId(id);
            setCurrency(accts[id]?.currency ?? 'USD');
        }
    }, []);

    const handleAddToken = async () => {
        if (!clientToken.trim()) return;
        setStatusMsg('Verifying token...');
        try {
            const res: any = await api_base?.api?.send({ authorize: clientToken });
            if (res?.authorize) {
                const { loginid, balance: bal, currency: cur } = res.authorize;
                const already = clients.find(c => c.loginid === loginid);
                if (already) {
                    setStatusMsg('This account is already added.');
                } else {
                    setClients(prev => [
                        ...prev,
                        { token: clientToken, loginid, balance: bal?.toFixed(2) ?? '0.00', currency: cur },
                    ]);
                    setClientToken('');
                    setStatusMsg(`✓ Added: ${loginid}`);
                }
            } else {
                setStatusMsg('Invalid token. Please try again.');
            }
        } catch {
            setStatusMsg('Could not verify token.');
        }
    };

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setStatusMsg('Synced successfully.');
        }, 1200);
    };

    const handleRemove = (loginid: string) => {
        setClients(prev => prev.filter(c => c.loginid !== loginid));
    };

    const handleStartCopyTrading = () => {
        if (clients.length === 0) {
            setStatusMsg('Add at least one client token to start.');
            return;
        }
        setIsRunning(!isRunning);
        setStatusMsg(isRunning ? 'Copy trading stopped.' : 'Copy trading started!');
    };

    return (
        <div className='copy-trading'>
            <div className='copy-trading__left'>
                <div className='copy-trading__top-bar'>
                    <button className='copy-trading__demo-btn'>
                        ▶ Start Demo to Real Copy Trading
                    </button>
                    <a
                        href='https://www.youtube.com/results?search_query=deriv+copy+trading'
                        target='_blank'
                        rel='noreferrer'
                        className='copy-trading__tutorial-btn copy-trading__tutorial-btn--top'
                    >
                        <span className='copy-trading__yt-icon'>▶</span> Tutorial
                    </a>
                </div>

                <div className='copy-trading__account-bar'>
                    <span className='copy-trading__account-id'>{accountId || 'Not logged in'}</span>
                    <span className='copy-trading__account-balance'>
                        {balance} {currency}
                    </span>
                </div>

                <div className='copy-trading__section'>
                    <h3 className='copy-trading__section-title'>Add tokens to Replicator</h3>

                    <div className='copy-trading__token-row'>
                        <input
                            className='copy-trading__token-input'
                            type='text'
                            placeholder='Enter Client token'
                            value={clientToken}
                            onChange={e => setClientToken(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAddToken()}
                        />
                        <button className='copy-trading__btn copy-trading__btn--add' onClick={handleAddToken}>
                            + Add
                        </button>
                        <button
                            className={`copy-trading__btn copy-trading__btn--sync ${isSyncing ? 'copy-trading__btn--syncing' : ''}`}
                            onClick={handleSync}
                        >
                            ↻ Sync
                        </button>
                    </div>

                    <a
                        href='https://www.youtube.com/results?search_query=deriv+copy+trading+token'
                        target='_blank'
                        rel='noreferrer'
                        className='copy-trading__tutorial-btn'
                    >
                        <span className='copy-trading__yt-icon'>▶</span> Tutorial
                    </a>
                </div>

                <div className='copy-trading__clients-section'>
                    <div className='copy-trading__clients-header'>
                        <span>Total Clients added: {clients.length}</span>
                        <button
                            className={`copy-trading__start-btn ${isRunning ? 'copy-trading__start-btn--stop' : ''}`}
                            onClick={handleStartCopyTrading}
                        >
                            {isRunning ? '⏹ Stop Copy Trading' : '▶ Start Copy Trading'}
                        </button>
                    </div>

                    {clients.length === 0 ? (
                        <p className='copy-trading__empty'>No tokens added yet</p>
                    ) : (
                        <div className='copy-trading__clients-list'>
                            {clients.map(c => (
                                <div key={c.loginid} className='copy-trading__client-row'>
                                    <span className='copy-trading__client-id'>{c.loginid}</span>
                                    <span className='copy-trading__client-balance'>
                                        {c.balance} {c.currency}
                                    </span>
                                    <button
                                        className='copy-trading__client-remove'
                                        onClick={() => handleRemove(c.loginid)}
                                        title='Remove'
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {statusMsg && <div className='copy-trading__status'>{statusMsg}</div>}
            </div>
        </div>
    );
});

export default CopyTrading;
