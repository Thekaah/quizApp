export default function ({ app, redirect, route }) {
    const isAuthenticated = app.$auth && app.$auth.getToken(); 
  
    if (!isAuthenticated && route.meta.requiresAuth) {

      redirect('/login');
    }
  }
  