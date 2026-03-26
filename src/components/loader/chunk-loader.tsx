import './chunk-loader.scss';

export default function ChunkLoader({ message }: { message: string }) {
    return (
        <div className='ce-splash'>
            <div className='ce-splash__bg'>
                <div className='ce-splash__grid' />
                <div className='ce-splash__glow ce-splash__glow--left' />
                <div className='ce-splash__glow ce-splash__glow--right' />
            </div>

            <div className='ce-splash__content'>
                <div className='ce-splash__logo-wrap'>
                    <img
                        src='/ce-logo-default.png'
                        alt='Capital Edge'
                        className='ce-splash__logo'
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <div className='ce-splash__logo-ring' />
                    <div className='ce-splash__logo-ring ce-splash__logo-ring--2' />
                </div>

                <div className='ce-splash__brand'>
                    <span className='ce-splash__brand-name'>Capital Edge</span>
                    <span className='ce-splash__brand-tag'>Built for Traders</span>
                </div>

                <div className='ce-splash__bars'>
                    <div className='ce-splash__bar' />
                    <div className='ce-splash__bar' />
                    <div className='ce-splash__bar' />
                    <div className='ce-splash__bar' />
                    <div className='ce-splash__bar' />
                </div>

                {message && <p className='ce-splash__message'>{message}</p>}
            </div>
        </div>
    );
}
