import React from 'react';
import styles from './SuivisImprevuDetails.module.css';

const SuivisImprevuDetails = (props) => (
  <div className={" sm:px-6 w-full"}>
    <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
      <div className="sm:flex items-center justify-between">
        <div className="flex items-center">
          <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" >
            <button onClick={() => { props.setView() }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
              <p className="text-sm font-medium leading-none text-white">Retour</p>
            </button>
          </a>
        </div>
      </div>
    </div>
    <div className="bg-white h-screen flex  justify-center">
      <div className=" text-center">
        <div className="text-7xl text-blue-300 leading-5">”</div>
        <div className="font-medium max-w-xl text-xl">
          {props.imprevu}
        </div>
        <div className="mt-5">
          <span className="font-bold"></span><span className="text-gray-500 font-medium"> - Auto BSO Marseille</span>
        </div>
      </div>
    </div>
  </div>
);



export default SuivisImprevuDetails;
