import styles from './FormCommandeUpdate.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const FormCommandeUpdate = (props) => {
  const [commande, setCommande] = useState(props.commandeToUpdate);
  const [vehicules, setVehicules] = useState();
  const [clients, setClients] = useState();
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
    setCommande({ ...commande, [e.target.name]: e.target.value });
  }


  const CommandUpdate = () => {
    var object = commande;
    var id  =  object.id_commande;
    // on suprrime l'id et la date car les deux champs nous voulons pas les modifier.
    delete object.id_commande;
    delete object.id_client;
    delete object.date_commande;
    delete object.prix_Command;
    delete object.id_vehicule;
    delete object.prix_livraison;

    const data = {
      id: id,
      fields: object
    }

    axios.put('https://protected-ravine-10497.herokuapp.com/commandes', data, header).then(
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
    <form>
      <div className="grid gap-6 mb-6 lg:grid-cols-2">
        <div>
          <label htmlFor="numero_bon_commande" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bon de commande</label>
          <input type="text" id="numero_bon_commande" name="numero_bon_commande" onChange={(e) => onChange(e)} value={commande && commande.numero_bon_commande} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        </div>
        { commande && 
        <div>
          <label htmlFor="destination_port" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Port</label>
          <select name="destination_port" id="destination_port" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option></option>
              {commande.destination_port==="Alger" ?  <option selected={true} value={"Alger"}>Alger</option> : <option value={"Alger"}>Alger</option>}
              {commande.destination_port==="Djendjen" ?  <option selected={true} value={"Djendjen"}>Djendjen</option> : <option value={"Djendjen"}>Djendjen</option>}
              {commande.destination_port==="Mostaganem" ?  <option selected={true} value={"Mostaganem"}>Mostaganem</option> : <option value={"Mostaganem"}>Mostaganem</option>}
              {commande.destination_port==="Skikda" ?  <option selected={true} value={"Skikda"} >Skikda</option> : <option value={"Skikda"}>Skikda</option>   }

          </select>
        </div>
        }
        <div>
          <label htmlFor="type_paiement" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Type de paiement</label>
          <input type="text" id="type_paiement" name="type_paiement" onChange={(e) => onChange(e)} value={commande && commande.type_paiement} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        </div>
        

        <div>
          <label htmlFor="frais_supplementaire" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Frais supplementaire</label>
          <input type="text" id="frais_supplementaire" name="frais_supplementaire" onChange={(e) => onChange(e)} value={commande && commande.frais_supplementaire} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        </div>

        <div>
          <label htmlFor="validation_paiement" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Statut</label>
          <select name="validation_paiement" id="validation_paiement" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
            {commande.validation_paiement === 'En cours' ? <option selected={true} value={"En cours"}>En cours</option> : <option value={"En cours"}>En cours</option>}
            {commande.validation_paiement === 'Validé' ? <option selected={true} value={"Validé"}>Validé</option> : <option value={"Validé"}>Validé</option>}
          </select>
        </div>

        <div>
          <label htmlFor="description_commande" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
          <textarea value={commande && commande.description_commande}name="description_commande" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => onChange(e)}  />
        </div>

      </div>
      {!submitNotif ? <button type="button" onClick={() => { CommandUpdate()}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Modifier la commande</button> : <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Opération réussite</button>}
    </form>
  )
};


export default FormCommandeUpdate;
