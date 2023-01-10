import React, { useEffect, useState } from 'react';
import Cryptocurrency from '../../Cryptocurrency/Cryptocurrency'
import Asidebar from '../../Elements/Asidebar/Asidebar';
import Header from '../../Elements/Header/Header';
import AsidebarMobile from '../../Elements/AsidebarMobile/AsidebarMobile';



const PageCryptocurrency = () => {
  const [view,setView] = useState('cryptocurrency');
  const [viewAsidebarMobile, setViewAsidebarMobile] = useState(false)

  return (
    <>
    <Asidebar/>
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
    <Header setViewAsidebarMobile={()=>setViewAsidebarMobile(!viewAsidebarMobile)} />
    {viewAsidebarMobile && <AsidebarMobile setViewAsidebarMobile={()=>setViewAsidebarMobile(!viewAsidebarMobile)} />}

    {view === "cryptocurrency" && <Cryptocurrency  setClient={(e)=>setClient(e)}/> }
    </div>
    </>
  )
}

export default PageCryptocurrency;
