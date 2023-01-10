import React, { useEffect, useState } from 'react';
import axios from 'axios';
import characterController from '../../../functions/characterController.js'


const FormClientUpdate = (props) => {
  const [client, setClient] = useState(props.clientToUpdate);
  const [balance,setBalance] = useState({balance: 0})
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

  const onChangeBalance = (e) => {
    setSubmitNotif(false);
    setBalance({...balance, [e.target.name]: e.target.value})
  }

  const clientUpdate = async () => {
    
       // on suprrime l'id et la date car les deux champs nous voulons pas les modifier.
    const data = {
      username:client.username,
      email:client.email,
      balance:  parseInt(props.defaultBalance)+ parseInt(balance.balance)
    }
    // Le prix est typé INT sur Airtable
    
    await axios.put("https://localhost:8080/api/admin/user/"+client._id, data).then(
      (res)=>{
        setSubmitNotif(true)

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
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-custom dark:text-gray-300" style={{color:"#D0963E"}}> Username</label>
          <input type="text" id="username" name="username" onChange={(e) => onChange(e)} value={client && client.username} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" style={{color:"#D0963E"}}>Email</label>
          <input type="text" id="email" name="email" onChange={(e) => onChange(e)} value={client && client.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        </div>
        <div>
          <label htmlFor="balance" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" style={{color:"#D0963E"}} >Balance BLK</label>
          <input type="number" step={10}  id="balance" name="balance" onChange={(e) => onChangeBalance(e)} value={balance && balance.balance} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        </div>
      </div>
      {!submitNotif ? <button type="button" onClick={() => { clientUpdate();}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Modifier le client</button> : <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Opération réussite</button>}
    </form>
  )
};

export default FormClientUpdate;
