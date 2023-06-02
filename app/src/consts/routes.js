const ROUTES = {
    home: "/",
    login: "/inloggen",
    register: "/registreer",
    contact: "/contact",
    searchRealEstate: "/zoeken",
    realEstateDetail: "/panden/:realEstateId",
    // account routes are for normal users
    account: {
      personalData: '/account/account-bijwerken',
      favorites: '/account/favorieten',
      messages: '/account/berichten',
      logOut: '/account/logout'
    },
    dashboard:{
      agency: {
        realEstate: {
          get: '/immokantoor/dashboard/panden',
          post: '/immokantoor/dashboard/panden/nieuw',
          patch: '/immokantoor/dashboard/panden/wijzigen'
        },
        messages: '/immokantoor/dashboard/berichten',
        employees: '/immokantoor/dashboard/wernemers',
        agencyData: '/immokantoor/dashboard/immokantoor-gegevens-bijwerken'
      },
      admin: {
        types: '/admin/dashboard/categorieën',
        realEstate: {
          get: '/admin/dashboard/panden',
          post: '/admin/dashboard/panden/nieuw',
          patch: '/admin/dashboard/panden/wijzigen'
        },
        users: '/admin/dashboard/gebruikers',
        realEstateAgencies: '/admin/dashboard/immokantoren'
      }
    }

  };
  
  export default ROUTES;
  