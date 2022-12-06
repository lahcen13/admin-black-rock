import React,{useEffect,useState} from 'react';
import axios from 'axios';
import LoadAnimation from '../../Elements/LoadAnimation/LoadAnimation';

const VehiculePrixTotal = (props) => {
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

  return (<p>
    {data ? parseInt(data.prix_vehicule) + parseInt(data.prix_livraison) +parseInt(props.frais_supplementaire) +"€" : <LoadAnimation/>}
  </p>
  )
}

export default VehiculePrixTotal;
