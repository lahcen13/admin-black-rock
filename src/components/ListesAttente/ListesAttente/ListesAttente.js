import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteModal from '../../Elements/DeleteModal/DeleteModal';
import LoadAnimation from '../../Elements/LoadAnimation/LoadAnimation';
import MailModal from '../../Elements/MailingModal/MailingModal'
import Pagination from '../../Elements/Pagination/Pagination';
import SuccessModal from '../../Elements/SuccessModal/SuccessModal';
import styles from './ListesAttente.module.css';
import formatDate from '../../../functions/formatDate'


const ListesAttente = (props) => {
  const [listes, setlistes] = useState([]);
  const [vehicules, setVehicules] = useState([]);
  const [idsVehica, setidsVehica] = useState([]);
  const [showMailingCampagne, setShowMailingCampagne] = useState(false)
  const [formView, setFormView] = useState();
  const [listesToDelete, setlistesToDelete] = useState([]);
  const [listeToUpdate, setlisteToUpdate] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showMailModal, setShowMailModal] = useState(false);
  const [confirmDelete, setConfirmeDelete] = useState(false);
  const [confirmMailing, setConfirmMailing] = useState();
  const [refresh, setRefresh] = useState(false);
  const [pagination, setPagination] = useState(0);
  const [dataPagination, setDataPagination] = useState();
  const [nbrPage, setNbrPage] = useState(1);
  const [successMailing, setSuccessMailing] = useState(false)
  const [filter, setFilter] = useState({ name: "id_vehica" });
 

  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    }
  )

  useEffect(() => {
    var data = { filter: "" }
    data.filter = "FIND('" + props.idVehica + "',{id_vehica})"
    axios.post('https://protected-ravine-10497.herokuapp.com/listesattente/listesattente', data, header).then(
      (response) => {
        setlistes(response.data)
        setDataPagination()
      })
      .catch(error => {
        console.error(error.message)
      });
  }, [listeToUpdate, confirmDelete, refresh])

  // Pagination @@@@
  const chiffreBouclePagination = () => {
    if (!(listes.length - pagination < 10)) {
      return 10;
    } else {
      var chiffre = listes.length / 10
      return parseInt(chiffre.toString().split('.')[1])
    }
  }

  // Pagination @@@@
  useEffect(() => {
    if (listes.length > 0) {
      var temp = []
      var records = listes
      for (let index = 0; index < chiffreBouclePagination(); index++) {
        temp.push(records[pagination + index])
      }
      setDataPagination(temp)
    }
  }
    , [listes, pagination, confirmDelete, listeToUpdate, refresh])


  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // permet d'éviter le bug suivant : la selection d'un checkbox pour supression d'un element ensuite aller au formulaire d'update ou d'ajout et revenir sur la page de supression, l'element que nous avons selectionner au début sera plus selectionner mais on pourra le suprimmer quand même.
  useEffect(() => {
    setlistesToDelete([])
  }
    , [formView])

  // this table contains liste row ID'S, we can delete up to 10 recods
  const setAllCheckbox = () => {
    const data = document.getElementsByTagName('input')
    var array = []
    // verifier si nous avons déjà coché des cases.
    if (listesToDelete.length !== 0) {
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
    setlistesToDelete(array);
  }

  const selectOneCheckbox = (id_liste) => {
    const element = !document.getElementById(id_liste).checked;
    // Si il y a des données dans listesToDelete, on les rajoute dans la table.
    if (listesToDelete.length !== 0) {
      var table = listesToDelete
      // Si l'element n'est pas dans le tableau 
      if (table.indexOf(id_liste) === -1) {
        table.push(id_liste);
        setlistesToDelete(table)
      } else {
        // L'element est déjà coché
        setlistesToDelete(table.filter(element => element !== id_liste));
      }
    } else {
      // Si il  n y a pas de données dans listesToDelete. 
      setlistesToDelete([id_liste])
    }
  }

  useEffect(() => {
    if (confirmDelete) {
      if (pagination !== 0 && dataPagination.length === listesToDelete.length) {
        setPagination(pagination - 10);
        setNbrPage(nbrPage - 1)
      }
      listesToDelete.forEach(element => {
        listeDelete(element);
        setShowPopUp(false)
        let table = document.getElementsByTagName("input")
        for (let index = 0; index < table.length; index++) {
          table[index].checked = false;
        }
      });
      setlistesToDelete([])
      setConfirmeDelete(false)
    }
    if (confirmMailing) {
      campagneMailing()
    }

  }, [confirmDelete, confirmMailing])

  const listeDelete = async (id) => {
    await axios.delete('https://protected-ravine-10497.herokuapp.com/listesattente', {
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

  const collectionVehicule = (data) => {
    let tableRef = []
    let tableVehicule = []
    data.forEach(element => {
      if (tableRef.indexOf(element.id_vehica) === -1) {
        tableRef.push(element.id_vehica)
        tableVehicule.push(element.vehicule + " " + "(" + element.id_vehica + ")")
      }
    });
    setVehicules(tableVehicule)
    setidsVehica(tableRef)
  }

  useEffect(() => {
    axios.post('https://protected-ravine-10497.herokuapp.com/listesattente/listesattente', { filter: "" }, header).then(
      (response) => {
        collectionVehicule(response.data)
      })
      .catch(error => {
        console.error(error.message)
      });
  }, [refresh]
  )

  const campagneMailing = async () => {
    await listes.forEach(async (client) => {
      let data = {
        email: [{ email: client.email }],
        vehicule: {
          vehicule: client.vehicule,
          marque: client.marque,
          modele: client.modele,
          couleur: client.couleur,
          transmission: client.transmission,
          prix: client.prix,
          urlImg: client.urlImg,
          urlSite: client.urlSite,
          id_vehica: client.id_vehica,
          email: client.email
        }
      }
      await axios.post('https://protected-ravine-10497.herokuapp.com/listesattente/mail', data, header).then(
        (response) => {
          setSuccessMailing(true)
        })
        .catch(error => {
          setSuccessMailing(false)
          console.error(error.message)
        });
    });
    setConfirmMailing(false);
    setShowMailModal(false);
  }

  return (
    <>
      {showPopUp
        ?
        listesToDelete.length > 0 ? <DeleteModal confirmDeleteAll={() => setConfirmeDelete(true)} showPopUp={() => setShowPopUp(false)} /> : setShowPopUp(false)
        : ""
      }
      {showMailModal && listes.length > 0 ? <MailModal confirmMailing={() => setConfirmMailing(true)} showMailModal={() => setShowMailModal(false)} nombreEmails={listes.length} /> : ""}
      <div className={styles.Content + " sm:px-6 w-full"}>
        {successMailing && <SuccessModal />}
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
                <button onClick={() => { setShowPopUp(true) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Supprimer</p>
                </button>


              </a>
              <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"  >
                <button onClick={() => { props.setView(); }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Retour</p>
                </button>
              </a>
              <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"  >
                <button onClick={() => { setShowMailModal(true) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Campagne Mailing</p>
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
                    <th scope="col">Réf* Vehica</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Véhicule</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-3"></tr>
                  {dataPagination !== undefined ? dataPagination.map((liste, key) => (
                    <tr key={key} tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
                      <td>
                        <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                          <input type="checkbox" onClick={() => selectOneCheckbox(liste.id)} id={liste.id} value={liste.id} name={liste.id} className="checkbox" />
                        </div>
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {liste.id_vehica}
                          </p>
                        </div>
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {liste.email}
                          </p>
                        </div>
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {liste.vehicule}
                          </p>
                        </div>
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                          <p>
                            {formatDate(liste.date)}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )) : <LoadAnimation/>
                    }
                </tbody>
              </table>
              :
              formView === "add" ? <FormlisteAdd setFormView={() => setFormView()} setRefresh={() => setRefresh(!refresh)} /> : <FormlisteUpdate listeToUpdate={listeToUpdate} setFormView={() => setFormView()} setRefresh={() => setRefresh(!refresh)} />
            }

          </div>
          {!formView ?
            listes.length > 10 && <Pagination nbrPage={nbrPage} dataLength={dataPagination && dataPagination.length} pagination={pagination} moins={() => { setPagination(pagination - 10); setNbrPage(nbrPage - 1) }} plus={() => { setPagination(pagination + 10); setNbrPage(nbrPage + 1) }}></Pagination>
            : ""}
        </div>
      </div>
    </>
  )
}

export default ListesAttente;
