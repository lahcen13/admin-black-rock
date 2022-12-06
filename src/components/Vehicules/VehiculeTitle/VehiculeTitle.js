import React,{useEffect,useState} from 'react';
import styles from './VehiculeTitle.module.css';
import axios from 'axios';

const VehiculeTitle = (props) => {
  const [data,setData] = useState()
  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    })

  useEffect(() => {
    axios.get('https://protected-ravine-10497.herokuapp.com/vehicules/'+props.id_vehicule, header).then(
    (response) => {
      setData(response.data)
    })
    .catch(error => {
      console.error(error.message)
    });
  
}, [])


  return (
  
    <button className="py-3 px-7 text-sm leading-none text-gray-700 bg-yellow-100 rounded focus:outline-none ">
    {data && data.marque + " " + data.modele + " " + data.couleur + " (" + data.chassis.charAt(data.chassis.length - 4) + data.chassis.charAt(data.chassis.length - 3)+data.chassis.charAt(data.chassis.length - 2)+data.chassis.charAt(data.chassis.length - 1) +")" }
    </button>

  )

}

export default VehiculeTitle;
