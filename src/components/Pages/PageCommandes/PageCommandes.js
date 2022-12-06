import React, { useEffect, useState } from 'react';
import Commandes from '../../Commandes/Commandes/Commandes';
import VehiculeDetails from '../../Vehicules/VehiculeDetails/VehiculeDetails';
import CommandeDescription from '../../Commandes/CommandeDescription/CommandeDescription'
import ClientDetails from '../../Clients/ClientDetails/ClientDetails'
import Asidebar from '../../Elements/Asidebar/Asidebar'
import Header from '../../Elements/Header/Header'
import AsidebarMobile from '../../Elements/AsidebarMobile/AsidebarMobile';



const PageStock = () => {
  const [view,setView] = useState('commandes');
  const [vehiculeId, setVehiculeId] = useState();
  const [commandeDescription, setCommandeDescription] = useState();
  const [clientId,setClientId] = useState();
  const [viewAsidebarMobile, setViewAsidebarMobile] = useState(false)


  return (
    <>
      <Asidebar />
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <Header setViewAsidebarMobile={()=>setViewAsidebarMobile(!viewAsidebarMobile)} />
        {viewAsidebarMobile && <AsidebarMobile setViewAsidebarMobile={()=>setViewAsidebarMobile(!viewAsidebarMobile)} />}
        {view === "commandes" && <Commandes showVehicule={() => setView('vehicule')} showClient={()=>setView('client')} dataClient={(id)=>setClientId(id)}  showCommandeDescription={() => setView('commandeDescription')} dataCommandeDescription={((string)=>setCommandeDescription(string))}  dataVehicule={(id)=>setVehiculeId(id)} />}
        {view === "client" && <ClientDetails setView={()=>setView('commandes')}  clientId={clientId}/> }
        {view === "vehicule" && <VehiculeDetails setView={() => setView('commandes')} vehiculeId={vehiculeId} />}
        {view === "commandeDescription" && <CommandeDescription setView={() => setView('commandes')} commandeDescription={commandeDescription} />}

      </div>
    </>


  )
};

export default PageStock;
