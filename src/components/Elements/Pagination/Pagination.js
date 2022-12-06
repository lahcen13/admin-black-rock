import React, { useState,useEffect } from 'react';
import styles from './Pagination.module.css';
import { createPortal } from 'react-dom';

const Pagination = (props) => {
  const [page,setPage] = useState(props.nbrPage) 

  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          {/* <li class="page-item disabled"><a
          class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none"
          href="#" tabindex="-1" aria-disabled="true">Previous</a></li> */}
         
          {props.pagination !== 0 ?
           <li className="page-item" onClick={()=>props.moins()}><a
            className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href="#">Précédent</a>
          </li> 
          :<li className="page-item disabled"><a
          className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none"
          href="#" tabIndex="-1" aria-disabled="true">Précédent</a></li> 
          }
          <li className="page-item disabled"><a
          className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none"
          href="#" tabIndex="-1" aria-disabled="true">{props.nbrPage}</a>
          </li> 

          { !(props.dataLength<10) ?
           <li className="page-item" onClick={()=>props.plus()}><a
           className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
           href="#">Suivant</a>
         </li> :
         
         <li className="page-item disabled"><a
         className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-500 pointer-events-none focus:shadow-none"
         href="#" tabIndex="-1" aria-disabled="true">Suivant</a></li> 
          }
         
        </ul>
      </nav>
    </div>
   
  )
};



export default Pagination;
