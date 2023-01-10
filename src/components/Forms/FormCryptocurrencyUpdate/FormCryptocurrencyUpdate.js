import React, { useEffect, useState } from 'react';
import axios from 'axios';
import characterController from '../../../functions/characterController.js'


const FormClientUpdate = (props) => {
  const [client, setClient] = useState(props.clientToUpdate);
  const [submitNotif, setSubmitNotif] = useState(false);
  const [header, setHeader] = useState(
    {
      headers: {
        "Authorization": `${localStorage.getItem('jwt')}`,
      }
    }
  )

  const onChange = (e) => {
    setSubmitNotif(false);
    
    setClient({ ...client, [e.target.name]: e.target.value });
    
  }

  const clientUpdate = async () => {
       // on suprrime l'id et la date car les deux champs nous voulons pas les modifier.
    const data = {
      symbol:client.symbol,
    }
    // Le prix est typé INT sur Airtable
    
    await axios.put("https://localhost:8080/api/admin/user/"+client._id, data).then(
      (res)=>{
        console.log(data)
        setSubmitNotif(true)
        console.log("nique ta mere")

    }).catch(error=>{
      console.error(error.message)
    }) 
  }

  useEffect(()=>{
    if (submitNotif){
      props.setFormView()
      props.setRefresh()
    }
  },[submitNotif])



  return (
    <form>
      <div className="grid gap-6 mb-6 lg:grid-cols-2">
        <div>
          <label htmlFor="symbol"  className="block mb-2 text-sm font-medium dark:text-gray-300" style={{color:"#D0963E"}}> Symbol</label>
          <input type="text" id="symbol" name="symbol" onChange={(e) => onChange(e)} value={client && client.symbol} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        </div>
      </div>
      {!submitNotif ? <button type="button" onClick={() => { clientUpdate();}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Modifier le client</button> : <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Opération réussite</button>}
    </form>
  )
};

export default FormClientUpdate;
