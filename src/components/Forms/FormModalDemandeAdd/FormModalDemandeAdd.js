import React, { useState, useEffect } from 'react';
import axios from 'axios';
import characterController from '../../../functions/characterController.js'


const FormModalDemandeAdd = (props) => {

  const [vehicules, setVehicules] = useState();
  const [clients, setClients] = useState();
  const [demande, setDemande] = useState({ id_client: [""], id_vehicule: [""], statut_demande: "En cours" });

  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    }
  )

  const [submitNotif, setSubmitNotif] = useState(false);

  const onChange = (e) => {
    setSubmitNotif(false);
    if (e.target.name === "id_vehicule" || e.target.name === "id_client") {
      setDemande({ ...demande, [e.target.name]: [e.target.value] });
    } else {
      if(e.target.name !== "demande"){
        setDemande({ ...demande, [e.target.name]: characterController(e.target.value) });
      }else{
        setDemande({ ...demande, [e.target.name]: e.target.value });
      }
    }
  }

  const demandeNew = () => {
    var object = demande;
    if (object.id_client[0] !== "") {
      delete object.prenom_prospect;
      delete object.nom_prospect;
      delete object.telephone_prospect;
      delete object.email_prospect;
    }
    const data = {
      fields: object
    }

    if (data.fields.id_vehicule[0] === "") {
      delete data.fields.id_vehicule
    }
    if (data.fields.id_client[0] === "") {
      delete data.fields.id_client;
    }

    axios.post('https://protected-ravine-10497.herokuapp.com/demandes', data, header).then(
      (response) => {
        setSubmitNotif(true)
      })
      .catch(error => {
        console.error(error.message)
      });
  }

  useEffect(() => {
    axios.post('https://protected-ravine-10497.herokuapp.com/vehicules/vehicules', {filter:""}, header).then(
      (response) => {
        setVehicules(response.data);
      })
      .catch(error => {
        console.error(error.message)
      });

    axios.post('https://protected-ravine-10497.herokuapp.com/clients/clients',{filter:""}, header).then(
      (response) => {
        setClients(response.data)
      })
      .catch(error => {
        console.error(error.message)
      });
  }, [])



  useEffect(() => {
    if (submitNotif) {
      props.setFormView()
    }
  }, [submitNotif])


  const form = () => {
    return <>
      <div>
        <label htmlFor="prenom_prospect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prénom prospect</label>
        <input type="text" id="prenom_prospect" value={demande && demande.prenom_prospect} name="prenom_prospect" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
      </div>
      <div>
        <label htmlFor="nom_prospect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom prospect</label>
        <input type="text" id="nom_prospect" value={demande && demande.nom_prospect} name="nom_prospect" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
      </div>
      <div>
        <label htmlFor="telephone_prospect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Téléphone prospect</label>
        <input type="text" id="telephone_prospect" value={demande && demande.telephone_prospect} name="telephone_prospect" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
      </div>
      <div>
        <label htmlFor="email_prospect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">E-mail prospect</label>
        <input type="email" id="email_prospect" value={demande && demande.email_prospect} name="email_prospect" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
      </div>

    </>
  }

  return (
    <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full">
      <div className="relative p-4 w-full max-w-md h-full h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 justify-center">
          <button onClick={() => props.setFormView()} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Ajouter une demande</h3>
            <form>
              <div className="grid gap-6 mb-6 lg:grid-cols-2">
                <div>
                  <label htmlFor="id_client" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Le client</label>
                  <select name="id_client" id="id_client" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   >
                    <option value={""}>Non concerné</option>
                    {clients && clients.map((client, key) => {
                      return (<option key={key} value={[client.id_client]}>{client.prenom_client + ' ' + client.nom_client}</option>)
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="id_vehicule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Le vehicule</label>
                  <select name="id_vehicule" id="id_vehicule" onChange={(e) => onChange(e)} className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" } required>
                    <option value={""}>Non concerné</option>
                    {vehicules && vehicules.map((vehicule, key) => {
                      return (<option key={key} value={vehicule.id_vehicule}>{vehicule.marque + ' ' + vehicule.modele + ' ' + vehicule.couleur + ' (' + vehicule.chassis.charAt(vehicule.chassis.length - 4) + vehicule.chassis.charAt(vehicule.chassis.length - 3) + vehicule.chassis.charAt(vehicule.chassis.length - 2) + vehicule.chassis.charAt(vehicule.chassis.length - 1) + ')'}</option>)
                    })}
                  </select>
                </div>
                {demande.id_client &&
                  demande.id_client[0] === "" && form()
                }
              </div>

              <div className='mb-3'>
                <label htmlFor="demande" className="block  text-sm font-medium text-gray-900 dark:text-gray-300">La demande</label>
                <textarea name="demande" id="demande" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => onChange(e)} >
                </textarea>
              </div>
              <button type="button" onClick={() => { demandeNew() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter la demande</button>
            </form>

          </div>
        </div>
      </div>
    </div>

  )
};


export default FormModalDemandeAdd;
