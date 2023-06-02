import ROUTES from "./routes";

const SIDEBAR_NAV_ITEMS = {
    account: [
      ['Persoonlijke gegevens', ROUTES.account.personalData], 
      ['Favorieten', ROUTES.account.favorites], 
      ['Berichten', ROUTES.account.messages] 
    ],

    dashboard:{
      agency: [
        ['Panden', ROUTES.dashboard.agency.realEstate.get], 
        ['Berichten', ROUTES.dashboard.agency.messages], 
        ['Werknemers', ROUTES.dashboard.agency.employees], 
        ['Gegevens immokantoor', ROUTES.dashboard.agency.agencyData]
      ],

      admin: [
        ['Panden', ROUTES.dashboard.admin.realEstate], 
        ['Categorieën', ROUTES.dashboard.admin.types], 
        ['Gebruikers', ROUTES.dashboard.admin.users], 
        ['immokantoren', ROUTES.dashboard.admin.realEstateAgencies]
      ]
      
    }

  };
  
  export default SIDEBAR_NAV_ITEMS;
  