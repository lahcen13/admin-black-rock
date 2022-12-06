import React,{useState, useEffect} from 'react';
import styles from './ClientFullName.module.css';
import axios from 'axios';


const ClientFullName = (props) => {
  const [data,setData] = useState()
  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    }
  )
  useEffect(() => {
    axios.get('https://protected-ravine-10497.herokuapp.com/clients/'+props.id_client, header).then(
    (response) => {
      setData(response.data)
    })
    .catch(error => {
      console.error(error.message)
    });
  
}, [])


  return (
  
    <button className="py-3 px-7 text-sm leading-none text-gray-700 bg-yellow-100 rounded focus:outline-none ">
    {data && data.prenom_client + " " + data.nom_client }
    </button>

  )

  };

export default ClientFullName;
