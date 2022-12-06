import React, { useEffect, useState } from 'react';
import styles from './Suivis.module.css';
import axios from 'axios';
import DeleteModal from '../../Elements/DeleteModal/DeleteModal';
import VehiculeTitle from '../../Vehicules/VehiculeTitle/VehiculeTitle';
import FormSuivisUpdate from '../../Forms/FormSuivisUpdate/FormSuivisUpdate';
import ClientFullName from '../../Clients/ClientName/ClientFullName';
import Pagination from '../../Elements/Pagination/Pagination';
import LoadAnimation from '../../Elements/LoadAnimation/LoadAnimation';

const Suivis = (props) => {
  const [commandes, setCommandes] = useState(false);
  const [formView, setFormView] = useState();
  const [commandeToUpdate, setCommandeToUpdate] = useState();
  const [commandesToDelete, setCommandesToDelete] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [confirmDelete, setConfirmeDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pagination, setPagination] = useState(0);
  const [dataPagination, setDataPagination] = useState();
  const [nbrPage, setNbrPage] = useState(1);
  const [filter, setFilter] = useState({ name: "date_depart" });
  const [vehicules, setVehicules] = useState();
  const [clients, setClients] = useState();
  const [noRecords,setNoRecords] = useState(false);
  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    })


  // Pagination @@@@
  const chiffreBouclePagination = () => {
    if (!(commandes.length - pagination < 10)) {
      return 10;
    } else {
      var chiffre = commandes.length / 10
      return parseInt(chiffre.toString().split('.')[1])
    }
  }
  // Pagination @@@@
  useEffect(() => {
    if (commandes.length > 0) {
      setNoRecords(false)
      var temp = []
      var records = commandes
      for (let index = 0; index < chiffreBouclePagination(); index++) {
        temp.push(records[pagination + index])
      }
      setDataPagination(temp)
    }
  }
    , [commandes, pagination, confirmDelete, commandeToUpdate, refresh])

  useEffect(() => {
    var data = { filter: 'AND( SEARCH("Validé", {validation_paiement}), SEARCH("En cours", {recuperer_livraison})' }
    if (filter.value) {
      data.filter += ", FIND('" + filter.value + "',{" + filter.name + "})"
    }
    data.filter += ')'
    axios.post('https://protected-ravine-10497.herokuapp.com/commandes/commandes', data, header).then(
      (response) => {
        setCommandes(response.data)
        setDataPagination()
        if(response.data.length===0){
          setNoRecords(true)
        }
      })
      .catch(error => {
        console.error(error.message)
      });

  }, [commandeToUpdate, confirmDelete, refresh]
  )

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
      if (pagination!==0 && dataPagination.length===commandesToDelete.length){
        setPagination(pagination - 10);
        setNbrPage(nbrPage - 1)
      }
      commandesToDelete.forEach(element => {
        commandeDelete(element);
        setShowPopUp(false)
        let table = document.getElementsByTagName("input")
        for (let index = 0; index < table.length; index++) {
          table[index].checked = false;
        }
      });
      setCommandesToDelete([])
      setConfirmeDelete(false)
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
            <p tabIndex="0" className="hidden sm:block focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800" >Le suivis des vehicules </p>
            <div className="flex">
              <div className="relative flex items-center text-sm font-medium leading-none text-gray-600 cursor-pointer rounded-xl ">
                <select onChange={(e) => { setFilter({ ...filter, name: e.target.value }) }} style={{ marginRight: "3px" }} aria-label="select" className="w-full focus-within:text-cyan-400 focus:outline-none bg-transparent border-r border-gray-300 rounded-xl">
                  <option value="date_depart" className="text-sm text-gray-400">Date du départ</option>
                  <option value="date_commande" className="text-sm text-gray-400">Date d'achat</option>
                  <option value="destination_port" className="text-sm text-gray-400">Ports</option>
                  <option value="id_vehicule" className="text-sm text-gray-400">Véhicules</option>
                  <option value="id_client" className="text-sm text-gray-400">Clients</option>
                  <option value="numero_bon_commande" className="text-sm text-gray-400">Bon de commande</option>
                </select>
              </div>
              {filter.name !== "id_client" && filter.name !== "id_vehicule" && filter.name !== "destination_port" ?
                <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                  <span onClick={() => { setRefresh(!refresh) }} style={{ cursor: "pointer" }} className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                    <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                      <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                    </svg>
                  </span>
                  <input onChange={(e) => { setFilter({ ...filter, value: e.target.value }) }} type={filter.name === "date_depart" ||filter.name == "date_commande" ? "date" : "search"} name="leadingIcon" id="leadingIcon" placeholder="Search here" className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
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
                    {filter.name === "id_client" &&
                      clients && clients.map((client, key) => {
                        return (<option key={key} value={client.id_client_incremented}>{client.prenom_client + ' ' + client.nom_client}</option>)
                      })
                    }
                    {filter.name === "id_vehicule" &&
                      vehicules && vehicules.map((vehicule, key) => {
                        return (<option key={key} value={vehicule.id_vehicule_incremented}>{vehicule.marque + ' ' + vehicule.modele + ' ' + vehicule.couleur + ' (' + vehicule.chassis.charAt(vehicule.chassis.length - 4) + vehicule.chassis.charAt(vehicule.chassis.length - 3) + vehicule.chassis.charAt(vehicule.chassis.length - 2) + vehicule.chassis.charAt(vehicule.chassis.length - 1) + ')'}</option>)
                      })
                    }
                    {filter.name === "destination_port" &&
                      <>
                        <option value={"Alger"}>Alger</option>
                        <option value={"Djendjen"}>Djendjen</option>
                        <option value={"Mostaganem"}>Mostaganem</option>
                        <option value={"Skikda"}>Skikda</option>
                      </>
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
              {!formView ?
                <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-red-800 ml-4 sm:ml-8"  >
                  <button onClick={() => { setShowPopUp(true) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                    <p className="text-sm font-medium leading-none text-white">Supprimer</p>
                  </button>
                </a>
                :
                <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-red-800 ml-4 sm:ml-8"  >
                  <button onClick={() => { setFormView(); setRefresh(!refresh) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                    <p className="text-sm font-medium leading-none text-white">Retour</p>
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
                    <th scope="col">Véhicule </th>
                    <th scope="col">Client</th>
                    <th scope="col">Commande</th>
                    <th scope="col">Date départ</th>
                    <th scope="col">Emplacement</th>
                    <th scope="col">Destination</th>
                    <th scope="col">Imprévu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-3"></tr>
                  {dataPagination ? dataPagination.map((commande, key) => (
                    <tr key={key} tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
                      <td>
                        <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center  text-center ">
                          <input type="checkbox" onClick={() => selectOneCheckbox(commande.id_commande)} id={commande.id_commande} value={commande.id_commande} name={commande.id_commande} className="checkbox" />
                        </div>
                      </td>
                      {
                        commande.id_vehicule ?
                          <td className="">
                            <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                              <div onClick={() => { props.showVehicule(); props.dataVehicule(commande.id_vehicule) }}><VehiculeTitle id_vehicule={commande.id_vehicule}></VehiculeTitle>     </div>
                            </div>
                          </td>
                          :
                          <td className="pl-5 item-center text-center">
                            <button className="py-3 px-7 text-sm leading-none text-gray-700 bg-gray-100 rounded focus:outline-none ">
                              Supprimé
                            </button>
                          </td>
                      }
                      {commande.id_client ?
                        <td className="">
                          <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                            <div onClick={() => { props.showClient(); props.dataClient(commande.id_client) }}><ClientFullName id_client={commande.id_client} /> </div>
                          </div>
                        </td>
                        :
                        <td className="pl-5 item-center text-center">
                          <button className="py-3 px-7 text-sm leading-none text-gray-700 bg-gray-100 rounded focus:outline-none ">
                            Supprimé
                          </button>
                        </td>
                      }
                      <td className="pl-5 item-center text-center">
                        <button onClick={() => { props.showCommande(); props.dataCommande(commande.id_commande) }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-yellow-100 rounded focus:outline-none ">
                          Afficher
                        </button>
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {commande.date_depart}
                          </p>
                        </div>
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {commande.statut_livraison}
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
                      <td className="pl-5 item-center text-center">
                        {!commande.imprevu_livraison ?
                          <button className="py-3 px-7 text-sm leading-none text-gray-700 bg-gray-100 rounded focus:outline-none ">
                            Aucun
                          </button>
                          :
                          <button onClick={() => { props.showImprevu(); props.dataImprevu(commande.imprevu_livraison) }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-yellow-100 rounded focus:outline-none ">
                            Imprévu
                          </button>
                        }
                      </td>

                      <td className="pl-5 ">
                        <div className='text-center'>
                          <button className="focus:ring-2 rounded-md focus:outline-none" onClick={() => { setFormView("update") }} role="button" aria-label="option">
                            <svg className="dropbtn" onClick={() => { setFormView("update"); setCommandeToUpdate(commande) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )): !noRecords ? <LoadAnimation/> : <tr><td>Pas de suivis en cours</td></tr>}
                </tbody>
              </table>
              :
              commandeToUpdate && <FormSuivisUpdate suivisToUpdate={commandeToUpdate} setFormView={() => setFormView()} setRefresh={() => setRefresh(!refresh)} />
            }
          </div>
          {!formView ?
            commandes.length > 10 && <Pagination nbrPage={nbrPage} dataLength={dataPagination && dataPagination.length} pagination={pagination} moins={() => { setPagination(pagination - 10); setNbrPage(nbrPage - 1) }} plus={() => { setPagination(pagination + 10); setNbrPage(nbrPage + 1) }}></Pagination>
            : ""}
        </div>
      </div>
    </>
  );
}

export default Suivis;
