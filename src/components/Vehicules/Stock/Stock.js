import React, { useEffect, useState } from 'react';
import styles from './Stock.module.css';
import axios from 'axios';
import DeleteModal from '../../Elements/DeleteModal/DeleteModal';
import FormVehiculeUpdate from '../../Forms/FormVehiculeUpdate/FormVehiculeUpdate';
import FormVehiculeAdd from '../../Forms/FormVehiculeAdd/FormVehiculeAdd';
import Pagination from '../../Elements/Pagination/Pagination';
import disabled from '../../../images/remove.png';
import characterController from '../../../functions/characterController';
import LoadAnimation from '../../Elements/LoadAnimation/LoadAnimation';


const Stock = (props) => {
  const [vehicules, setVehicules] = useState([]);
  const [formView, setFormView] = useState();
  const [vehiculesToDelete, setVehiculesToDelete] = useState([]);
  const [vehiculeToUpdate, setVehiculeToUpdate] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [confirmDelete, setConfirmeDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pagination, setPagination] = useState(0);
  const [dataPagination, setDataPagination] = useState();
  const [nbrPage, setNbrPage] = useState(1);
  const [filter, setFilter] = useState({ name: "marque" });
  const [noRecords,setNoRecords] = useState(false);
  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    }
  )

  useEffect(() => {
    var data = { filter: "" }
    if (filter.value) {
      if(filter.name==="chassis" || filter.name==="disponible"){
        data.filter = "FIND('" + filter.value + "',{" + filter.name + "})"
      }else {
        data.filter = "FIND('" + characterController(filter.value) + "',{" + filter.name + "})"
      }
    }
    axios.post('https://protected-ravine-10497.herokuapp.com/vehicules/vehicules', data, header).then(
      (response) => {
        setVehicules(response.data)
        setDataPagination()
        if(response.data.length===0){
          setNoRecords(true)
        }
      })
      .catch(error => {
        console.error(error.message)
      });
  }, [vehiculeToUpdate, confirmDelete, refresh])

  // Pagination @@@@
  const chiffreBouclePagination = () => {
    if (!(vehicules.length - pagination < 10)) {
      return 10;
    } else {
      var chiffre = vehicules.length / 10
      return parseInt(chiffre.toString().split('.')[1])
    }
  }

  // Pagination @@@@
  useEffect(() => {
    if (vehicules.length > 0) {
      setNoRecords(false)
      var temp = []
      var records = vehicules
      for (let index = 0; index < chiffreBouclePagination(); index++) {
        temp.push(records[pagination + index])
      }
      setDataPagination(temp)
    }
  }
    , [vehicules, pagination, confirmDelete, vehiculeToUpdate, refresh])


  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // permet d'éviter le bug suivant : la selection d'un checkbox pour supression d'un element ensuite aller au formulaire d'update ou d'ajout et revenir sur la page de supression, l'element que nous avons selectionner au début sera plus selectionner mais on pourra le suprimmer quand même.
  useEffect(() => {
    setVehiculesToDelete([])
  }, [formView])


  // this table contains vehicule row ID'S, we can delete up to 10 recods
  const setAllCheckbox = () => {
    const data = document.getElementsByTagName('input')
    var array = []
    // verifier si nous avons déjà coché des cases.
    if (vehiculesToDelete.length !== 0) {
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
    setVehiculesToDelete(array);
  }

  const selectOneCheckbox = (id_vehicule) => {
    const element = !document.getElementById(id_vehicule).checked;
    // Si il y a des données dans vehiculesToDelete, on les rajoute dans la table.
    if (vehiculesToDelete.length !== 0) {
      var table = vehiculesToDelete
      // Si l'element n'est pas dans le tableau 
      if (table.indexOf(id_vehicule) === -1) {
        table.push(id_vehicule);
        setVehiculesToDelete(table)
      } else {
        // L'element est déjà coché
        setVehiculesToDelete(table.filter(element => element !== id_vehicule));
      }
    } else {
      // Si il  n y a pas de données dans vehiculesToDelete. 
      setVehiculesToDelete([id_vehicule])
    }
  }
  useEffect(() => {
    if (confirmDelete) {
      if (pagination!==0 && dataPagination.length===vehiculesToDelete.length){
        setPagination(pagination - 10);
        setNbrPage(nbrPage - 1)
      }
      vehiculesToDelete.forEach(element => {
        vehiculeDelete(element);
        setShowPopUp(false)
        let table = document.getElementsByTagName("input")
        for (let index = 0; index < table.length; index++) {
          table[index].checked = false;
        }
      });
      setVehiculesToDelete([])
      setConfirmeDelete(false)
    }

  }, [confirmDelete])

  const vehiculeDelete = async (id) => {
    await axios.delete('https://protected-ravine-10497.herokuapp.com/vehicules', {
      data: { id: [id] },
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    }, header).then(
      (response) => {
      })
      .catch(error => {
        console.error(error.message)
      });
  }


  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  const updateDisponibilite = async (state, id) => {
    const data = {
      id: id,
      fields: {
        disponible: state
      }
    }
    await axios.put('https://protected-ravine-10497.herokuapp.com/vehicules', data, header).then(
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
        vehiculesToDelete.length !== 0 ? <DeleteModal confirmDeleteAll={() => setConfirmeDelete(true)} showPopUp={() => setShowPopUp(false)} /> : setShowPopUp(false)
        : ""
      }
      <div className={styles.Content + " sm:px-6 w-full"}>
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p tabIndex="0" className="hidden sm:block focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800" >Les véhicules</p>
            <div className="flex">
              <div className="relative flex items-center text-sm font-medium leading-none text-gray-600 cursor-pointer rounded-xl ">
                <select onChange={(e) => { setFilter({ ...filter, name: e.target.value }) }} name="name" style={{ marginRight: "3px" }} aria-label="select" className="w-full focus-within:text-cyan-400 focus:outline-none bg-transparent border-r border-gray-300 rounded-xl">
                  <option value="marque" className="text-sm text-gray-400">Marque</option>
                  <option value="modele" className="text-sm text-gray-400">Modèle</option>
                  <option value="couleur" className="text-sm text-gray-400">Couleur</option>
                  <option value="chassis" className="text-sm text-gray-400">Châssis</option>
                  <option value="disponible" className="text-sm text-gray-400">Disponibilité</option>
                </select>
              </div>

              {filter.name !== "disponible" 
              ?
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
                  <span onClick={() => { setRefresh(!refresh) }} style={{ cursor: "pointer", marginLeft:"10px"}} className=" left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                    <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                      <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                    </svg>
                  </span>
                  <select onChange={(e) => { setFilter({ ...filter, value: e.target.value }) }} style={{ marginRight: "3px" }} aria-label="select" className="w-full focus-within:text-cyan-400 focus:outline-none bg-transparent border-r border-gray-300 rounded-xl">
                    <option value={""}></option>
                    <option value={"Oui"}>Disponible</option>
                    <option value={"Non"}>Indisponible</option>
                  </select>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center ">
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
                  <button onClick={() => { setFormView();; setRefresh(!refresh) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                    <p className="text-sm font-medium leading-none text-white">Retour</p>
                  </button>
                }
              </a>
              <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"  >
                <button onClick={() => { setFormView('add') }} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Ajouter</p>
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
                    <th scope="col">Véhicule</th>
                    <th scope="col">F.Technique</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Châssis</th>
                    <th scope="col">Date</th>
                    <th scope="col">Expédition</th>
                    <th scope="col">Commande</th>


                  </tr>
                </thead>
                <tbody>
                  <tr className="h-3"></tr>
                  {dataPagination ? dataPagination.map((vehicule, key) => (
                    <tr key={key} tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
                      <td>

                        {!vehicule.commande ?
                          <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                            <input type="checkbox" onClick={() => selectOneCheckbox(vehicule.id_vehicule)} id={vehicule.id_vehicule} value={vehicule.id_vehicule} name={vehicule.id_vehicule} className="checkbox" />
                          </div>
                          :
                          <div className="rounded-sm w-5 h-5 flex flex-shrink-0 justify-center item-center  text-center ">
                            <img src={disabled}></img>
                          </div>
                        }
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {vehicule.marque + " " + vehicule.modele + " " + vehicule.couleur + " " + vehicule.finition}
                          </p>
                        </div>
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {vehicule.carburant + " " + vehicule.motorisation + " " + vehicule.transmission}
                          </p>
                        </div>
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {vehicule.prix_vehicule + "€ + " + vehicule.prix_livraison + "€"}
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          {vehicule.chassis}
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {vehicule.date_vehicule}
                          </p>
                        </div>
                      </td>
                      <td className="pl-5 item-center text-center">
                        {vehicule.disponible === "Oui" ? <button onClick={() => { updateDisponibilite("Non", vehicule.id_vehicule) }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-green-100 rounded focus:outline-none">
                          Prête
                        </button> : ""}
                        {vehicule.disponible === "Non" ? <button onClick={() => { updateDisponibilite("Oui", vehicule.id_vehicule) }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-red-100 rounded focus:outline-none">
                          En cours
                        </button> : ""}

                      </td>
                      <td className="pl-5 item-center text-center">
                      {vehicule.commande ?
                          <button onClick={() => { props.setView(); props.setVehicule(vehicule); }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-yellow-100 rounded focus:outline-none ">
                            Afficher
                          </button>
                          :
                          <button className="py-3 px-7 text-sm leading-none text-gray-700 bg-gray-100 rounded focus:outline-none ">
                            Aucune
                          </button>
                      }
                      </td>
                     
                      <td className="pl-5 ">
                        <div className='text-center'>
                          <button className="focus:ring-2 rounded-md focus:outline-none" onClick={() => { setFormView('update') }} role="button" aria-label="option">
                            <svg className="dropbtn" onClick={() => { setFormView('update'); setVehiculeToUpdate(vehicule) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )): !noRecords ? <LoadAnimation/> : <tr><td>Pas de ventes</td></tr>}
                </tbody>
              </table>
              :
              formView === "add" ? <FormVehiculeAdd setFormView={() => setFormView()} setRefresh={() => setRefresh(!refresh)} /> : <FormVehiculeUpdate vehiculeToUpdate={vehiculeToUpdate} setFormView={() => setFormView()} setRefresh={() => setRefresh(!refresh)} />
            }

          </div>
          {!formView ?
            vehicules.length > 10 && <Pagination nbrPage={nbrPage} dataLength={dataPagination && dataPagination.length} pagination={pagination} moins={() => { setPagination(pagination - 10); setNbrPage(nbrPage - 1) }} plus={() => { setPagination(pagination + 10); setNbrPage(nbrPage + 1) }}></Pagination>
            : ""}
        </div>
      </div>
    </>
  )
}

export default Stock;
