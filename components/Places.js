import Link from 'next/link';
import Logo from './Logo';

export default ({ nologo, work, about, blog }) => (
    <>
        {!nologo && <Link href='/index'><a className='navbar-brand m-lg ml-clr'><Logo /></a></Link>}
        <Link href='/work'><a className={`m-md slide ${work ? 'active' : ''}`}>WORK</a></Link>
        <Link href='/about'><a className={`m-md slide ${about ? 'active' : ''}`}>ABOUT</a></Link>
        <Link href='/blog'><a className={`m-md slide ${blog ? 'active' : ''}`}>BLOG</a></Link>
    </>
);