import React, { useEffect, useState } from 'react';
import axios from 'axios';
import characterController from '../../../functions/characterController.js'


const FormVehiculeUpdate = (props) => {
  const [vehicule, setVehicule] = useState(props.vehiculeToUpdate);
  const [submitNotif, setSubmitNotif] = useState(false);
  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    }
  )

  const onChange = (e) => {
    setSubmitNotif(false);
    if (e.target.name !== "marque" && e.target.name !== "modele" && e.target.name !== "couleur") {
      setVehicule({ ...vehicule, [e.target.name]: e.target.value });
    } else {
      setVehicule({ ...vehicule, [e.target.name]: characterController(e.target.value) });
    }
  }

  const vehiculeUpdate = () => {
    var object = vehicule;
    var id = vehicule.id_vehicule;
    // on suprrime l'id et la date car les deux champs nous voulons pas les modifier.
    delete object.id_vehicule;
    delete object.date_vehicule;
    delete object.id;
    delete object.id_vehicule_incremented;

    // Le prix est typé INT sur Airtable
    object.prix_livraison = parseInt(object.prix_livraison);
    object.prix_vehicule = parseInt(object.prix_vehicule);
    const data = {
      //row id ( same as delete id )
      id: id,
      fields: vehicule
    }

    axios.put('https://protected-ravine-10497.herokuapp.com/vehicules', data, header).then(
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
            <label htmlFor="marque" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Marque</label>
            <input type="text" id="marque" name="marque" onChange={(e) => onChange(e)} value={vehicule && vehicule.marque} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="modele" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Modèle</label>
            <input type="text" id="modele" name="modele" onChange={(e) => onChange(e)} value={vehicule && vehicule.modele} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="couleur" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Couleur</label>
            <input type="text" id="couleur" name="couleur" onChange={(e) => onChange(e)} value={vehicule && vehicule.couleur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="finition" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Finition</label>
            <input type="text" id="finition" name="finition" onChange={(e) => onChange(e)} value={vehicule && vehicule.finition} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="motorisation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Motorisation</label>
            <input type="text" id="motorisation" name="motorisation" onChange={(e) => onChange(e)} value={vehicule && vehicule.motorisation} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="transmission" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Transmission</label>
            <select name="transmission" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="pet-select">
              {vehicule.transmission === "Automatique" ? <option value="Automatique" selected>Automatique</option> : <option value="Automatique">Automatique</option>}
              {vehicule.transmission === "Manuelle" ? <option value="Manuelle" selected>Manuelle</option> : <option value="Manuelle">Manuelle</option>}
            </select>
          </div>
          <div>
            <label htmlFor="carburant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Carburant</label>
            <select name="carburant" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="pet-select">
              {vehicule.carburant === "Essence" ? <option value="Essence" selected>Essence</option> : <option value="Essence">Essence</option>}
              {vehicule.carburant === "Diesel" ? <option value="Diesel" selected>Diesel</option> : <option value="Diesel">Diesel</option>}
              {vehicule.carburant === "Électrique" ? <option value="Électrique" selected>Électrique</option> : <option value="Électrique">Électrique</option>}
            </select>
          </div>
          <div>
            <label htmlFor="disponible" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Disponible</label>
            <select name="disponible" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="pet-select">
              {vehicule.disponible === "Oui" ? <option value="Oui" selected>Oui</option> : <option value="Oui">Oui</option>}
              {vehicule.disponible === "Non" ? <option value="Non" selected>Non</option> : <option value="Non">Non</option>}
              {vehicule.disponible === "Prochainement" ? <option value="Prochainement" selected>Prochainement</option> : <option value="Prochainement">Prochainement</option>}
            </select>
          </div>
          <div>
            <label htmlFor="prix_vehicule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prix véhicule HT</label>
            <input type="number" step={100} id="prix_vehicule" name="prix_vehicule" onChange={(e) => onChange(e)} value={vehicule && vehicule.prix_vehicule} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="prix_livraison" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prix livraison HT</label>
            <input type="number" step={100} id="prix_livraison" name="prix_livraison" onChange={(e) => onChange(e)} value={vehicule && vehicule.prix_livraison} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="chassis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">N° Châssis</label>
            <input type="text" id="chassis" name="chassis" onChange={(e) => onChange(e)} value={vehicule && vehicule.chassis} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

        </div>
        {!submitNotif ? <button type="button" onClick={() => { vehiculeUpdate() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Modifier le véhicule</button> : <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Opération réussite</button>}
      </form>
    </div>
  )
};

export default FormVehiculeUpdate;
