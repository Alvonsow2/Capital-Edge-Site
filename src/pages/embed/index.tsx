import { useEffect, useRef, useState } from 'react';
import './embed.scss';

const EmbedPage = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const params = new URLSearchParams(window.location.search);
    const url = params.get('url') || '';
    const title = params.get('title') || 'External Tool';

    useEffect(() => {
        setError(false);
        setLoading(true);
    }, [url]);

    const handleLoad = () => {
        setLoading(false);
    };

    const handleError = () => {
        setLoading(false);
        setError(true);
    };

    if (!url) {
        return (
            <div className='embed-page__error'>
                <p>No URL specified.</p>
            </div>
        );
    }

    return (
        <div className='embed-page'>
            {loading && (
                <div className='embed-page__loading'>
                    <div className='embed-page__spinner' />
                    <p>Loading {title}...</p>
                </div>
            )}
            {error && (
                <div className='embed-page__error'>
                    <p>This page could not be embedded. You can open it directly:</p>
                    <a href={url} target='_blank' rel='noopener noreferrer' className='embed-page__open-link'>
                        Open {title} &rarr;
                    </a>
                </div>
            )}
            {!error && (
                <iframe
                    ref={iframeRef}
                    src={url}
                    title={title}
                    className='embed-page__iframe'
                    onLoad={handleLoad}
                    onError={handleError}
                    allow='fullscreen'
                    sandbox='allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation'
                />
            )}
        </div>
    );
};

export default EmbedPage;
