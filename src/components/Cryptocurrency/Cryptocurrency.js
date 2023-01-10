import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteModal from '../Elements/DeleteModal/DeleteModal';
import Pagination from '../Elements/Pagination/Pagination';
import LoadAnimation from '../Elements/LoadAnimation/LoadAnimation';
import FormCryptocurrencyUpdate from '../Forms/FormCryptocurrencyUpdate/FormCryptocurrencyUpdate';
import Styles from  './Cryptocurrency.module.css';

const Clients = (props) => {
  const [clients, setClients] = useState([]);
  const [formView, setFormView] = useState();
  const [clientToUpdate, setClientToUpdate] = useState();
  const [clientsToDelete, setClientsToDelete] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [confirmDelete, setConfirmeDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pagination, setPagination] = useState(0);
  const [dataPagination, setDataPagination] = useState();
  const [nbrPage, setNbrPage] = useState(1);
  const [filter, setFilter] = useState({ name: "prenom_client" });
  const [noRecords,setNoRecords] = useState(false);

  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    })
  useEffect(() => {
    axios.get('https://localhost:8080/api/admin/cryptocurrency', header).then(
      (response) => {
        console.log(response)
    
        setClients(response.data)
        setDataPagination()
        if(response.data.length===0){
          setNoRecords(true)
        }
      })
      .catch(error => {
        console.error(error.message)
      });
  }, [clientToUpdate, confirmDelete, refresh])

  // Pagination @@@@
  const chiffreBouclePagination = () => {
    if (!(clients.length - pagination < 10)) {
      return 10;
    } else {
      var chiffre = clients.length / 10
      return parseInt(chiffre.toString().split('.')[1])
    }
  }

  // Pagination @@@@
  useEffect(() => {
    if (clients.length > 0) {
      setNoRecords(false)

      var temp = []
      var records = clients
      for (let index = 0; index < chiffreBouclePagination(); index++) {
        temp.push(records[pagination + index])
      }
      setDataPagination(temp)
    }
  }
    , [clients, pagination, confirmDelete, clientToUpdate, refresh])


  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  // permet d'éviter le bug suivant : la selection d'un checkbox pour supression d'un element ensuite aller au formulaire d'update ou d'ajout et revenir sur la page de supression, l'element que nous avons selectionner au début sera plus selectionner mais on pourra le suprimmer quand même.
  useEffect(() => {
    setClientsToDelete([])
  }, [formView])


  // this table contains vehicule row ID'S, we can delete up to 10 recods
  const setAllCheckbox = () => {
    const data = document.getElementsByTagName('input')
    var array = []

    // verifier si nous avons déjà coché des cases.
    if (clientsToDelete.length !== 0) {
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
    setClientsToDelete(array);
  }



  const selectOneCheckbox = (id_client) => {
    const element = !document.getElementById(id_client).checked;
    // Si il y a des données dans vehiculesToDelete, on les rajoute dans la table.
    if (clientsToDelete.length !== 0) {
      var table = clientsToDelete
      // Si l'element n'est pas dans le tableau 
      if (table.indexOf(id_client) === -1) {
        table.push(id_client);
        setClientsToDelete(table)
      } else {
        // L'element est déjà coché
        setClientsToDelete(table.filter(element => element !== id_client));
      }
    } else {
      // Si il  n y a pas de données dans vehiculesToDelete. 
      setClientsToDelete([id_client])
    }
  }

  useEffect(() => {
    if (confirmDelete) {
      if (pagination!==0 && dataPagination.length===clientsToDelete.length){
        setPagination(pagination - 10);
        setNbrPage(nbrPage - 1)
      }
      clientsToDelete.forEach(element => {
        clientDelete(element);
        setShowPopUp(false)
        let table = document.getElementsByTagName("input")
        for (let index = 0; index < table.length; index++) {
          table[index].checked = false;
        }
      });
      setClientsToDelete([])
      setConfirmeDelete(false)
    }

  }, [confirmDelete])


  const clientDelete = async (id) => {
    await axios.delete('https://localhost:8080/api/admin/user/'+id, {
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

  const verifiedUpdate = async (id,value) => {
    await axios.put("https://localhost:8080/api/admin/cryptocurrency/"+id,{activated:value}).then(
      (res)=>{
        setRefresh(!refresh)
    }).catch(error=>{
      console.error(error.message)
    })
  }

  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // delete @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  return (
    <>
      {showPopUp
        ?
        clientsToDelete.length !== 0 ? <DeleteModal confirmDeleteAll={() => setConfirmeDelete(true)} showPopUp={() => setShowPopUp(false)} /> : setShowPopUp(false)
        : 
        ""
      }
      <div className={Styles.Content + " sm:px-6 w-full"}>
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p tabIndex="0" className="hidden sm:block focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"  style={{color:"#D0963E"}}>Cryptocurrencies</p>
          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10" style={{background:"#22202A"}}>
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
                {!formView ? <button onClick={() => { setShowPopUp(true) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded"  style={{background:"#D0963E"}}>
                  <p className="text-sm font-medium leading-none text-white">Supprimer</p> 
                </button> 
                :
                  <button onClick={() => { setFormView(); setRefresh(!refresh) }} className="focus:ring-2 focus:ring-offset-2 focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded">
                    <p className="text-sm font-medium leading-none text-white">Retour</p>
                  </button>
                }
              </a>
             
            </div>
          </div>
          <div className="mt-7 overflow-x-auto">
            {!formView ?
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr>
                    <th  style={{color:"#D0963E"}}>Choisir</th>
                    <th scope="col" style={{color:"#D0963E"}}>Symbol</th>
                    <th scope="col" style={{color:"#D0963E"}}>Activated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-3"></tr>
                  {dataPagination ? dataPagination.map((client, key) => (
                    <tr key={key} tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
                      <td>
                        <div className=" ">
                          <input type="checkbox" onClick={() => { selectOneCheckbox(client._id) }} id={client._id} value={client._id} name={client._id} />
                        </div>
                      </td>
                      <td className="">
                        <div className="text-sm leading-none text-white ml-2 text-center">
                          <p>
                            {client.symbol}
                          </p>
                        </div>
                      </td>
                      <td className="pl-5 textcenter item-center text-center">
                        {client.activated ? 
                          <button onClick={() => { verifiedUpdate(client._id,!client.activated) }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-green-100 rounded focus:outline-none ">
                            activated
                          </button>
                          :
                          <button  onClick={() => { verifiedUpdate(client._id,!client.activated) }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-red-100 rounded focus:outline-none ">
                            Deactivated
                          </button>
                        }
                      </td>
                      <td className="pl-5 ">
                        <div className='text-center'>
                          <button className="focus:ring-2 rounded-md focus:outline-none" onClick={() => { setFormView('update') }} role="button" aria-label="option">
                            <svg className="dropbtn" onClick={() => { setFormView('update'); setClientToUpdate(client) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z" stroke="#9CA3AF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : !noRecords ? <LoadAnimation/> : <tr><td>Pas de clients</td></tr>}
                </tbody>
              </table>
              : formView === "add" ? <FormCryptocurrencyUpdate setFormView={() => setFormView()} setRefresh={() => setRefresh(!refresh)} /> : <FormCryptocurrencyUpdate clientToUpdate={clientToUpdate} setFormView={() => setFormView()} setRefresh={() => setRefresh(!refresh)} />
            }
          </div>
          {!formView 
          ?
            clients.length > 10 && <Pagination nbrPage={nbrPage} dataLength={dataPagination && dataPagination.length} pagination={pagination} moins={() => { setPagination(pagination - 10); setNbrPage(nbrPage - 1) }} plus={() => { setPagination(pagination + 10); setNbrPage(nbrPage + 1) }}></Pagination>
          :
          ""}

        </div>
      </div>
    </>
  )
}

export default Clients;
