import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteModal from '../../Elements/DeleteModal/DeleteModal';
import styles from './Demandes.module.css';
import FormDemandeUpdate from '../../Forms/FormDemandeUpdate/FormDemandeUpdate';
import VehiculeTitle from '../../Vehicules/VehiculeTitle/VehiculeTitle'
import ClientFullName from '../../Clients/ClientName/ClientFullName';
import Pagination from '../../Elements/Pagination/Pagination';
import characterController from '../../../functions/characterController.js'
import LoadAnimation from '../../Elements/LoadAnimation/LoadAnimation';


const Demandes = (props) => {
  const [demandes, setDemandes] = useState([]);
  const [formView, setFormView] = useState();
  const [demandeToUpdate, setDemandeToUpdate] = useState();
  const [demandesToDelete, setDemandesToDelete] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [confirmDelete, setConfirmeDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [typeDemande, setTypeDemande] = useState(sessionStorage.getItem('demande') ? sessionStorage.getItem('demande') : 'En cours'); // nous permet de switcher entre les demandes en cours & traité
  const [pagination, setPagination] = useState(0);
  const [dataPagination, setDataPagination] = useState();
  const [nbrPage, setNbrPage] = useState(1);
  const [filter, setFilter] = useState({ name: "date_demande" });
  const [vehicules, setVehicules] = useState();
  const [clients, setClients] = useState();
  const [noRecords,setNoRecords] = useState(false); // Elle affiche comme quoi il n y a pas de records 

  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    })

  // Pagination @@@@
  const chiffreBouclePagination = () => {
    if (!(demandes.length - pagination < 10)) {
      return 10;
    } else {
      var chiffre = demandes.length / 10
      return parseInt(chiffre.toString().split('.')[1])
    }
  }
  // Pagination @@@@
  useEffect(() => {
    if (demandes.length > 0) {
      setNoRecords(false)
      var temp = []
      var records = demandes
      for (let index = 0; index < chiffreBouclePagination(); index++) {
        temp.push(records[pagination + index])
      }
      setDataPagination(temp)
    }
  }
    , [demandes, pagination, confirmDelete, demandeToUpdate, refresh])

  useEffect(() => {
    axios.post('https://protected-ravine-10497.herokuapp.com/vehicules/vehicules', { filter: "" }, header).then(
      (response) => {
        setVehicules(response.data);
      })
      .catch(error => {
        console.error(error.message)
      });
    axios.post('https://protected-ravine-10497.herokuapp.com/clients/clients', { filter: "" }, header).then(
      (response) => {
        setClients(response.data)
      })
      .catch(error => {
        console.error(error.message)
      });
  }, [])

  useEffect(() => {
    var data = {}
    if (typeDemande === "En cours") {
      data.filter = 'AND( SEARCH( "En cours", {statut_demande})'
      if (filter.value) {
        if (filter.name === "prenom_prospect" || filter.name === "nom_prospect" || filter.name === "telephone_prospect" || filter.name === "email_prospect") {
          data.filter += ", FIND('" + characterController(filter.value) + "',{" + filter.name + "})"
        } else {
          data.filter += ", FIND('" + filter.value + "',{" + filter.name + "})"
        }
      }
      data.filter += ')'
      axios.post('https://protected-ravine-10497.herokuapp.com/demandes/demandes', data, header).then(
        (response) => {
          setDataPagination()
       
          if(response.data.length===0){
            setNoRecords(true)
          }
          if (response.data.length !== 0) {
            setDemandes(response.data)
          } else {
            if (filter && filter.value) {
              data.filter = "AND( SEARCH( 'En cours', {statut_demande}), FIND(TRIM('" + filter.value.charAt(0).toLowerCase() + filter.value.slice(1).toLowerCase() + "'),{" + filter.name + "}))"
              axios.post('https://protected-ravine-10497.herokuapp.com/demandes/demandes', data, header).then(
                (response) => {
                  setDemandes(response.data)
                  if(response.data.length===0){
                    setNoRecords(true)
                  }
                }).catch(error => {
                  console.error(error.message)
                });
            }
          }
        })
        .catch(error => {
          console.error(error.message)
        });
    } else {
      data.filter = 'AND( SEARCH("Terminé", {statut_demande})'
      if (filter.value) {
        if (filter.name === "prenom_prospect" || filter.name === "nom_prospect" || filter.name === "telephone_prospect" || filter.name === "email_prospect") {
          data.filter += ", FIND('" + characterController(filter.value) + "',{" + filter.name + "})"
        } else {
          data.filter += ", FIND('" + filter.value + "',{" + filter.name + "})"
        }
      }
      data.filter += ')'
      axios.post('https://protected-ravine-10497.herokuapp.com/demandes/demandes', data, header).then(
        (response) => {
          setDataPagination()
          setDemandes(response.data)
          if(response.data.length===0){
            setNoRecords(true)
          }
        })
        .catch(error => {
          console.error(error.message)
        });
    }
  }, [demandeToUpdate, confirmDelete, refresh])



  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  // permet d'éviter le bug suivant : la selection d'un checkbox pour supression d'un element ensuite aller au formulaire d'update ou d'ajout et revenir sur la page de supression, l'element que nous avons selectionner au début sera plus selectionner mais on pourra le suprimmer quand même.
  useEffect(() => {
    setDemandesToDelete([])
    var data = document.getElementsByTagName('input')
    for (let index = 0; index < data.length; index++) {
      if (data[index].type === "checkbox") {
        data[index].checked = false;
      }
    }
  }, [formView, typeDemande])


  // this table contains vehicule row ID'S, we can delete up to 10 recods
  const setAllCheckbox = () => {
    const data = document.getElementsByTagName('input')
    var array = []

    // verifier si nous avons déjà coché des cases.
    if (demandesToDelete.length !== 0) {
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
    setDemandesToDelete(array);
  }

  const selectOneCheckbox = (id_commande) => {
    const element = !document.getElementById(id_commande).checked;
    // Si il y a des données dans vehiculesToDelete, on les rajoute dans la variable table
    if (demandesToDelete.length !== 0) {
      var table = demandesToDelete
      // Si l'element n'est pas dans le tableau 
      if (table.indexOf(id_commande) === -1) {
        table.push(id_commande);
        setDemandesToDelete(table)
      } else {
        // L'element est déjà coché
        setDemandesToDelete(table.filter(element => element !== id_commande));
      }
    } else {
      // Si il  n y a pas de données dans vehiculesToDelete. 
      setDemandesToDelete([id_commande])
    }
  }

  useEffect(() => {
    if (confirmDelete) {
      if (pagination !== 0 && dataPagination.length === demandesToDelete.length) {
        setPagination(pagination - 10);
        setNbrPage(nbrPage - 1)
      }
      demandesToDelete.forEach(element => {
        demandeDelete(element);
        setShowPopUp(false)
        let table = document.getElementsByTagName("input")
        for (let index = 0; index < table.length; index++) {
          table[index].checked = false;
        }
      });
      setDemandesToDelete([])
      setConfirmeDelete(false)
    }

  }, [confirmDelete])


  const demandeDelete = async (id) => {
    await axios.delete('https://protected-ravine-10497.herokuapp.com/demandes', {
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

  const updateDemande = async (state, id) => {
    const data = {
      id: id,
      fields: {
        statut_demande: state
      }
    }
    await axios.put('https://protected-ravine-10497.herokuapp.com/demandes', data, header).then(
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
        demandesToDelete.length !== 0 ? <DeleteModal confirmDeleteAll={() => setConfirmeDelete(true)} showPopUp={() => setShowPopUp(false)} /> : setShowPopUp(false)
        : ""
      }
      <div className={styles.Content + " sm:px-6 w-full"}>
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            {typeDemande === "En cours" ?
              <p tabIndex="0" className="hidden sm:block focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Les demandes en cours.</p>
              :
              <p tabIndex="0" className="hidden sm:block focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Les demandes traités.</p>

            }
            <div className="flex">
              <div className="relative flex items-center text-sm font-medium leading-none text-gray-600 cursor-pointer rounded-xl ">
                <select onChange={(e) => { setFilter({ ...filter, name: e.target.value }) }} style={{ marginRight: "3px" }} aria-label="select" className="w-full focus-within:text-cyan-400 focus:outline-none bg-transparent border-r border-gray-300 rounded-xl">
                  <option value="date_demande" className="text-sm text-gray-400">Date</option>
                  <option value="prenom_prospect" className="text-sm text-gray-400">Prénom prospect</option>
                  <option value="nom_prospect" className="text-sm text-gray-400">Nom prospect</option>
                  <option value="telephone_prospect" className="text-sm text-gray-400">Téléphone prospect</option>
                  <option value="email_prospect" className="text-sm text-gray-400">Mail prospect</option>
                  <option value="id_vehicule" className="text-sm text-gray-400">Véhicules</option>
                  <option value="id_client" className="text-sm text-gray-400">Clients</option>
                </select>
              </div>

              {filter.name !== "id_client" && filter.name !== "id_vehicule" ?
                <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                  <span onClick={() => { setRefresh(!refresh) }} style={{ cursor: "pointer" }} className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                    <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                      <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                    </svg>
                  </span>
                  <input onChange={(e) => { setFilter({ ...filter, value: e.target.value }) }} type={filter.name === "date_demande" ? "date" : "search"} name="leadingIcon" id="leadingIcon" placeholder="Search here" className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
                </div>
                :
                <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400 ">
                  <span onClick={() => { setRefresh(!refresh) }} style={{ cursor: "pointer", marginLeft: "10px" }} className=" left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                    <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                      <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                    </svg>
                  </span>
                  <select onChange={(e) => { setFilter({ ...filter, value: e.target.value }) }} style={{ marginRight: "3px" }} aria-label="select" className="w-full focus-within:text-cyan-400 focus:outline-none bg-transparent border-r border-gray-300 rounded-xl">
                    <option value={""}></option>
                    {filter.name === "id_client" ?
                      clients && clients.map((client, key) => {
                        return (<option key={key} value={client.id_client_incremented}>{client.prenom_client + ' ' + client.nom_client}</option>)
                      }) :
                      vehicules && vehicules.map((vehicule, key) => {
                        return (<option key={key} value={vehicule.id_vehicule_incremented}>{vehicule.marque + ' ' + vehicule.modele + ' ' + vehicule.couleur + ' (' + vehicule.chassis.charAt(vehicule.chassis.length - 4) + vehicule.chassis.charAt(vehicule.chassis.length - 3) + vehicule.chassis.charAt(vehicule.chassis.length - 2) + vehicule.chassis.charAt(vehicule.chassis.length - 1) + ')'}</option>)
                      })
                    }
                  </select>
                </div>
              }

            </div>
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
              <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-red-800 ml-4 sm:ml-8"  >
                {!formView ? <button onClick={() => { setShowPopUp(true) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Supprimer</p>
                </button> :
                  <button onClick={() => { setFormView(); setRefresh(!refresh) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                    <p className="text-sm font-medium leading-none text-white">Retour</p>
                  </button>
                }
              </a>

              {
                typeDemande === "En cours" ?
                  formView !== "update" &&
                  <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"  >
                    <button onClick={() => { setTypeDemande('Terminé'); setRefresh(!refresh); sessionStorage.setItem('demande', 'Terminé'); setNbrPage(1); setPagination(0) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                      <p className="text-sm font-medium leading-none text-white">Voir les demandes (traités).</p>
                    </button>
                  </a>
                  :
                  formView !== "update" &&
                  <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"  >
                    <button onClick={() => { setTypeDemande('En cours'); setRefresh(!refresh); sessionStorage.setItem('demande', 'En cours'); setNbrPage(1); setPagination(0) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                      <p className="text-sm font-medium leading-none text-white">Voir les demandes (en cours).</p>
                    </button>
                  </a>
              }


            </div>
          </div>
          <div className="mt-7 overflow-x-auto">
            {!formView ?
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr>
                    <th>Choisir</th>
                    <th scope="col">Client</th>
                    <th scope="col">Vehicule</th>
                    <th scrop="col">Date</th>
                    <th scope="col">Demande</th>
                    <th scope="col">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-3"></tr>
                  {dataPagination ? dataPagination.map((demande, key) => (
                    <tr key={key} tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
                      <td>
                        <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center item-center  text-center ">
                          <input type="checkbox" onClick={() => selectOneCheckbox(demande.id_demande && demande.id_demande)} id={demande.id_demande && demande.id_demande} value={demande.id_demande && demande.id_demande} name={demande.id_demande && demande.id_demande} className="checkbox" />
                        </div>
                      </td>
                      {demande.id_client
                        ?
                        <td className="">
                          <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                            <div onClick={() => { props.showClient(); props.dataClient(demande.id_client) }}> <ClientFullName id_client={demande.id_client} /></div>
                          </div>
                        </td> :
                        demande.prenom_prospect && demande.nom_prospect ?
                          <td>
                            <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                              <button onClick={() => { props.showProspect(); props.dataProspect(demande) }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-yellow-100 rounded focus:outline-none ">
                                {demande.prenom_prospect + " " + demande.nom_prospect + " (Prospect) "}
                              </button>
                            </div>
                          </td>
                          :
                          <td className="pl-5 item-center text-center">
                            <button className="py-3 px-7 text-sm leading-none text-gray-700 bg-gray-100 rounded focus:outline-none ">
                              Supprimé
                            </button>
                          </td>
                      }
                      {demande.id_vehicule
                        ?
                        <td className="">
                          <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                            <div onClick={() => { props.showVehicule(); props.dataVehicule(demande.id_vehicule) }}><VehiculeTitle id_vehicule={demande.id_vehicule} /> </div>
                          </div>
                        </td> :
                        <td>
                          <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                            <button className="py-3 px-7 text-sm leading-none text-gray-700 bg-gray-100 rounded focus:outline-none ">
                              Non concerné
                            </button>
                          </div>
                        </td>
                      }
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {demande.date_demande}
                          </p>
                        </div>
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          {demande.demande &&
                            <button onClick={() => { props.showDemande(); props.dataDemande(demande.demande) }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-yellow-100 rounded focus:outline-none ">
                              Afficher
                            </button>
                          }
                        </div>
                      </td>
                      <td className="pl-5 item-center text-center">
                        {typeDemande === "En cours" ?
                          <button onClick={() => { updateDemande('Terminé', demande.id_demande) }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-red-100 rounded focus:outline-none ">
                            En cours
                          </button>
                          :
                          <button onClick={() => { updateDemande('En cours', demande.id_demande) }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-green-100 rounded focus:outline-none ">
                            Traité
                          </button>
                        }
                      </td>
                      <td className="pl-5 ">
                        <div className='text-center'>
                          <button className="focus:ring-2 rounded-md focus:outline-none" onClick={() => { setFormView('update') }} role="button" aria-label="option">
                            <svg className="dropbtn" onClick={() => { setFormView('update'); setDemandeToUpdate(demande) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                    :  !noRecords ? <LoadAnimation /> :  typeDemande === "En cours" ? <tr><td>Pas de demandes en cours</td></tr> :  <tr><td>Pas de demandes traitées</td></tr>
                  }
                </tbody>
              </table>
              : typeDemande === "En cours" ?
                <FormDemandeUpdate statut={"En cours"} demandeToUpdate={demandeToUpdate} setFormView={() => setFormView()} setRefresh={() => setRefresh(!refresh)} />
                :
                <FormDemandeUpdate statut={"Terminé"} demandeToUpdate={demandeToUpdate} setFormView={() => setFormView()} setRefresh={() => setRefresh(!refresh)} />
            }
          </div>
          {!formView ?
            demandes.length > 10 && <Pagination nbrPage={nbrPage} dataLength={dataPagination && dataPagination.length} pagination={pagination} moins={() => { setPagination(pagination - 10); setNbrPage(nbrPage - 1) }} plus={() => { setPagination(pagination + 10); setNbrPage(nbrPage + 1) }}></Pagination>
            : ""}
        </div>
      </div>
    </>
  )
}

export default Demandes;
