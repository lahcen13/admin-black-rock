import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteModal from '../../Elements/DeleteModal/DeleteModal';
import MailModal from '../../Elements/MailingModal/MailingModal'
import Pagination from '../../Elements/Pagination/Pagination';
import SuccessModal from '../../Elements/SuccessModal/SuccessModal';
import formatDate from '../../../functions/formatDate'
import sentenceController from "../../../functions/sentenceController"
import LoadAnimation from '../../Elements/LoadAnimation/LoadAnimation';


const ListeAttenteVehicules = (props) => {
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
    const [filter, setFilter] = useState({ name: "vehicule" });
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
            data.filter = "SEARCH('" + sentenceController(filter.value) + "',{" + filter.name + "})"
        }
        axios.post('https://protected-ravine-10497.herokuapp.com/listesattente/listesattente', data, header).then(
            (response) => {
                if(response.data.length===0){
                    setNoRecords(true)
                }
                collectionVehicule(response.data)
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
            setNoRecords(false)
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

    const collectionVehicule = async (data) => {
        let tableRef = []
        let tableVehicule = []
        await data.forEach(element => {
            if (tableRef.indexOf(element.id_vehica) === -1) {
                tableRef.push(element.id_vehica)
                tableVehicule.push({vehicule:element.vehicule, id_vehica: element.id_vehica})
            }
        });
        setlistes(tableVehicule)
        setidsVehica(tableRef)
    }

    //   useEffect(() => {
    //     axios.post('https://protected-ravine-10497.herokuapp.com/listesattente/listesattente', { filter: "" }, header).then(
    //       (response) => {
    //       })
    //       .catch(error => {
    //         console.error(error.message)
    //       });
    //   }, [refresh]
    //   )

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

    const submitFilter = () => {
        if (filter.name === "id_vehica" && filter.value) {
            setRefresh(!refresh)
            setShowMailingCampagne(true)
            setSuccessMailing(false)

        } else {
            setSuccessMailing(false)
            setRefresh(!refresh)
            setShowMailingCampagne(false)
        }
    }

    return (
        <>
            {showPopUp
                ?
                listesToDelete.length > 0 ? <DeleteModal confirmDeleteAll={() => setConfirmeDelete(true)} showPopUp={() => setShowPopUp(false)} /> : setShowPopUp(false)
                : ""
            }
            {showMailModal && listes.length > 0 ? <MailModal confirmMailing={() => setConfirmMailing(true)} showMailModal={() => setShowMailModal(false)} nombreEmails={listes.length} /> : ""}
            <div className= {" sm:px-6 w-full"}>
                <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="flex items-center justify-between">
                        <p tabIndex="0" className="hidden sm:block focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800" >Véhicules des listes d'attente
                        </p>
                        <div className="flex">
                            <div className="relative flex items-center text-sm font-medium leading-none text-gray-600 cursor-pointer rounded-xl ">
                                <select onChange={(e) => { setFilter({ ...filter, name: e.target.value }) }} name="name" style={{ marginRight: "3px" }} aria-label="select" className="w-full focus-within:text-cyan-400 focus:outline-none bg-transparent border-r border-gray-300 rounded-xl">
                                    <option value="vehicule" className="text-sm text-gray-400">Véhicule</option>
                                    <option value="id_vehica" className="text-sm text-gray-400"> ID Véhica</option>
                                </select>
                            </div>
                                <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                                    <span onClick={() => { submitFilter() }} style={{ cursor: "pointer" }} className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                        <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                                            <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                                        </svg>
                                    </span>
                                    <input onChange={(e) => { setFilter({ ...filter, value: e.target.value }) }} type={"mail"} name="leadingIcon" id="leadingIcon" placeholder="Search here" className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
                                </div>
                        </div>
                    </div>
                </div>
                {successMailing && <SuccessModal />}
                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                    <div className="sm:flex items-center justify-between">
                        <div className="flex items-center ">
                          
                         
                         
                        </div>
                    </div>
                    <div className="mt-7 overflow-x-auto">
                        {!formView ?
                            <table className="w-full whitespace-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">Réf* Vehica</th>
                                        <th scope="col">Véhicule</th>
                                        <th scope="col">liste d'attente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="h-3"></tr>
                                    {dataPagination !== undefined  ? dataPagination.map((liste, key) => (
                                        <tr key={key} tabIndex="0" className="focus:outline-none h-16 border border-gray-100 rounded">
                                        
                                            <td className="">
                                                <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                                                    <p>
                                                        {liste.id_vehica && liste.id_vehica}
                                                    </p>
                                                </div>
                                            </td>
                                          
                                            <td className="">
                                                <div className="text-sm leading-none text-gray-600 ml-2 text-center">
                                                    <p>
                                                        {liste.vehicule && liste.vehicule}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="pl-5 textcenter item-center text-center">
                                            <button onClick={() => { props.setView(); props.setIdVehica(liste.id_vehica); }} className="py-3 px-7 text-sm leading-none text-gray-700 bg-yellow-100 rounded focus:outline-none ">
                                                Afficher liste
                                            </button>
                                            </td>
                                        </tr>
                                    )): !noRecords ? <LoadAnimation/> : <tr><td>Pas de clients</td></tr>}
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

export default ListeAttenteVehicules;
