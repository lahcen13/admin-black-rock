import React from 'react';
import Styles from './DeleteModal.module.css'

const DeleteModal = (props) => {
  return (
    <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full">
      <div className="relative p-4 w-full max-w-md h-full h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 justify-center">
        <div className="rounded-t  bg-gradient-to-r from-sky-600 to-cyan-400">
                <div className="relative py-3 px-2 flex">
                  <span className="font-semibold text-white md:text-base text-sm">Alerte</span>
                </div>
              </div>
              <div className="md:text-base text-sm border-b p-2 h-24">
                <p>Voulez-vous supprimer les éléments cochés ?</p>
              </div>
              <div className="p-2 flex justify-end rounded-b">
                <button className="focus:outline-none py-1 px-2 md:py-2 md:px-3 w-24 mr-2 bg-blue-700 hover:bg-blue-600 text-white rounded" onClick={() => { props.showPopUp() }}>Annuler</button>
                <button className="focus:outline-none py-1 px-2 md:py-2 md:px-3 w-24 bg-red-700 hover:bg-red-600 text-white rounded" onClick={() => { props.confirmDeleteAll() }}>Supprimer</button>
              </div>
        </div>
      </div>
    </div>
  )
};

export default DeleteModal;
