import ROUTES from "./routes";

const SIDEBAR_NAV_ITEMS = {
    account: [
      ['Persoonlijke gegevens', ROUTES.account.personalData], 
      ['Favorieten', ROUTES.account.favorites], 
      ['Berichten', ROUTES.account.messages], 
      ['Uitloggen', ROUTES.account.logOut]
    ],

    dashboard:{
      agency: [
        ['Panden', ROUTES.dashboard.agency.realEstate], 
        ['Berichten', ROUTES.dashboard.agency.messages], 
        ['Werknemers', ROUTES.dashboard.agency.employees], 
        ['Gegevens immokantoor', ROUTES.dashboard.agency.agencyData],
        ['Uitloggen', ROUTES.account.logOut]
      ],

      admin: []
      
    }

  };
  
  export default SIDEBAR_NAV_ITEMS;
  