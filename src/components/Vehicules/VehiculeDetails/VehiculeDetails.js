import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadAnimation from '../../Elements/LoadAnimation/LoadAnimation';

const VehiculeDetails = (props) => {
  const [data, setData] = useState()
  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    })

  useEffect(() => {
    axios.get('https://protected-ravine-10497.herokuapp.com/vehicules/' + props.vehiculeId, header).then(
      (response) => {
        setData(response.data)
      })
      .catch(error => {
        console.error(error.message)
      });

  }, [])


  return <> {data ?
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
              <th scope="col">Véhicule</th>
              <th scope="col">F. Technique</th>
              <th scope="col">Prix HT</th>
              <th scope="col">N° Châssis</th>
              <th scope="col">Date</th>
              <th scope="col">Expédition</th>

            </tr>
          </thead>
          <tbody>
            <tr className="h-3"></tr>
            <tr tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
              <td className="">
                <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                  <p>
                    {data.marque + " " + data.modele + " " + data.couleur + " " + data.finition}
                  </p>
                </div>
              </td>
              <td className="">
                <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                  <p>
                    {data.carburant + " " + data.motorisation + " " + data.transmission}
                  </p>
                </div>
              </td>
              <td className="">
                <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                  <p>
                    {data.prix_vehicule + "€ + " + data.prix_livraison + "€"}
                  </p>
                </div>
              </td>
              <td className="pl-5">
                <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                  {data.chassis}
                </div>
              </td>
              <td className="pl-5">
                <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                  <p>
                    {data.date_vehicule}
                  </p>
                </div>
              </td>
              <td className="pl-5 item-center text-center">
                {data.disponible === "Oui" ? <button className="py-3 px-7 text-sm leading-none text-gray-700 bg-green-100 rounded focus:outline-none">
                  Disponible
                </button> : ""}
                {data.disponible === "Non" ? <button className="py-3 px-7 text-sm leading-none text-gray-700 bg-red-100 rounded focus:outline-none">
                  Indisponible
                </button> : ""}
                {data.disponible === "Prochainement" ? <button className="py-3 px-7 text-sm leading-none text-gray-700 bg-yellow-100 rounded focus:outline-none">
                  Prochainement
                </button> : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    : <LoadAnimation/>}
  </>

}



export default VehiculeDetails;
