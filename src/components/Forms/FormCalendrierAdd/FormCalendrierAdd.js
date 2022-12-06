import React, { useEffect, useState } from 'react';
import axios from 'axios';
import characterController from '../../../functions/characterController.js'

const FormCalendrierAdd = (props) => {
  const [newEvent, setNewEvent] = useState();
  const [clients, setClients] = useState();
  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    }
  )
  const [submitNotif, setSubmitNotif] = useState(false);
  const [notifDate, setNotifDate] = useState(false);
  const [notifTitle, setNotifTitle] = useState(false);


  const onChange = (e) => {
    setSubmitNotif(false);
    setNotifDate(false);
    setNotifTitle(false);
    if (e.target.name !== "Titre") {
      setNewEvent({ ...newEvent, [e.target.name]: e.target.value });

    } else {
      setNewEvent({ ...newEvent, [e.target.name]: characterController(e.target.value) });
    }
  }

  useEffect(() => {
    axios.post('https://protected-ravine-10497.herokuapp.com/clients/clients', { filter: "" }, header).then(
      (response) => {
        setClients(response.data)
      })
      .catch(error => {
        console.error(error.message)
      });
  }, [])

  const newEvenement = () => {
    if (newEvent) {
      var today = new Date();
      var eventDate = new Date(newEvent.date);
      if (eventDate >= today) {
        if (newEvent.Titre) {
          var object = newEvent;
          const data = {
            fields: object
          }
          if (data.fields.id_client) {
            data.fields.id_client = [data.fields.id_client]
          }
          axios.post('https://protected-ravine-10497.herokuapp.com/evenements', data, header).then(
            (response) => {
              setSubmitNotif(true)
            })
            .catch(error => {
              console.error(error.message)
            });
        } else {
          setNotifTitle(true);
        }
      } else {
        setNotifDate(true);
      }
    } else {
      setNotifTitle(true);
      setNotifDate(true);
    }
  }

  useEffect(() => {
    if (submitNotif) {
      props.setView();
    }
  }, [submitNotif])


  return (
    <div className="max-w-2xl mx-auto bg-white p-3">
      <form>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label htmlFor="Titre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Titre de l'événement * </label>
            <input type="text" id="Titre" name="Titre" onChange={(e) => onChange(e)} value={newEvent && newEvent.Titre} className={!notifTitle ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500": "bg-red-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" } required />
          </div>
          <div>
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date et heure * </label>
            <input type="datetime-local" id="date" name="date" onChange={(e) => onChange(e)} value={newEvent && newEvent.date} className={!notifDate ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" : "bg-red-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} required />
          </div>

        </div>
        <div className="grid gap-6 mb-6">
          <div>
            <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
            <textarea name="Description" id="Description" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onChange={(e) => onChange(e)}>
              {newEvent && newEvent.Description}
            </textarea>
          </div>
        </div>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">

          <div>
            <label htmlFor="Administrateur" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Attribuer à </label>
            <select name="Administrateur" id="Administrateur" onChange={(e) => onChange(e)} className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} >
              <option key={"Indifférent"} >Indifférent</option>
              <option key={"Sacha Obadia"} >Sacha Obadia</option>
              <option key={"Benjamin Obadia"} >Benjamin Obadia</option>

            </select>
          </div>
          <div>
            <label htmlFor="id_client" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cet événement est-il lié à client ?</label>
            <select name="id_client" id="id_client" onChange={(e) => onChange(e)} className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} >
              <option key={null} >Non</option>
              {clients && clients.map((client, key) => {
                return (<option key={key} value={[client.id_client]}>{client.prenom_client + ' ' + client.nom_client}</option>)
              })}
            </select>
          </div>
        </div>
        {!submitNotif ? <button type="button" onClick={() => { newEvenement() }} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter au calendrier</button> : <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Opération réussite</button>}
      </form>
    </div>

  )
};

export default FormCalendrierAdd;
