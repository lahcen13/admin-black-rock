import React, { useEffect, useState } from 'react';
import Clients from '../../Clients/Clients/Clients'
import Asidebar from '../../Elements/Asidebar/Asidebar';
import Header from '../../Elements/Header/Header';
import AsidebarMobile from '../../Elements/AsidebarMobile/AsidebarMobile';



const PageClients = () => {
  const [view,setView] = useState('clients');
  const [client,setClient] = useState();
  const [viewAsidebarMobile, setViewAsidebarMobile] = useState(false)

  return (
    <>
    <Asidebar/>
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]" style={{marginBottom:0}}>
    <Header setViewAsidebarMobile={()=>setViewAsidebarMobile(!viewAsidebarMobile)} />
    {viewAsidebarMobile && <AsidebarMobile setViewAsidebarMobile={()=>setViewAsidebarMobile(!viewAsidebarMobile)} />}
    {view === "clients" && <Clients   setClient={(e)=>setClient(e)}/> }
    </div>
    </>
  )
}

export default PageClients;
