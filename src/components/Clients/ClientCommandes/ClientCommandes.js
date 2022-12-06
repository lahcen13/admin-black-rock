import React, { useEffect, useState } from 'react';
import styles from './ClientCommandes.module.css';
import axios from 'axios';
import DeleteModal from '../../Elements/DeleteModal/DeleteModal';
import VehiculeTitle from '../../Vehicules/VehiculeTitle/VehiculeTitle'
import VehiculePrixTotal from '../../Vehicules/VehiculePrixTotal/VehiculePrixTotal';
import FormCommandeAdd from '../../Forms/FormCommandeAdd/FormCommandeAdd';
import FormCommandeUpdate from '../../Forms/FormCommandeUpdate/FormCommandeUpdate';
import LoadAnimation from '../../Elements/LoadAnimation/LoadAnimation';

const ClientCommandes = (props) => {
  const [commandes, setCommandes] = useState(false);
  const [formView, setFormView] = useState();
  const [commandeToUpdate, setCommandeToUpdate] = useState();
  const [commandesToDelete, setCommandesToDelete] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [confirmDelete, setConfirmeDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    })

    
  useEffect(() => {
    axios.get('https://protected-ravine-10497.herokuapp.com/commandes/client/' + props.client.id_client_incremented, header).then(
      (response) => {
        setCommandes(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error(error.message)
      });

  }, [commandeToUpdate, confirmDelete, refresh])


  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  // permet d'éviter le bug suivant : la selection d'un checkbox pour supression d'un element ensuite aller au formulaire d'update ou d'ajout et revenir sur la page de supression, l'element que nous avons selectionner au début sera plus selectionner mais on pourra le suprimmer quand même.
  useEffect(() => {
    setCommandesToDelete([])
  }, [formView])


  // this table contains vehicule row ID'S, we can delete up to 10 recods
  const setAllCheckbox = () => {
    const data = document.getElementsByTagName('input')
    var array = []
    
    // verifier si nous avons déjà coché des cases.
    if (commandesToDelete.length !== 0) {
      for (let index = 0; index < data.length; index++) {
        if (data[index].type === "checkbox") {
          data[index].checked = false;
        }
      }
    } else {
      for (let index = 0; index < data.length; index++) {
        if (data[index].type === "checkbox") {
          data[index].checked = true;
          array.push(data[index].value)
        }
      }
    }
    setCommandesToDelete(array);
  }

  const selectOneCheckbox = (id_commande) => {
    const element = !document.getElementById(id_commande).checked;
    // Si il y a des données dans vehiculesToDelete, on les rajoute dans la table.
    if (commandesToDelete.length !== 0) {
      var table = commandesToDelete
      // Si l'element n'est pas dans le tableau 
      if (table.indexOf(id_commande) === -1) {
        table.push(id_commande);
        setCommandesToDelete(table)
      } else {
        // L'element est déjà coché
        setCommandesToDelete(table.filter(element => element !== id_commande));
      }
    } else {
      // Si il  n y a pas de données dans vehiculesToDelete. 
      setCommandesToDelete([id_commande])
    }
  }

  useEffect(() => {
    if (confirmDelete) {
      commandesToDelete.forEach(element => {
        commandeDelete(element);
        setShowPopUp(false)
        let table = document.getElementsByTagName("input")
        for (let index = 0; index < table.length; index++) {
          table[index].checked = false;
        }
      });
      props.setView("clients")
    }

  }, [confirmDelete])


  const commandeDelete = async (id) => {
    await axios.delete('https://protected-ravine-10497.herokuapp.com/commandes', {
      data: { id: [id] },
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    }, header).then(
      (response) => {
        setRefresh(!refresh)
      })
      .catch(error => {
        console.error(error.message)
      });
  }

  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  const updateValidationPaiement = async (state,id) => {
    const data = {
      id: id,
      fields: {
        validation_paiement: state
      }
    }
    await axios.put('https://protected-ravine-10497.herokuapp.com/commandes', data, header).then(
      (response) => {
        setRefresh(!refresh)
      })
      .catch(error => {
        console.error(error.message)
      });
  }


  return (
    <>
      {showPopUp
        ?
        commandesToDelete.length !== 0 ? <DeleteModal confirmDeleteAll={() => setConfirmeDelete(true)} showPopUp={() => setShowPopUp(false)} /> : setShowPopUp(false)
        : ""
      }
      <div className={styles.Content + " sm:px-6 w-full"}>
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p tabIndex="0" className="focus:outline-none text-base sm:text-lg md:text-l lg:text-xl font-bold leading-normal text-gray-800"><b>Nom complet : </b>{props.client ? props.client.nom_client + ' ' + props.client.prenom_client : "... "}</p>
          
          </div> 
          <div>
            <p tabIndex="0" className="focus:outline-none text-base sm:text-lg md:text-l lg:text-xl font-bold leading-normal text-gray-800">
              <b>Téléphone : </b>
                {props.client ? ' ' + props.client.telephone_client : ''}
            </p>
            
            <p tabIndex="0" className="focus:outline-none text-base sm:text-lg md:text-l lg:text-xl font-bold leading-normal text-gray-800">
            <b>Mail : </b>
                {props.client ? ' ' + props.client.email_client : ''} 
            </p>

          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              <div onClick={() => setAllCheckbox()}>
                <a className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800">
                  <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                    <p>Tout</p>
                  </div>
                </a>
              </div>
              {!formView ?
                <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-red-800 ml-4 sm:ml-8"  >
                  <button onClick={() => { props.setView(); setRefresh(!refresh) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                    <p className="text-sm font-medium leading-none text-white">Retour</p>
                  </button>
                </a>
                :
                <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-red-800 ml-4 sm:ml-8"  >
                  <button onClick={() => { setFormView(); setRefresh(!refresh) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                    <p className="text-sm font-medium leading-none text-white">Retour</p>
                  </button>
                </a>
              }
              <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"  >
                 <button onClick={() => { setShowPopUp(true) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Supprimer</p>
                </button> 
              </a>
            </div>
          </div>
          <div className="mt-7 overflow-x-auto">
            {!formView ?
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr>
                    <th>Choisir</th>
                    <th scope="col">Véhicule </th>
                    <th scope="col">Bon de commande</th>
                    <th scope="col">Port</th>
                    <th scope="col">Prix Total</th>
                    <th scope="col">Date</th>
                    <th scope="col">Type paiement</th>
                    <th scope="col">Description</th>
                    <th scope="col">Validation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-3"></tr>
                  {commandes ? commandes.map((commande, key) => (
                    <tr key={key} tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">

                      <td>
                        <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center  text-center ">
                          <input type="checkbox" onClick={() => selectOneCheckbox(commande.id_commande)} id={commande.id_commande} value={commande.id_commande} name={commande.id_commande} className="checkbox" />
                        </div>
                      </td>
                      {commande.id_vehicule ?
                      <td className="pl-5 textcenter item-center text-center" onClick={() => { props.showVehicule(); props.dataVehicule(commande.id_vehicule[0]) }}>
                      <VehiculeTitle id_vehicule={commande.id_vehicule[0]} />
                      </td>
                      :
                      <td className="pl-5 item-center text-center">
                      <button  className="py-3 px-7 text-sm leading-none text-gray-700 bg-gray-100 rounded focus:outline-none ">
                            Supprimé
                      </button>
                      </td>
                      }
                      <td>
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {commande.numero_bon_commande}
                          </p>
                        </div>
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {commande.destination_port}
                          </p>
                        </div>
                      </td>
                      <td className="">
                      {commande.id_vehicule ?
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <VehiculePrixTotal id_vehicule={commande.id_vehicule[0]} frais_supplementaire={parseInt(commande.frais_supplementaire)} />
                        </div> :
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          Supprimé
                        </div>
                      }
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {commande.date_commande}
                          </p>
                        </div>
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {commande.type_paiement}
                          </p>
                        </div>
                      </td>
                     
                      <td className="pl-5 item-center text-center">
                        {!commande.description_commande ?
                          <button  className="py-3 px-7 text-sm leading-none text-gray-700 bg-gray-100 rounded focus:outline-none ">
                            Aucune
                          </button>
                          :
                          <button onClick={() => { props.showCommandeDescription(); props.dataCommandeDescription(commande.description_commande) }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-yellow-100 rounded focus:outline-none ">
                            Afficher
                          </button>
                        }
                      </td>

                      <td className="pl-5 item-center text-center">
                        {commande.validation_paiement === "En cours" ?
                          <button onClick={()=>{updateValidationPaiement('Validé', commande.id_commande)}} className="py-3 px-7 text-sm leading-none text-gray-700 bg-red-100 rounded focus:outline-none ">
                            En cours
                          </button>
                          :
                          <button  onClick={()=>{updateValidationPaiement('En cours', commande.id_commande)}} className="py-3 px-7 text-sm leading-none text-gray-700 bg-green-100 rounded focus:outline-none ">
                            Validé
                          </button>
                        }
                      </td>

                      <td className="pl-5 ">
                        <div className='text-center'>
                          <button className="focus:ring-2 rounded-md focus:outline-none" onClick={() => { setFormView('update') }} role="button" aria-label="option">
                            <svg className="dropbtn" onClick={() => { setFormView('update'); setCommandeToUpdate(commande) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : <LoadAnimation/>}
                </tbody>
              </table>
              : formView === "add" ? <FormCommandeAdd /> : <FormCommandeUpdate commandeToUpdate={commandeToUpdate} setFormView={() => setFormView()} setRefresh={() => setRefresh(!refresh)} />
            }               
            </div>
        </div>
      </div>
    </>
  )
}

export default ClientCommandes;
