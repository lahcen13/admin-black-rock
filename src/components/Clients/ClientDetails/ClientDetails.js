import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadAnimation from '../../Elements/LoadAnimation/LoadAnimation';


const clientDetails = (props) => {
  const [client, setClient] = useState()
  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    })
  useEffect(() => {
    axios.get('https://protected-ravine-10497.herokuapp.com/clients/' + props.clientId, header).then(
      (response) => {
        setClient(response.data)
      })
      .catch(error => {
        console.error(error.message)
      });

  }, [])


  return <> {client ?
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
      <div className="mt-7 overflow-x-auto">

        <table className="w-full whitespace-nowrap">
          <thead>
            <tr>
              <th scope="col">Prénom</th>
              <th scope="col">Nom</th>

              <th scope="col">Téléphone</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-3"></tr>
            <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
             
              <td className="">
                <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                  <p>
                    {client.prenom_client}
                  </p>
                </div>
              </td>
              <td className="">
                <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                  <p>
                    {client.prenom_client}
                  </p>
                </div>
              </td>
              <td className="">
                <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                  <p>
                    {client.telephone_client}
                  </p>
                </div>
              </td>
              <td className="">
                <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                  <p>
                    {client.email_client}
                  </p>
                </div>
              </td>
             
             
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    : <LoadAnimation/>}
  </>

}

export default clientDetails;
