import React, { useEffect, useState } from 'react';
import axios from 'axios';
import characterController from '../../../functions/characterController.js'


const FormClientAdd = (props) => {
  const [newClient, setNewClient] = useState();
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
    if (e.target.name !== "adresse_client"){
      setNewClient({ ...newClient, [e.target.name]: characterController(e.target.value) });
    }else {
      setNewClient({ ...newClient, [e.target.name]: e.target.value });
    }

  }


  const clientNew = () => {
    var object = newClient;
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

  useEffect(()=>{
    if (submitNotif){
      props.setFormView()
      props.setRefresh()
    }
  },[submitNotif])


  return (
    <div className="max-w-2xl mx-auto bg-white p-3">
      <form>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label htmlFor="prenom_client" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prénom</label>
            <input type="text" id="prenom_client" name="prenom_client" onChange={(e) => onChange(e)} value={newClient && newClient.prenom_client} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div>
            <label htmlFor="nom_client" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom</label>
            <input type="text" id="nom_client" name="nom_client" onChange={(e) => onChange(e)} value={newClient && newClient.nom_client} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div>
            <label htmlFor="telephone_client" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Téléphone</label>
            <input type="text" id="telephone_client" name="telephone_client" onChange={(e) => onChange(e)} value={newClient && newClient.telephone_client} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div>
            <label htmlFor="email_client" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">E-mail</label>
            <input type="email" id="email_client" name="email_client" onChange={(e) => onChange(e)} value={newClient && newClient.email_client} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div>
            <label htmlFor="adresse_client" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Adresse postale</label>
            <input type="text" id="adresse_client" name="adresse_client" onChange={(e) => onChange(e)} value={newClient && newClient.adresse_client} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
        </div>
        {!submitNotif ? <button type="button" onClick={() => { clientNew()}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter un client</button> : <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Opération réussite</button>}
      </form>
    </div>

  )
};



export default FormClientAdd;
