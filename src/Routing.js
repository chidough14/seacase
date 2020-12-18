import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import { Fetch } from "./services/fetch";
import auth0Config from "./utils/auth0_config";

function Routing() {
  const {
    error,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();

  const [token, setToken] = useState(Fetch.token);

  // #2: capture user profile and tocken
  useEffect(() => {
    const getToken = async () => {
      const newToken = await getAccessTokenSilently({
        audience: auth0Config.audience,
      });
      Fetch.token = newToken;
      setToken(newToken);
    };
    getToken();
  }, [token, getAccessTokenSilently]);

  // #1: check authentication
  if (error) {
    return <div>{error.message}</div>;
  } else if (isLoading) {
    return <div>Loading</div>;
  } else if (!isAuthenticated) {
    loginWithRedirect();
    return <div>Loading</div>;
  } else {
    return <Map />
  }
}

export default Routing;