// Components
import Boot            from '../components/Boot';
import Navbar          from '../components/Navbar';
import SideNav         from '../components/SideNav';
import Footer          from '../components/Footer';
import SearchResults   from '../components/SearchResults';
import EjrbussMarkdown from '../components/EjrbussMarkdown';
import Places          from '../components/Places';

// Libraries
import Pages from '../lib/Pages';
import { useSearch } from '../lib/hooks';

export default ({ pageName }) => {
    const page      = Pages[pageName];
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
                    rightLinks={<a target='_blank' href='https://github.com/ejrbuss' className='p-md subtle-accent'>
                        <i className='fab fa-github fa-lg' />
                    </a>}
                />
                <SideNav />
                <SearchResults searchCtx={searchCtx} />
                <div className='content container grid-md'>
                    <h1 className='title'>{page.title}</h1>
                    <p className='cslr-subtext text-lg'>{page.subtitle}</p>
                    <p className='subtext'>
                        <a onClick={() => { searchCtx.toggle(); searchCtx.change(page.$formattedDate); }} className='anchor'>
                            <i className='far fa-calendar' /> {page.$formattedDate}
                        </a>
                    </p>
                    <EjrbussMarkdown source={page.content} />
                </div>
            </div>
            <Footer />
        </>
    );
};