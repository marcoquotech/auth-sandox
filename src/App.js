import React, { useEffect } from 'react';
import './App.css';
import { AuthProvider, AuthService, useAuth } from "react-oauth2-pkce";

const authService = new AuthService({
  clientId: "uVWkz75hXjwZlix2hGz55RDJfxwFOvd1",
  location: window.location,
  provider: "https://quotech-test.eu.auth0.com",
  redirectUri: "http://localhost:3000/",
  scopes: ["openid", "profile"],
});

function App() {
  const { authService } = useAuth();
  const [token, setToken] = React.useState(null)
  useEffect(() => {
    setToken(authService.getAuthTokens())
  }, [])
  return (
    <div className="App">
      {authService.isPending() && <p>Loading...</p>}
      {!authService.isPending() && !authService.isAuthenticated() && <button onClick={() => authService.login()}>Login</button>}
      {!authService.isPending() && authService.isAuthenticated() && (
        <p>{JSON.stringify(token)}</p>
      )}
      {!authService.isPending() && authService.isAuthenticated() && (
        <button onClick={() => authService.logout()}>Logout</button>
      )}
    </div >
  );
}

export default function AppWithAuth() {
  return (
    <AuthProvider authService={authService}>
      <App />
    </AuthProvider>
  )
};
