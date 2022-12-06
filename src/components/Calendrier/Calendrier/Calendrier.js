import React, { useEffect, useState } from 'react';
import styles from './Calendrier.module.css';
import FormCalendrierAdd from '../../Forms/FormCalendrierAdd/FormCalendrierAdd';

const Calendrier = (props) => {
  const [formView, setFormView] = useState();
  return (
    <div className={styles.Content + " sm:px-6 w-full"}>
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div className="sm:flex items-center justify-between">
          <div className="flex items-center">
            <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-red-800 ml-4 sm:ml-8"  >
              {formView &&
                <button onClick={() => { setFormView(false) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Retour</p>
                </button>
              }
            </a>
            {!formView &&
            <>
              <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"  >
                <button onClick={() => { setFormView(true) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Ajouter un évènement</p>
                </button>
              </a>
              <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"  >
                <button onClick={() => { props.showCalendrierList() }} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Lister les évènement</p>
                </button>
              </a>
              </>
            }
          </div>
        </div>
        <div className="mt-7 overflow-x-auto">
          {
            !formView
              ?
              <iframe className="airtable-embed" src={process.env.REACT_APP_CALENDRIER} frameBorder="0" width="100%" height="640" style={{ background: "transparent", border: "1px solid #ccc" }}>
              </iframe>
              :
              <FormCalendrierAdd setView={()=>{setFormView(false)}} />
          }
        </div>
      </div>
    </div>
  )
};

export default Calendrier;



