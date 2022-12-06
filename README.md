# 🚀 React 18 with Tailwind CSS

Learn how to quickly set up a `React.js` project with Tailwind CSS using the [starter kit](https://github.com/labnol/react-tailwind). The project was bootstrapped with Create React App (CRA) and it uses PurgeCSS to remove all the unused CSS classes from the production build.

## Live Demo

The [Digital Inspiration](https://digitalinspiration.com/) website is built with the Tailwind CSS, React.js and Gatsby.

[CodeSandbox](https://codesandbox.io/s/github/labnol/react-tailwind) | [Glitch](https://glitch.com/edit/#!/remix/react-tailwindcss) | [Vercel](https://csb-ggfl7-ipit3clvr.vercel.app/)

### Available npm scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.

Open `http://localhost:3000` to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `npm run build`

Builds the React app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

### `npm run inline`

This command uses `Gulp` to inline all the JavaScript and CSS files from the production build into a single minified file.

### 📧 Contact

The React and Tailwind CSS starter is written by [Amit Agarwal](https://www.labnol.org/about). It is now updated to support Tailwind CSS v2.0.

If you have any questions or feedback, send an email at [amit@labnol.org](mailto:amit@labnol.org?subject=Tailwind+React).

# L'architecture de l'application : 
## Les pages : 
> l'application comporte 8 pages, les pages sont organisés dans le dossier: ./src/components/Pages et chaque page correspond à un dossier comportant les composants qui l'alimente.
### la page Calendrier ( ./src/components/Pages/PageCalendrier )
* le composant Calendrier de (./src/components/Calendrier/Calendrier/Calendrier) permet d'afficher un iframe du calendrier de airtable.
* le composant CalendrierList de (./src/components/Calendrier/CalendrierList/CalendrierList) permet d'afficher/supprimer tout les évenements.
>
### la page Clients ( ./src/components/Pages/PageClients ) 
> les composants qui alimente cette page, sont:
* le composant Clients de (./src/components/Clients/Clients/Clients) permet d'afficher/supprimer/modifier une liste de clients
* le composant ClientCommandes de (./src/components/Clients/ClientCommandes/ClientCommandes) permet d'afficher/modifier/supprimer toutes les commande d'un client
* le composant VehiculeDetails de (./src/components/Vehicules/VehiculeDetails/VehiculeDetails) permet d'afficher les details  de véhicule commander par le client
* le composant CommandeDescription de (./src/components/Commandes/CommandeDescription/CommandeDescription) permet d'afficher la description de la commande.
>
### la page Commandes ( ./src/components/Pages/PageCommandes )
> les composants qui alimente cette page, sont:
* le composant Commandes de (./src/components/Commandes/Commandes/Commandes') permet d'afficher/modifier/supprimer toutes les commandes
* le composant CommandeDescription de (./src/components/Commandes/CommandeDescription/CommandeDescription') permet d'afficher les détails des éléments sur la commande
* le composant VehiculeDetails de (./src/components/Vehicules/VehiculeDetails/VehiculeDetails') permet d'afficher les détails d'un véhicule d'une commande
* le composant ClientDetails from de (./src/components/ClientDetails/ClientDetails') permet d'afficher les détails d'un client relier à une commande.
>
### la page Demandes ( ./src/components/Pages/PageDemandes )
> les composants qui alimente cette page, sont:
* le composant Demandes de (./src/components/Demandes/Demandes/Demandes) permet d'afficher/supprimer/modifier les demandes
* le composant DemandeDetails de (./src/components/Demandes/DemandeDetails/DemandeDetails) permet d'afficher les détails de la demande
* le composant VehiculeDetails de (./src/components/Vehicules/VehiculeDetails/VehiculeDetails) permet d'afficher les détails du véhicule lier à une demande
* le composant ClientDetails de (./src/components/Clients/ClientDetails/ClientDetails) permet d'afficher les détails du client relier à la demande
* le composant DemandeProspectDetails de (./src/components/Demandes/DemandeProspectDetails/DemandeProspectDetails) 
>
### la page Listes d'attente( ./src/components/Pages/PageListesAttente)
> les composants qui alimente cette page, sont:
* le composant ListesAttente de (./src/components/ListesAttente/ListesAttente)
>
### la page Véhicules ( ./src/components/Pages/PageStock )
> les composants qui alimente cette page, sont:
* le composant Stock de (./src/components/Vehicules/Stock/Stock)
* le composant VehiculeCommande de (./src/components/Vehicules/VehiculeCommande/VehiculeCommande)
* le composant CommandeDescription de (./src/components/Commandes/CommandeDescription/CommandeDescription)
* le composant ClientDetails de (./src/components/Clients/ClientDetails/ClientDetails)
* le composant Asidebar de (./src/components/Elements/Asidebar/Asidebar)
*
>
### la page Suivis ( ./src/components/Pages/PageSuivis  )
> les composants qui alimente cette page, sont:
*  => ( ./src/components/Suivis ) 
* le composant Suivis de (./src/components/Suivis/Suivis/Suivis)
* le composant ClientDetails  de (./src/components/Clients/ClientDetails/ClientDetails)
* le composant VehiculeDetails  de (./src/components/Vehicules/VehiculeDetails/VehiculeDetails)
* le composant SuivisImprevuDetails  de (./src/components/Suivis/SuivisImprevuDetails/SuivisImprevuDetails)
* le composant CommandeDetails de (./src/components/Commandes/CommandeDetails/CommandeDetails)
* le composant CommandeDescription de (./src/components/Commandes/CommandeDescription/CommandeDescription)
>
### la page Ventes (./src/components/Pages/PageVentes)
> les composants qui alimente cette page, sont:
* le composant Ventes de (./src/components/Ventes/Ventes)
* le composant ClientDetails de (./src/components/Clients/ClientDetails/ClientDetails)
* le composant VehiculeDetails de (./src/components/Vehicules/VehiculeDetails/VehiculeDetails)
* le composant CommandeDetails de (./src/components/Commandes/CommandeDetails/CommandeDetails)
* le composant SuivisImprevuDetails de (./src/components/Suivis/SuivisImprevuDetails/SuivisImprevuDetails)
* le composant CommandeDescription de (./src/components/Commandes/CommandeDescription/CommandeDescription)
>
### les composants communs à toutes les pages : 
* le composant Asidebar de (./src/components/Elements/Asidebar/Asidebar)
* le composant AsidebarMobile de (./src/components/Elements/AsidebarMobile/AsidebarMobile)
* le composant Header de (./src/components/Header/Header)

> le dossier components qui se trouve dans le fichier src, comporte tout les composants du CRM,
