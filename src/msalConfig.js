export const msalConfig = {
  auth: {
    clientId: "7e72ae60-bbb4-4286-8812-063ae6b7e1e1", // This is the ONLY mandatory field that you need to supply.
    authority:
      "https://ibe24.b2clogin.com/ibe24.onmicrosoft.com/B2C_1_signinsignupteam18", // Choose SUSI as your default authority.
    knownAuthorities: ["ibe24.b2clogin.com"], // Mark your B2C tenant's domain as trusted.
    redirectUri: "https://team18-ibe-hyaheff6heahgra2.z02.azurefd.net/", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
    postLogoutRedirectUri: "https://team18-ibe-hyaheff6heahgra2.z02.azurefd.net/", // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false, // If 'true', will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. 'sessionStorage' is more secure, but 'localStorage' gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to 'true' if you are having issues on IE11 or Edge
  },
};