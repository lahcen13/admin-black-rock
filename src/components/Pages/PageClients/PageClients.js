import React, { useEffect, useState } from 'react';
import Clients from '../../Clients/Clients/Clients'
import ClientCommandes from '../../Clients/ClientCommandes/ClientCommandes';
import VehiculeDetails from '../../Vehicules/VehiculeDetails/VehiculeDetails';
import CommandeDescription from '../../Commandes/CommandeDescription/CommandeDescription';
import Asidebar from '../../Elements/Asidebar/Asidebar';
import Header from '../../Elements/Header/Header';
import AsidebarMobile from '../../Elements/AsidebarMobile/AsidebarMobile';



const PageClients = () => {
  const [view,setView] = useState('clients');
  const [vehiculeId, setVehiculeId] = useState();
  const [client,setClient] = useState();
  const [viewAsidebarMobile, setViewAsidebarMobile] = useState(false)
  const [commandeDescription, setCommandeDescription] = useState();

  return (
    <>
    <Asidebar/>
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
    <Header setViewAsidebarMobile={()=>setViewAsidebarMobile(!viewAsidebarMobile)} />
    {viewAsidebarMobile && <AsidebarMobile setViewAsidebarMobile={()=>setViewAsidebarMobile(!viewAsidebarMobile)} />}

    {view === "commandes" && <ClientCommandes  dataVehicule={(id)=>setVehiculeId(id)} dataCommandeDescription={(description)=>{setCommandeDescription(description)}} showCommandeDescription={()=>setView('commandeDescription')}  showVehicule={()=>setView('vehicule')} setView={()=>setView('clients')} client={client}/>  }
    {view === "clients" && <Clients setView={()=>setView('commandes')}  setClient={(e)=>setClient(e)}/> }
    {view === "vehicule" && <VehiculeDetails setView={()=>setView('commandes')} vehiculeId={vehiculeId}/> }
    {view === "commandeDescription" && <CommandeDescription setView={() => setView('commandes')} commandeDescription={commandeDescription} />}
    
    </div>
    </>
  )
}

export default PageClients;
