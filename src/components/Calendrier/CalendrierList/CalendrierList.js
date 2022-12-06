import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteModal from '../../Elements/DeleteModal/DeleteModal';
import Pagination from '../../Elements/Pagination/Pagination';
import formatDate from '../../../functions/formatDate.js'


const calendrierList = (props) => {
  const [calendrier, setCalendrier] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [confirmDelete, setConfirmeDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pagination, setPagination] = useState(0);
  const [dataPagination, setDataPagination] = useState();
  const [nbrPage, setNbrPage] = useState(1);
  const [calendriersToDelete, setCalendriersToDelete] = useState([]);

  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    }
  )

  useEffect(() => {
    axios.get('https://protected-ravine-10497.herokuapp.com/evenements', header, header).then(
      (response) => {
        setCalendrier(response.data)
        setDataPagination()
      })
      .catch(error => {
        console.error(error.message)
      });
  }, [confirmDelete, refresh])

  // Pagination @@@@
  const chiffreBouclePagination = () => {
    if (!(calendrier.length - pagination < 10)) {
      return 10;
    } else {
      var chiffre = calendrier.length / 10
      return parseInt(chiffre.toString().split('.')[1])
    }
  }

  // Pagination @@@@
  useEffect(() => {
    if (calendrier.length > 0) {
      var temp = []
      var records = calendrier
      for (let index = 0; index < chiffreBouclePagination(); index++) {
        temp.push(records[pagination + index])
      }
      setDataPagination(temp)
    }
  }
    , [calendrier, pagination, confirmDelete, refresh])


  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


  // this table contains vehicule row ID'S, we can delete up to 10 recods
  const setAllCheckbox = () => {
    const data = document.getElementsByTagName('input')
    var array = []
    // verifier si nous avons déjà coché des cases.
    if (calendriersToDelete.length !== 0) {
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
    setCalendriersToDelete(array);
  }

  const selectOneCheckbox = (id_calendrier) => {
    const element = !document.getElementById(id_calendrier).checked;
    // Si il y a des données dans vehiculesToDelete, on les rajoute dans la table.
    if (calendriersToDelete.length !== 0) {
      var table = calendriersToDelete
      // Si l'element n'est pas dans le tableau 
      if (table.indexOf(id_calendrier) === -1) {
        table.push(id_calendrier);
        setCalendriersToDelete(table)
      } else {
        // L'element est déjà coché
        setCalendriersToDelete(table.filter(element => element !== id_calendrier));
      }
    } else {
      // Si il  n y a pas de données dans vehiculesToDelete. 
      setCalendriersToDelete([id_calendrier])
    }
  }

  useEffect(() => {
    if (confirmDelete) {
      if (pagination !== 0 && dataPagination.length === calendriersToDelete.length) {
        setPagination(pagination - 10);
        setNbrPage(nbrPage - 1)
      }
      calendriersToDelete.forEach(element => {
        calendrierDelete(element);
        setShowPopUp(false)
        let table = document.getElementsByTagName("input")
        for (let index = 0; index < table.length; index++) {
          table[index].checked = false;
        }
      });
      setCalendriersToDelete([])
      setConfirmeDelete(false)
    }

  }, [confirmDelete])


  const calendrierDelete = async (id) => {
    await axios.delete('https://protected-ravine-10497.herokuapp.com/evenements', {
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
        calendriersToDelete.length !== 0 ? <DeleteModal confirmDeleteAll={() => setConfirmeDelete(true)} showPopUp={() => setShowPopUp(false)} /> : setShowPopUp(false)
        : ""
      }
      <div className={"sm:px-6 w-full"}>
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p tabIndex="0" className="hidden sm:block focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800" >Le calendrier</p>
            <div className="flex">

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
                <button onClick={() => { setShowPopUp(true) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Supprimer</p>
                </button> 
              </a>
              <a className="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"  >
                <button onClick={() => {props.showCalendrier()}} className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                  <p className="text-sm font-medium leading-none text-white">Retour</p>
                </button>
              </a>
            </div>
          </div>
          <div className="mt-7 overflow-x-auto">

            <table className="w-full whitespace-nowrap">
              <thead>
                <tr>
                  <th>Choisir</th>
                  <th scope="col">Title</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-3">

                </tr>
                {dataPagination && dataPagination.map((calendrier, key) => (

                  <tr key={key} tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
                    <td className="">
                      <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center item-center  text-center ">
                        <input type="checkbox" onClick={() => { selectOneCheckbox(calendrier.id_evenement) }} id={calendrier.id_evenement} value={calendrier.id_evenement} name={calendrier.id_evenement} className="checkbox" />
                      </div>
                    </td>
                    <td className="">
                      <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                        <p>
                          {calendrier.Titre}
                        </p>
                      </div>
                    </td>
                    <td className="">
                      <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                        <p>
                          {formatDate(calendrier.date)}
                        </p>
                      </div>
                    </td>

                  </tr>

                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default calendrierList;
