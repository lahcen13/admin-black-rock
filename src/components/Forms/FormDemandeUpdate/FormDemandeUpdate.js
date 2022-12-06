import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FormDemandeUpdate = (props) => {
  const [demande, setDemande] = useState(props.demandeToUpdate);
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
    if (e.target.name !== "demande") {
      setDemande({ ...demande, [e.target.name]: characterController(e.target.value) });
    } else {
      setDemande({ ...demande, [e.target.name]: e.target.value });
    }
  }


  const DemandeUpdate = () => {
    var object = demande;
    var id = object.id_demande

    // on suprrime l'id et la date car les deux champs nous voulons pas les modifier.
    delete object.id_demande
    delete object.date_demande
    const data = {
      //row id ( same as delete id )
      id: id,
      fields: object
    }

    axios.put('https://protected-ravine-10497.herokuapp.com/demandes', data, header).then(
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

  const form = () => {
    return <>
      <div>
        <label htmlFor="prenom_prospect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prénom prospect</label>
        <input value={demande && demande.prenom_prospect} type="text" id="prenom_prospect" name="prenom_prospect" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div>
        <label htmlFor="nom_prospect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom prospect</label>
        <input value={demande && demande.nom_prospect} type="text" id="nom_prospect" name="nom_prospect" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div>
        <label htmlFor="telephone_prospect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Téléphone prospect</label>
        <input value={demande && demande.telephone_prospect} type="text" id="telephone_prospect" name="telephone_prospect" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div>
        <label htmlFor="email_prospect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">E-mail prospect</label>
        <input value={demande && demande.email_prospect} type="email" id="email_prospect" name="email_prospect" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>

    </>
  }

  return (
    <form>
      <div className="grid gap-6 mb-6 lg:grid-cols-2">


        {
          !demande.id_client && form()
        }
      </div>
      <div>
        <label htmlhtmlFor="statut_demande" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Statut de la demande</label>
        <select name="statut_demande" id="statut_demande" onChange={(e) => onChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
          {props.statut === "Terminé" ? <option selected={true} value={"Terminé"}>Terminé</option> : <option value={"Terminé"}>Terminé</option>}
          {props.statut === "En cours" ? <option selected={true} value={"En cours"}>En cours</option> : <option value={"En cours"}>En cours</option>}

        </select>
      </div>
      <div className='mb-3'>
        <label htmlFor="demande" className="block  text-sm font-medium text-gray-900 dark:text-gray-300">La demande</label>
        <textarea value={demande && demande.demande} name="demande" id="demande" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => onChange(e)} >

        </textarea>
      </div>
      {!submitNotif ? <button type="button" onClick={() => { DemandeUpdate() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Modifier la demande</button> : <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Opération réussite</button>}
    </form>
  )
};


export default FormDemandeUpdate;
