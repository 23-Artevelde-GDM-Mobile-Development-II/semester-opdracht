const ROUTES = {
    home: "/",
    contact: "/contact",
    searchRealEstate: "/zoeken",
    realEstateDetail: "/panden/5",
    // account routes are for normal users
    account: {
      personalData: '/account/account-bijwerken',
      favorites: '/account/favorieten',
      messages: '/account/berichten',
      logOut: '/account/logout'
    },
    dashboard:{
      agency: {
        realEstate: '/dashboard/panden',
        messages: '/dashboard/berichten',
        employees: '/dashboard/wernemers',
        agencyData: '/immokantoor-gegevens-bijwerken'
      },
      admin: {

      }
    }

  };
  
  export default ROUTES;
  