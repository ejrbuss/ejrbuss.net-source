import React from 'react';
import Link  from 'next/link';
import _     from 'lodash';

// Components
import Boot          from '../components/Boot';
import Navbar        from '../components/Navbar';
import Footer        from '../components/Footer';
import SearchResults from '../components/SearchResults';
import Tani          from '../components/Tani';
import Places        from '../components/Places';
import Logos         from '../components/Logos';

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
                    leftLinks={<Places work />}
                    rightLinks={<a target='_blank' href='https://github.com/ejrbuss' className='p-md subtle-accent'>
                        <i className='fab fa-github fa-lg' />
                    </a>}
                />
                <SearchResults searchCtx={searchCtx} />
                <div className='content container grid-md work'>
                    <div className='tani'>
                        <div className='shadow' />
                        <svg viewBox='0 0 250 130' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                            <Tani.HLines n={12} width={250} /> 
                            <Tani.VLines n={24} height={130} delay={0.05} /> 
                            {[  // W
                                [40, 40],
                                [40, 50],
                                [40, 60],
                                [40, 70],
                                [40, 80],
                                [50, 80],
                                [60, 80],
                                [60, 70],
                                [60, 60],
                                [60, 50],
                                [60, 40],
                                [70, 80],
                                [80, 80],
                                [80, 70],
                                [80, 60],
                                [80, 50],
                                [80, 40],
                            ].map(([x, y], key) => <Tani.Tile key={key} x={x} y={y} delayIndex={key} />)}
                            {[  // O
                                [100, 40],
                                [100, 50],
                                [100, 60],
                                [100, 70],
                                [100, 80],
                                [110, 80],
                                [120, 80],
                                [120, 70],
                                [120, 60],
                                [120, 50],
                                [120, 40],
                                [110, 40],
                            ].map(([x, y], key) => <Tani.Tile key={key} x={x} y={y} delayIndex={key} />)}
                            {[  // R
                                [150, 40],
                                [160, 40],
                                [140, 40],
                                [140, 50],
                                [140, 60],
                                [140, 70],
                                [140, 80],
                                [150, 60],
                                [160, 60],
                                [160, 50],
                                [160, 70],
                                [160, 80],
                            ].map(([x, y], key) => <Tani.Tile key={key} x={x} y={y} delayIndex={key} />)}
                            {[  // K
                                [180, 40],
                                [180, 50],
                                [180, 60],
                                [180, 70],
                                [180, 80],
                                [190, 60],
                                [200, 40],
                                [200, 50],
                                [200, 60],
                                [200, 70],
                                [200, 80],
                            ].map(([x, y], key) => <Tani.Tile key={key} x={x} y={y} delayIndex={key} />)}
                        </svg>
                    </div>
                    <div className='md'>
                        <h1>Projects</h1>
                        <p>Here is a curated list of some of my open source projects. For an exhaustive list, I catalog my GitHub repositories <Link href='/blog/github'><a>here</a></Link>.</p>
                        {page.projects.map(({ logo, title, href, summary }, key) => {
                            const Logo = Logos[logo];
                            return (
                                <Link key={key} href={href}>
                                    <a className='example'>    
                                        <Logo />
                                        <div className='space-keeper'>
                                            <h2>{title}</h2>
                                            <p>{summary}</p>
                                        </div>
                                        <div className='summary'>
                                            <h2>{title}</h2>
                                            <p>{summary}</p>
                                        </div>
                                    </a>
                                </Link>
                            );
                        })}
                        <h1>Prior Employment</h1>
                        <p>My prior employers have helped shaped me into the developer I am today. Follow these links to read about my experiences.</p>
                        {page.work.map(({ logo, title, href, summary }, key) => {
                            const Logo = Logos[logo];
                            return (
                                <Link key={key} href={href}>
                                    <a className='example'>    
                                        <Logo />
                                        <div className='space-keeper'>
                                            <h2>{title}</h2>
                                            <p>{summary}</p>
                                        </div>
                                        <div className='summary'>
                                            <h2>{title}</h2>
                                            <p>{summary}</p>
                                        </div>
                                    </a>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};