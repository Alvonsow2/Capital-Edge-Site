import React from 'react';
import Cookies from 'js-cookie';
import { crypto_currencies_display_order, fiat_currencies_display_order } from '@/components/shared';
import { generateDerivApiInstance } from '@/external/bot-skeleton/services/api/appId';
import { observer as globalObserver } from '@/external/bot-skeleton/utils/observer';
import { clearAuthData } from '@/utils/auth-utils';
import { Callback } from '@deriv-com/auth-client';
import { Button } from '@deriv-com/ui';

const getSelectedCurrency = (
    tokens: Record<string, string>,
    clientAccounts: Record<string, any>,
    state: any
): string => {
    const getQueryParams = new URLSearchParams(window.location.search);
    const currency =
        (state && state?.account) ||
        getQueryParams.get('account') ||
        sessionStorage.getItem('query_param_currency') ||
        '';
    const firstAccountKey = tokens.acct1;
    const firstAccountCurrency = clientAccounts[firstAccountKey]?.currency;

    const validCurrencies = [...fiat_currencies_display_order, ...crypto_currencies_display_order];
    if (tokens.acct1?.startsWith('VR') || currency === 'demo') return 'demo';
    if (currency && validCurrencies.includes(currency.toUpperCase())) return currency;
    return firstAccountCurrency || 'USD';
};

const processTokens = async (tokens: Record<string, string>, rawState: unknown) => {
    const state = rawState as { account?: string } | null;
    const accountsList: Record<string, string> = {};
    const clientAccounts: Record<string, { loginid: string; token: string; currency: string }> = {};

    for (const [key, value] of Object.entries(tokens)) {
        if (key.startsWith('acct')) {
            const tokenKey = key.replace('acct', 'token');
            if (tokens[tokenKey]) {
                accountsList[value] = tokens[tokenKey];
                clientAccounts[value] = {
                    loginid: value,
                    token: tokens[tokenKey],
                    currency: '',
                };
            }
        } else if (key.startsWith('cur')) {
            const accKey = key.replace('cur', 'acct');
            if (tokens[accKey]) {
                clientAccounts[tokens[accKey]].currency = value;
            }
        }
    }

    localStorage.setItem('accountsList', JSON.stringify(accountsList));
    localStorage.setItem('clientAccounts', JSON.stringify(clientAccounts));

    let is_token_set = false;

    const api = await generateDerivApiInstance();
    if (api) {
        const { authorize, error } = await api.authorize(tokens.token1);
        api.disconnect();
        if (error) {
            if (error.code === 'InvalidToken') {
                is_token_set = true;
                if (Cookies.get('logged_state') === 'true') {
                    globalObserver.emit('InvalidToken', { error });
                }
                if (Cookies.get('logged_state') === 'false') {
                    clearAuthData();
                }
            }
        } else {
            localStorage.setItem('callback_token', authorize.toString());
            const clientAccountsArray = Object.values(clientAccounts);
            const firstId = authorize?.account_list[0]?.loginid;
            const filteredTokens = clientAccountsArray.filter(account => account.loginid === firstId);
            if (filteredTokens.length) {
                localStorage.setItem('authToken', filteredTokens[0].token);
                localStorage.setItem('active_loginid', filteredTokens[0].loginid);
                is_token_set = true;
            }
            Cookies.set('logged_state', 'true', {
                expires: 30,
                path: '/',
                secure: true,
            });
        }
    }

    if (!is_token_set) {
        localStorage.setItem('authToken', tokens.token1);
        localStorage.setItem('active_loginid', tokens.acct1);
        Cookies.set('logged_state', 'true', {
            expires: 30,
            path: '/',
            secure: true,
        });
    }

    const selected_currency = getSelectedCurrency(tokens, clientAccounts, state);
    window.location.replace(window.location.origin + `/?account=${selected_currency}`);
};

const SimpleOAuthCallback = () => {
    const [status, setStatus] = React.useState<'processing' | 'error'>('processing');

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tokenEntries: Record<string, string> = {};
        params.forEach((value, key) => {
            tokenEntries[key] = value;
        });

        if (tokenEntries.token1 && tokenEntries.acct1) {
            processTokens(tokenEntries, null).catch(() => setStatus('error'));
        } else {
            setStatus('error');
        }
    }, []);

    if (status === 'error') {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <p>Login failed. Please try again.</p>
                <Button onClick={() => { window.location.href = '/'; }}>Return to Capital Edge</Button>
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Logging you in, please wait...</p>
        </div>
    );
};

const CallbackPage = () => {
    const params = new URLSearchParams(window.location.search);
    const hasOAuthTokens = !!params.get('token1');
    const hasOIDCCode = !!params.get('code');

    if (hasOAuthTokens && !hasOIDCCode) {
        return <SimpleOAuthCallback />;
    }

    return (
        <Callback
            onSignInSuccess={async (tokens: Record<string, string>, rawState: unknown) => {
                await processTokens(tokens, rawState);
            }}
            renderReturnButton={() => {
                return (
                    <Button
                        className='callback-return-button'
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    >
                        {'Return to Bot'}
                    </Button>
                );
            }}
        />
    );
};

export default CallbackPage;
