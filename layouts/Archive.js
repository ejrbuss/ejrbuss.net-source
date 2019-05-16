import React from 'react';
import Link  from 'next/link';
import _     from 'lodash';

// Components
import Boot            from '../components/Boot';
import Navbar          from '../components/Navbar';
import Footer          from '../components/Footer';
import SearchResults   from '../components/SearchResults';
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
                    leftLinks={<Places blog />}
                    rightLinks={<a href='https://github.com/ejrbuss' className='p-md subtle-accent'>
                        <i className='fab fa-github fa-lg' />
                    </a>}
                />
                <SearchResults searchCtx={searchCtx} />
                <div className='content container grid-md archive'>
                    <div className='tani'>
                        <div className='shadow' />
                        <svg viewBox='0 0 230 130' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                            <Tani.HLines n={12} width={230} /> 
                            <Tani.VLines n={23} height={130} delay={0.05} /> 
                            {[  // B
                                [40, 40],
                                [40, 50],
                                [40, 60],
                                [40, 70],
                                [40, 80],
                                [50, 80],
                                [60, 80],
                                [60, 70],
                                [60, 60],
                                [50, 60],
                                [60, 50],
                                [60, 40],
                                [50, 40],
                            ].map(([x, y], key) => <Tani.Tile key={key} x={x} y={y} delayIndex={key} />)}
                            {[  // L
                                [80, 40],
                                [80, 50],
                                [80, 60],
                                [80, 70],
                                [80, 80],
                                [90, 80],
                                [100, 80],
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
                            {[  // G
                                [180, 40],
                                [170, 40],
                                [160, 40],
                                [160, 50],
                                [160, 60],
                                [160, 70],
                                [160, 80],
                                [170, 80],
                                [180, 80],
                                [180, 70],
                                [180, 60],
                            ].map(([x, y], key) => <Tani.Tile key={key} x={x} y={y} delayIndex={key} />)}
                        </svg>
                    </div>
                    <div className='columns'>
                        <div className='column col-7 col-md-12'>
                            <h1 className='title'>Recent</h1>
                            <hr />
                            {Pages.$blogs().slice(0, 5).map((page, key) =>
                                <Link key={key} href={page.route}>
                                    <a>
                                        <div className='summary'>
                                            <h2>{page.title}</h2>
                                            <p>{page.subtitle}</p>
                                            <p className='text-sm subtext'><i className='far fa-calendar' /> {page.$formattedDate}</p>
                                        </div>
                                    </a>
                                </Link>
                            )}
                        </div>
                        <div className='column col-5 col-md-12'>
                            <h1 className='title'>Archive</h1>
                            <hr />
                            {Pages.$blogs().map((page, key) =>
                                <Link key={key} href={page.route}>
                                    <a>
                                        <div className='columns'>
                                            <div className='column col-8 col-sm-12'>{page.title}</div>
                                            <div className='column col-4 hide-sm subtext'><i className='far fa-calendar' /> {page.$formattedDate}</div>
                                        </div>
                                    </a>
                                </Link>
                            )}
                        </div>
                    </div>                
                </div>
            </div>
            <Footer />
        </>
    );
};