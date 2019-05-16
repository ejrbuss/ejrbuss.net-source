import React from 'react';
import _     from 'lodash';

// Components
import Boot        from '../components/Boot';
import Tani        from '../components/Tani';
import Places      from '../components/Places';
import SocialMedia from '../components/SocialMedia';
import Copyright   from '../components/Copyright';

// Libraries
import Pages from '../lib/Pages';

export default ({ pageName }) => {
    const page = Pages[pageName];
    return (
        <>
            <Boot { ...page } />
            <div className='home'>
                <div className='shadow' />
                <div className='tani'>
                    <svg viewBox='0 0 130 130' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                        <Tani.HLines n={12} width={130} reverse />
                        <Tani.VLines n={12} height={130} reverse />
                        {[  // Logo
                            [40, 80],
                            [50, 80],
                            [60, 80],
                            [70, 80],
                            [80, 80],
                            [80, 70],
                            [80, 60],
                            [80, 50],
                            [80, 40],
                            [70, 40],
                            [60, 40],
                            [50, 40],
                            [40, 40],
                            [40, 50],
                            [40, 60],
                            [50, 60],
                            [60, 60],
                        ].map(([x, y], key) => 
                            <Tani.Tile key={key} x={x} y ={y} delayIndex={key} />
                        )}
                    </svg>
                </div>
                <div className='places animated fadeIn slower'>
                    <Places nologo />
                </div>
                <div className='social-media animated fadeIn slower'>
                    <SocialMedia accent />
                    <Copyright />
                </div>
            </div>
        </>
    );
};