import React, { useEffect, useState } from 'react';
import axios from 'axios';
import characterController from '../../../functions/characterController.js'

const FormVehiculeAdd = (props) => {
  const [newVehicule, setNewVehicule] = useState({ transmission: "Automatique", carburant: "Essence", disponible: "Oui", chassis: "NULL" });
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
    if (e.target.name !== "marque" && e.target.name !== "modele" && e.target.name !== "couleur") {
      setNewVehicule({ ...newVehicule, [e.target.name]: e.target.value });
    } else {
      setNewVehicule({ ...newVehicule, [e.target.name]: characterController(e.target.value) });
    }
  }

  const vehiculeNew = () => {
    var object = newVehicule;
    object.prix_livraison = parseInt(object.prix_livraison)
    object.prix_vehicule = parseInt(object.prix_vehicule)
    const data = {
      fields: object
    }

    axios.post('https://protected-ravine-10497.herokuapp.com/vehicules', data, header).then(
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
            <input type="text" id="marque" name="marque" onChange={(e) => onChange(e)} value={newVehicule && newVehicule.marque} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="modele" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Modèle</label>
            <input type="text" id="modele" name="modele" onChange={(e) => onChange(e)} value={newVehicule && newVehicule.modele} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="couleur" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Couleur</label>
            <input type="text" id="couleur" name="couleur" onChange={(e) => onChange(e)} value={newVehicule && newVehicule.couleur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="finition" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Finition</label>
            <input type="text" id="finition" name="finition" onChange={(e) => onChange(e)} value={newVehicule && newVehicule.finition} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

          <div>
            <label htmlFor="motorisation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Motorisation</label>
            <input type="text" id="motorisation" name="motorisation" onChange={(e) => onChange(e)} value={newVehicule && newVehicule.motorisation} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="transmission" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Transmission</label>
            <select name="transmission" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="pet-select">
              <option value="Automatique">Automatique</option>
              <option value="Manuelle">Manuelle</option>
            </select>
          </div>
          <div>
            <label htmlFor="carburant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Carburant</label>
            <select name="carburant" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="pet-select">
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Électrique">Électrique</option>
            </select>
          </div>
          <div>
            <label htmlFor="disponible" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Disponible</label>
            <select name="disponible" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="pet-select">
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
              <option value="Prochainement">Prochainement</option>
            </select>
          </div>

          <div>
            <label htmlFor="prix_vehicule" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prix véhicule HT</label>
            <input type="number" step="100" id="prix_vehicule" name="prix_vehicule" onChange={(e) => onChange(e)} value={newVehicule && newVehicule.prix_vehicule} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="prix_livraison" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prix livraison HT</label>
            <input type="number" step="100" id="prix_livraison" name="prix_livraison" onChange={(e) => onChange(e)} value={newVehicule && newVehicule.prix_livraison} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

          <div>
            <label htmlFor="chassis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">N° Châssis</label>
            <input type="text" id="chassis" name="chassis" onChange={(e) => onChange(e)} value={newVehicule && newVehicule.chassis} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
        </div>

        {!submitNotif ? <button type="button" onClick={() => { vehiculeNew() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter un véhicule</button> : <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Opération réussite</button>}

      </form>
    </div>

  )
};

export default FormVehiculeAdd;
