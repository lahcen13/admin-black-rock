import React, { useState } from 'react';
import styles from './AsidebarMobile.module.css';
import sacha from '../../../images/sacha.jpg'
import benjamin from '../../../images/benjamin.jpg'

const AsidebarMobile = (props) => {
  const deconnexion = () => {
    localStorage.removeItem("jwt")
    window.location.href = "/";
  }
  return (
    <aside className=" z-10  pb-3 px-6 w-full flex flex-col h-screen border-r bg-white transition duration-300 ">
      <div>
        <div className="mt-8 text-center">
          <img src={""} alt="" className="w-20 h-20 m-auto rounded-full object-cover" />
          <h5 className=" mt-4 text-xl font-semibold text-gray-600 lg:block">{"Benjamin Bourlon"}</h5>
          <span className=" text-gray-400 lg:block">Administrateur</span>
        </div>
        <ul className="space-y-2 tracking-wide mt-8">
          
          {window.location.pathname !== "/clients" ?
            <li>
              <a  href="/clients" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path className="fill-current text-gray-300 group-hover:text-cyan-300" fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                  <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                </svg>
                <span className="group-hover:text-gray-700">Clients</span>
              </a>
            </li>
            :
            <li>
              <a href="/clients" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path className="fill-current text-gray-300 group-hover:text-cyan-300" fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                  <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                </svg>
                <span className="group-hover:text-gray-700">Clients</span>
              </a>
            </li>
          }

          {window.location.pathname !== "/demandes" ?
            <li>
              <a onClick={() => { localStorage.setItem("page", "demandes") }} href="/demandes" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path className="fill-current text-gray-300 group-hover:text-cyan-300" fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                  <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                </svg>
                <span className="group-hover:text-gray-700">Demandes</span>
              </a>
            </li>
            :
            <li>
              <a onClick={() => { localStorage.setItem("page", "demandes") }} href="/demandes" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path className="fill-current text-gray-300 group-hover:text-cyan-300" fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                  <path className="fill-current text-gray-600 group-hover:text-cyan-600" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                </svg>
                <span className="group-hover:text-gray-700">Demandes</span>
              </a>
            </li>
          }



        </ul>
      </div>
      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button onClick={() => deconnexion()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="group-hover:text-gray-700">Deconnexion</span>
        </button>
      </div>
    </aside>
  )
};



export default AsidebarMobile;
