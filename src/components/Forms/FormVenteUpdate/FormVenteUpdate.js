
import React, { useState, useEffect } from 'react';
import styles from './FormVenteUpdate.module.css';
import axios from 'axios';

const FormVenteUpdate = (props) => {
  const [commande, setCommande] = useState(props.suivisToUpdate);
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
    var id = object.id_commande;
    // on suprrime l'id et la date car les deux champs nous voulons pas les modifier.
    delete object.id_commande;
    delete object.id_client;
    delete object.date_commande;
    delete object.prix_Command;
    delete object.id_vehicule;
    delete object.prix_livraison;
    commande.date_livraison = String(commande.date_livraison)
    if (object.recuperer_livraison === "En cours") {
      object.date_livraison = null
    }
    const data = {
      //row id ( same as delete id )
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
  useEffect(() => {
    if (submitNotif) {
      props.setFormView()
      props.setRefresh()
    }
  }, [submitNotif])



  return (
    <form>
      <div className="grid gap-6 mb-6 lg:grid-cols-2">
        <div>
          <label htmlFor="date_depart" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date de depart</label>
          <input type="date" id="date_depart" name="date_depart" onChange={(e) => onChange(e)} value={commande && commande.date_depart} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div>
          <label htmlFor="date_livraison" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date de livraison</label>
          <input type="date" id="date_livraison" name="date_livraison" onChange={(e) => onChange(e)} value={commande && commande.date_livraison} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <div>
          <label htmlFor="statut_livraison" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Statut livraison</label>
          <input type="text" id="statut_livraison" name="statut_livraison" onChange={(e) => onChange(e)} value={commande && commande.statut_livraison} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        {commande &&
          <div>
            <label htmlFor="destination_port" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Port</label>
            <select name="destination_port" id="destination_port" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option value={""}></option>
              {commande.destination_port === "Alger" ? <option selected={true} value={"Alger"}>Alger</option> : <option value={"Alger"}>Alger</option>}
              {commande.destination_port === "Djendjen" ? <option selected={true} value={"Djendjen"}>Djendjen</option> : <option value={"Djendjen"}>Djendjen</option>}
              {commande.destination_port === "Mostaganem" ? <option selected={true} value={"Mostaganem"}>Mostaganem</option> : <option value={"Mostaganem"}>Mostaganem</option>}
              {commande.destination_port === "Skikda" ? <option selected={true} value={"Skikda"} >Skikda</option> : <option value={"Skikda"}>Skikda</option>}

            </select>
          </div>
        }

        {commande &&
          <div>
            <label htmlFor="recuperer_livraison" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vehicule est-il r??cup??r?? par le client ?</label>
            <select name="recuperer_livraison" id="recuperer_livraison" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option value={"En cours"} >En cours</option>
              <option selected={true} value={"Oui"}>R??cup??r??</option>
            </select>
          </div>
        }


        <div>
          <label htmlFor="imprevu_livraison" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Impr??vu livraison</label>
          <textarea name="imprevu_livraison" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => onChange(e)}>
            {commande && commande.imprevu_livraison}
          </textarea>
        </div>
      </div>
      {!submitNotif ? <button type="button" onClick={() => { CommandUpdate() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Modifier la vente</button> : <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Op??ration r??ussite</button>}
    </form>
  )

};

export default FormVenteUpdate;
