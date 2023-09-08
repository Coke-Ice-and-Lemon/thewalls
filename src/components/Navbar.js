import Link from "next/link"
import { useState } from "react";
// import Search from "./SearchBar";
import { useSession, signOut } from "next-auth/react"


const Navbar = () => {

    const [navbarOpen, setNavbarOpen] = useState(false);
    const { data: session } = useSession()

    return (
        <div>
            <nav className="relative flex max-w-full w-full flex-wrap items-center justify-between px-2 py-3">
                <div className="container max-w-full px-4 flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link
                            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                            href="/" onClick={() => setNavbarOpen(false)}
                        >
                            Gramophone
                        </Link>
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} fill="white" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                        {/* <a className={`max-md:h-10 max-md:w-24 relative inline-flex items-center mx-4 justify-center p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out   rounded-full shadow-md group`}>
                                <span className="absolute inset-0 flex items-center justify-center text-black duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span className={`absolute flex items-center justify-center max-md:text-xs h-full w-full transition-all duration-300 transform group-hover:translate-x-full ease`}>About Us</span>
                                <span className="relative invisible">Button Text</span>
                            </a> */}
                            <li className="nav-item">
                                <Link
                                    className="px-3 py-2 h-full flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    href="/about_us" onClick={() => setNavbarOpen(false)}
                                >
                                    <span className="ml-2">About Us</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="px-3 py-2 h-full flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                    href="/privacy-policy" onClick={() => setNavbarOpen(false)}
                                >
                                    <span className="ml-2">Privacy Policy</span>
                                </Link>
                            </li>
                            {session? <a  onClick={()=> signOut()} className={`max-md:h-10 max-md:w-24 relative inline-flex items-center justify-center mx-1 p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out rounded-full shadow-md group bg-[#121212]`}>
                                <span className="absolute inset-0 flex items-center justify-center text-black duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                                <span className={`absolute flex items-center justify-center max-md:text-xs h-full w-full transition-all duration-300 transform group-hover:translate-x-full ease`}>Logout</span>
                                <span className="relative invisible">Button Text</span>
                            </a>
                            : (<li className="nav-item">
                            <Link
                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                href="/" onClick={() => setNavbarOpen(false)}
                            >
                                <span className="ml-2">Login</span>
                            </Link>
                        </li>  )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar