import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormCommandeAdd = (props) => {
  const [vehicules, setVehicules] = useState();
  const [clients, setClients] = useState();
  const [newCommande, setNewCommande] = useState({ frais_supplementaire: 0, validation_paiement: "En cours", statut_livraison: "En cours", recuperer_livraison: "En cours", numero_bon_commande: "null" });
  const [alertVehicule, setAlertVehicule] = useState(false)
  const [alertClient, setAlertClient] = useState(false);

  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    }
  )
  const [submitNotif, setSubmitNotif] = useState(false);

  useEffect(() => {
    axios.post('https://protected-ravine-10497.herokuapp.com/vehicules/available',header, header).then(
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

  const onChange = (e) => {
    setSubmitNotif(false);
    { e.target.name === "id_vehicule" && setAlertVehicule(false) }
    { e.target.name === "id_client" && setAlertClient(false) }
    setNewCommande({ ...newCommande, [e.target.name]: e.target.value});
  }

  const CommandNew = () => {
    var object = newCommande;
    const data = {
      fields: object
    }
    data.fields.frais_supplementaire = data.fields.frais_supplementaire.toString()

    if (data.fields.id_vehicule === undefined) {
      setAlertVehicule(true)
    }
    if (data.fields.id_client === undefined) {
      setAlertClient(true)
    }
    data.fields.id_vehicule = [data.fields.id_vehicule]
    data.fields.id_client = [data.fields.id_client]

    axios.post('https://protected-ravine-10497.herokuapp.com/commandes', data, header).then(
      (response) => {
        setSubmitNotif(true)

      })
      .catch(error => {
        console.error(error.message)
      });
  }

  useEffect(() => {
    if (submitNotif) {
      props.setFormView()
      props.setRefresh()
    }
  }, [submitNotif])

  return (
    <div className="max-w-2xl mx-auto bg-white p-3">
      <form>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label htmlFor="id_client" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Clients</label>
            <select name="id_client" id="id_client" onChange={(e) => onChange(e)} className={!alertClient ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" : "bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} >
              <option key={null} ></option>
              {clients && clients.map((client, key) => {
                return (<option key={key} value={[client.id_client]}>{client.prenom_client + ' ' + client.nom_client}</option>)
              })}
            </select>
          </div>
          <div>
            <label htmlFor="id_vehicule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vehicules disponible</label>
            <select name="id_vehicule" id="id_vehicule" onChange={(e) => onChange(e)} className={!alertVehicule ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" : "bg-red-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} required>
              <option key={null}></option>
              {vehicules && vehicules.map((vehicule, key) => {
                return (<option key={key} value={[vehicule.id_vehicule]}>{vehicule.marque + ' ' + vehicule.modele + ' ' + vehicule.couleur + ' (' + vehicule.chassis.charAt(vehicule.chassis.length - 4) + vehicule.chassis.charAt(vehicule.chassis.length - 3) + vehicule.chassis.charAt(vehicule.chassis.length - 2) + vehicule.chassis.charAt(vehicule.chassis.length - 1) + ')'}</option>)
              })}
            </select>
          </div>
          <div>
            <label htmlFor="numero_bon_commande" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bon de commande</label>
            <input type="text" id="numero_bon_commande" name="numero_bon_commande" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="destination_port" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Port</label>
            <select name="destination_port" id="destination_port" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option></option>
              <option value={"Alger"}>Alger</option>
              <option value={"Djendjen"}>Djendjen</option>
              <option value={"Mostaganem"}>Mostaganem</option>
              <option value={"Skikda"}>Skikda</option>

            </select>
          </div>
          <div>
            <label htmlFor="type_paiement" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Type de paiement</label>
            <input type="text" id="type_paiement" name="type_paiement" onChange={(e) => onChange(e)} value={newCommande && newCommande.type_paiement} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>


          <div>
            <label htmlFor="frais_supplementaire" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Frais supplementaire</label>
            <input type="text" id="frais_supplementaire" name="frais_supplementaire" onChange={(e) => onChange(e)} value={newCommande && newCommande.frais_supplementaire} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="validation_paiement" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Statut</label>
            <select name="validation_paiement" id="validation_paiement" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option value={"En cours"}>En cours</option>
              <option value={"Validé"}>Validé</option>
            </select>
          </div>

          <div>
            <label htmlFor="description_commande" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
            <textarea name="description_commande" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => onChange(e)}>
              {newCommande && newCommande.description_commande}
            </textarea>
          </div>

        </div>
        {!submitNotif ? <button type="button" onClick={() => { CommandNew() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter la commande</button> : <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Opération réussite</button>}
      </form>
    </div>
  )
};


export default FormCommandeAdd;
