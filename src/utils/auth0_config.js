const configGen = () => {

  return {
    clientId: "4Ngdl46QS0BorJ7frMX8OyWshxqJlD6q",
    domain: "seacase.eu.auth0.com",
    audience: "https://api.globalshipping.watch",
    redirectUri: `${window.location.origin}/map`,
    scope:"read:countries"
  };

};
const auth0Config = configGen();
export default auth0Config
//# sourceMappingURL=auth_config.js.map