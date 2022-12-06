import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadAnimation from '../../Elements/LoadAnimation/LoadAnimation';
 

const DemandeProspectDetails = (props) => {
  const [client,setClient]=useState();
  const [submitNotif, setSubmitNotif] = useState(false);
  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    }
  )
  useEffect(()=>{
    if (client){
      var object = client;
      const data = {
        fields: object
      }
      axios.post('https://protected-ravine-10497.herokuapp.com/clients', data, header).then(
        (response) => {
          setSubmitNotif(true)
        })
        .catch(error => {
          console.error(error.message)
        });
    }
  },[client])
  return <> {props.prospect ?
    <div className={" sm:px-6 w-full"}>
      <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
        <div className="sm:flex items-center justify-between">
          <div className="flex items-center">
            <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"  >
              <button onClick={() => { props.setView() }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                <p className="text-sm font-medium leading-none text-white">Retour</p>
              </button>
            </a>
          </div>
        </div>
      </div>
      <table className="w-full whitespace-nowrap">
        <thead>
          <tr>
            <th scope="col">Prospect</th>
            <th scope="col">Téléphone</th>
            <th scope="col">Email</th>
            <th scope="col">Client</th>
          </tr>
        </thead>
        <tbody>
          <tr className="h-3"></tr>
          <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">

            <td className="">
              <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                <p>
                  {props.prospect.prenom_prospect + " " + props.prospect.nom_prospect}
                </p>
              </div>
            </td>
            <td className="">
              <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                <p>
                  {props.prospect.telephone_prospect}
                </p>
              </div>
            </td>
            <td className="">
              <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                <p>
                  {props.prospect.email_prospect}
                </p>
              </div>
            </td>
            {!submitNotif ? 
            <td className="pl-5 textcenter item-center text-center">
              <button onClick={()=>{setClient({nom_client:props.prospect.nom_prospect, prenom_client:props.prospect.prenom_prospect,telephone_client:props.prospect.telephone_prospect, email_client:props.prospect.email_prospect })}} className="py-3 px-7 text-sm leading-none text-gray-700 bg-green-100 rounded focus:outline-none ">
                Ajouter le client 
              </button>
            </td>
             :
             <td className="pl-5 textcenter item-center text-center">
             <button className="py-3 px-7 text-sm leading-none text-gray-700 bg-red-100 rounded focus:outline-none ">
               le client est ajouté
             </button>
           </td>
             }
          </tr>
        </tbody>
      </table>
    </div>
    : <LoadAnimation/>}
  </>

}

export default DemandeProspectDetails;