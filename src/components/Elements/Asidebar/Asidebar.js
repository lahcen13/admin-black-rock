import React, { useState ,useEffect} from 'react';
import styles from './Asidebar.module.css';
import lorenzo from '../../../images/1669820977869.jpg'
import colors from 'tailwindcss/lib/public/colors';
import logo from '../../../images/logo-black-rock.png'
const Asidebar = () => {
    const deconnexion = () => {
        localStorage.removeItem("jwt")
        window.location.href = "/";
      }
    return (
        <aside id={styles.container} style={{ backgroundColor:'#12131C'}} className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-custom transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                <div className="mt-8 text-center">
                    <img src="" alt="" className="h-15 m-auto object-cover" />
                    <span className="hidden text-blue-400 lg:block"></span>
                </div>

                <div className="mt-8 text-center">
                    <img src={logo} alt=""  className="h-100 m-auto rounded-full object-cover" />
                    <span className="hidden text-white  lg:block">Panel admin</span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    {window.location.pathname !== "/users" 
                    
                    
                    ?
                        <li>
                            <a href="/users" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path className="fill-current text-gray-300 group-hover:text-custom" style={{color:"#AF53FF"}} fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                                    <path className="fill-current text-gray-600 group-hover:text-custom"  style={{color:"#6EACFE"}} d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                                </svg>
                                <span className="group-hover:text-custom" style={{color:"#D0963E"}}>Users</span>
                            </a>
                        </li>
                        :
                        <li>
                            <a  href="/users" className={"relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white "+ styles.bg  }>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path className="fill-current text-gray-300 group-hover:text-cyan-300" fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                                    <path className="fill-current text-gray-600 group-hover:text-custom" style={{color:"#6EACFE"}} d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                                </svg>
                                <span className="group-hover:text-gray-700">Users</span>
                            </a>
                        </li>
                    }


                    {window.location.pathname !== "/cryptomonnaie" ?
                        <li>
                            <a href="/cryptomonnaie" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path className="fill-current text-gray-300 group-hover:text-custom" style={{color:"#AF53FF"}} fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                                    <path className="fill-current text-gray-600 group-hover:text-custom"  style={{color:"#6EACFE"}} d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                                </svg>
                                <span className="group-hover:text-custom" style={{color:"#D0963E"}}>Cryptomonnaie</span>
                            </a>
                        </li>
                        :
                        <li>
                            <a href="/cryptomonnaie" className={"relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white "+ styles.bg}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path className="fill-current text-gray-300 group-hover:text-custom"   fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                                    <path className="fill-current text-gray-600 group-hover:text-custom" style={{color:"#6EACFE"}} d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                                </svg>
                                <span className="group-hover:text-gray-700">Cryptocurrency</span>
                            </a>
                        </li>
                    }


                </ul>
            </div>
            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <button onClick={() => deconnexion()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-white group-hover:text-gray-700">Deconnexion</span>
                </button>
            </div>
        </aside>)
};


export default Asidebar;
