import React from 'react';
import _     from 'lodash';

// Components
import Boot            from '../components/Boot';
import Navbar          from '../components/Navbar';
import Footer          from '../components/Footer';
import SearchResults   from '../components/SearchResults';
import EjrbussMarkdown from '../components/EjrbussMarkdown';
import Tani            from '../components/Tani';
import Places          from '../components/Places';


// Libraries
import Pages from '../lib/Pages';
import { useSearch } from '../lib/hooks';

export default ({ pageName }) => {
    const page = Pages[pageName];
    const searchCtx = useSearch();

    return (
        <>
            <div id='page'>
                <Boot { ...page } />
                <Navbar
                    searchCtx={searchCtx}
                    showScrollMarker
                    showSearch
                    leftLinks={<Places about />}
                    rightLinks={<a target='_blank' href='https://github.com/ejrbuss' className='p-md subtle-accent'>
                        <i className='fab fa-github fa-lg' />
                    </a>}
                />
                <SearchResults searchCtx={searchCtx} />
                <div className='content container grid-md about'>
                    <div className='tani'>
                        <div className='shadow' />
                        <svg viewBox='0 0 270 130' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                            <Tani.HLines n={12} width={270} />
                            <Tani.VLines n={26} height={130} delay={0.05} />
                            {[  // A
                                [40, 40],
                                [40, 50],
                                [40, 60],
                                [40, 70],
                                [40, 80],
                                [60, 80],
                                [60, 70],
                                [60, 60],
                                [50, 60],
                                [60, 50],
                                [60, 40],
                                [50, 40],
                            ].map(([x, y], key) => <Tani.Tile key={key} x={x} y={y} delayIndex={key} />)}
                            {[  // B
                                [80, 40],
                                [80, 50],
                                [80, 60],
                                [80, 70],
                                [80, 80],
                                [90, 80],
                                [100, 80],
                                [100, 70],
                                [100, 60],
                                [90, 60],
                                [100, 50],
                                [100, 40],
                                [90, 40],
                            ].map(([x, y], key) => <Tani.Tile key={key} x={x} y={y} delayIndex={key} />)}
                            {[  // O
                                [120, 40],
                                [120, 50],
                                [120, 60],
                                [120, 70],
                                [120, 80],
                                [130, 80],
                                [140, 80],
                                [140, 70],
                                [140, 60],
                                [140, 50],
                                [140, 40],
                                [130, 40],
                            ].map(([x, y], key) => <Tani.Tile key={key} x={x} y={y} delayIndex={key} />)}
                            {[  // U
                                [160, 40],
                                [160, 50],
                                [160, 60],
                                [160, 70],
                                [160, 80],
                                [170, 80],
                                [180, 80],
                                [180, 70],
                                [180, 60],
                                [180, 50],
                                [180, 40],
                            ].map(([x, y], key) => <Tani.Tile key={key} x={x} y={y} delayIndex={key} />)}
                            {[  // T
                                [200, 40],
                                [210, 40],
                                [220, 40],
                                [210, 50],
                                [210, 60],
                                [210, 70],
                                [210, 80],
                            ].map(([x, y], key) => <Tani.Tile key={key} x={x} y={y} delayIndex={key} />)}
                        </svg>
                    </div>
                    <EjrbussMarkdown source={page.content} noHeaderLinks />
                </div>
            </div>
            <Footer />
        </>
    );
};