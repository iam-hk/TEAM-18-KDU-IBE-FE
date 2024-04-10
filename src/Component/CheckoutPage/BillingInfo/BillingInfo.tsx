import { Grid, MenuItem, Select, TextField } from "@mui/material";
import "./BillingInfo.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import {
  IBillingInfo,
  setBillingInfo,
  setCurrentIndex,
} from "../../../redux/CheckoutSlice";
import {
  ICountry,
  ICity,
  IState,
  Country,
  City,
  State,
} from "country-state-city";
import { setStates, setCitySlice } from "../../../redux/LocationSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
export function BillingInfo() {
  const { t } = useTranslation();
  const reduxDispatch: AppDispatch = useDispatch();
  const billFirstName = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo.firstName
  );
  const billLastName = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo.lastName
  );
  const billMailPrimary = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo.mailPrimary
  );
  const billMailSecondary = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo.mailSecondary
  );
  const billCountry = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo.country
  );
  const billCity = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo.city
  );
  const billState = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo.state
  );
  const billZip = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo.zip
  );
  const billPhone = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo.phone
  );
  const billEmail = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo.email
  );
  const countriesInSlice = useSelector(
    (state: RootState) => state.loactions.countriesInSlice
  );
  const stateInSlice = useSelector(
    (state: RootState) => state.loactions.stateInSlice
  );
  const cityInSlice = useSelector(
    (state: RootState) => state.loactions.cityInSlice
  );
  const billISOCode = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo.isoCode
  );
  const [countries, setCountries] = useState<ICountry[]>(countriesInSlice);
  const [allStates, setAllStates] = useState<IState[]>(stateInSlice);
  const [allCities, setAllCities] = useState<ICity[]>(cityInSlice);
  const [selectedCountry, setSelectedCountry] = useState(billCountry);
  const [selectedState, setSelectedState] = useState(billState);
  const [firstName, setFirstName] = useState<string>(billFirstName);
  const [lastName, setLastName] = useState<string>(billLastName);
  const [mailPrimary, setMailPrimary] = useState<string>(billMailPrimary);
  const [mailSecondary, setMailSecondary] = useState<string>(billMailSecondary);
  const [zip, setZip] = useState<string>(billZip);
  const [phone, setPhone] = useState<string>(billPhone);
  const [email, setEmail] = useState<string>(billEmail);
  const [city, setCity] = useState<string>(billCity);
  const [countryIsoCode, setCountryIsoCode] = useState<string>(billISOCode);
  const [isValidZipForCity, setIsValidZipForCity] = useState<boolean>(true);
  const [isValidCity, setIsValidCity] = useState<boolean>(true);
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [mailPrimaryError, setMailPrimaryError] = useState<string>("");
  const [mailSecondaryError, setMailSecondaryError] = useState<string>("");
  const [zipError, setZipError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [countryError, setCountryError] = useState<string>("");
  const [cityError, setCityError] = useState<string>("");
  const [stateError, setStateError] = useState<string>("");
  const [isValidCityError, setIsValidCityError] = useState<string>("");
  const handleFirstNameChange = (e) => {
    const { value } = e.target;
    setFirstName(value);
    setFirstNameError(validateFirst());
  };

  const handleLastNameChange = (e) => {
    const { value } = e.target;
    setLastName(value);
    setLastNameError(validateLastName(value));
  };
  const validateFirst=()=>{
    if (!/^[A-Za-z]*$/.test(firstName)) {
      return "Please enter only letters";
    }
    return "";
  }
  const validateFirstName = () => {
    if (!firstName.trim()) {
      return "First Name is required";
    }
    if (!/^[A-Za-z]*$/.test(firstName)) {
      return "Please enter only letters";
    }
    return "";
  };
  const validateLastName = (name: string) => {
    if (!name.trim()) {
      return "Last Name is required";
    }
    if (!/^[A-Za-z]*$/.test(name)) {
      return "Please enter only letters";
    }
    return "";
  };
  const handleMailPrimaryChange = (e) => {
    const { value } = e.target;
    setMailPrimary(value);
    setMailPrimaryError("");
  };
  const handleMailSecondaryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMailSecondary(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCity(value);
    setCityError("");
    if (value.trim() === "") {
      setCityError("City is required");
    } else if (!/^[A-Za-z]*$/.test(value)) {
      setCityError("Please enter only letters");
    }
    setIsValidCity(true);
  };
  const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidZipForCity(true);
    setZip(event.target.value);
    setZipError("");
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
    setPhoneError("");
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError("");
  };
  function checkCityValidation() {
    const isValidCity = allCities.some((cityEach) => {
      const cityNameLowerCase = cityEach.name.toLowerCase();
      const inputCityLowerCase = city.toLowerCase();
      const isValid = cityNameLowerCase === inputCityLowerCase;
      if (isValid) {
      }
      return isValid;
    });

    setIsValidCity(isValidCity);
    return isValidCity;
  }
  const fetchZipCodes = async () => {
    const options = {
      method: "GET",
      url: "https://global-zip-codes-with-lat-and-lng.p.rapidapi.com/api/v1/geocode",
      params: { code: zip },
      headers: {
        "X-RapidAPI-Key": "56daf479c0msh712991d3341af42p1ccd4djsn0b43be876b5e",
        "X-RapidAPI-Host": "global-zip-codes-with-lat-and-lng.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      const responseData = response.data;
      for (const data of responseData) {
        if (
          data.country_code === countryIsoCode &&
          data.state === selectedState
        ) {
          setIsValidZipForCity(true);
          return true;
        }
      }
      setIsValidZipForCity(false);
      return false;
    } catch (error) {
      return false;
    }
  };

  async function checkZipValidation() {
    return await fetchZipCodes();
  }

  function handleBillingSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setFirstNameError(validateFirstName(firstName));
    setLastNameError(validateLastName(lastName));
    if (mailPrimary.trim() === "") {
      setMailPrimaryError("Please enter mailing address");
    }
    if (!selectedCountry) {
      setCountryError("Please select a country");
    }
    if (!selectedState) {
      setStateError("Please select a state");
    }
    if (!city.trim()) {
      setCityError("City is required");
    }
    if (!zip.trim()) {
      setZipError("Zip code is required");
    }
    if (!phone) {
      setPhoneError("Please Enter the phone number");
    }
    if (!email) {
      setEmailError("Please Enter the email");
    }
    checkZipValidation().then((isValid) => {
      if (!checkCityValidation() && isValid) {
      } else if (checkCityValidation() && isValid) {
        if (
          !email ||
          !zip ||
          !city ||
          !phone ||
          !selectedState ||
          !selectedCountry ||
          !mailPrimary ||
          !lastName ||
          !firstName
        ) {
          return;
        }
        const billingInfoObject: IBillingInfo = {
          firstName: firstName,
          lastName: lastName,
          mailPrimary: mailPrimary,
          mailSecondary: mailSecondary,
          country: selectedCountry,
          city: city,
          state: selectedState,
          zip: zip,
          phone: phone,
          email: email,
          isoCode: countryIsoCode,
        };
        reduxDispatch(setBillingInfo(billingInfoObject));
        reduxDispatch(setCurrentIndex(2));
      }
    });
  }
  const updateCountry = (event: ICountry) => {
    const updatedCountry = event.target.value.name;
    setSelectedCountry(updatedCountry);
    setCountryError("");
    const states = State.getStatesOfCountry(`${event.target.value.isoCode}`);
    setAllStates(states);
    const cities = City.getCitiesOfCountry(`${event.target.value.isoCode}`);
    setAllCities(cities);
    reduxDispatch(setStates(states));
    reduxDispatch(setCitySlice(cities));
    setCountryIsoCode(event.target.value.isoCode);
  };
  const updateState = (event: string) => {
    setSelectedState(event.target.value);
    setStateError("");
  };
  function handletravelerInfo() {
    reduxDispatch(setCurrentIndex(0));
  }
  return (
    <form onSubmit={handleBillingSubmit} className="traveler-info-wrapper">
      <div className="billing-info-wrapper">
        <div className="billing-name-wrapper">
          <div className="billing-first-name">
            <Grid
              container
              spacing={0.5}
              direction="column"
              className="input-container"
            >
              <Grid item>
                <label
                  htmlFor="first-name"
                  className="billing-first-name-label"
                >
                  {t("billingInfo.firstName")}
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="first-name"
                  variant="outlined"
                  className="text-field"
                  inputProps={{
                    pattern: "[A-Za-z]*",
                  }}
                  value={firstName}
                  onChange={handleFirstNameChange}
                  error={firstNameError !== ""}
                  helperText={firstNameError}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" ||
                      e.key === "Tab" ||
                      e.key === "ArrowLeft" ||
                      e.key === "ArrowRight"
                    ) {
                      return;
                    }
                  
                    const isAlphabetic = /^[A-Za-z]*$/.test(e.key);
                    
                    if (!isAlphabetic) {
                      e.preventDefault();
                    }
                  }}
                  
                />
              </Grid>
            </Grid>
          </div>
          <div className="billing-last-name">
            <Grid
              container
              spacing={0.5}
              direction="column"
              className="input-container"
            >
              <Grid item>
                <label htmlFor="last-name" className="billing-last-name-label">
                  {t("billingInfo.lastName")}
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="last-name"
                  variant="outlined"
                  className="text-field"
                  inputProps={{
                    pattern: "[A-Za-z]*",
                  }}
                  value={lastName}
                  onChange={handleLastNameChange}
                  error={lastNameError !== ""}
                  helperText={lastNameError}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" ||
                      e.key === "Tab" ||
                      e.key === "ArrowLeft" ||
                      e.key === "ArrowRight"
                    ) {
                      return;
                    }

                    const isAlphabetic = /^[A-Za-z]*$/.test(e.key);

                    if (!isAlphabetic) {
                      e.preventDefault();
                    }
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="billing-address-wrapper">
          <div className="billing-first-address">
            <Grid
              container
              spacing={0.5}
              direction="column"
              className="input-container"
            >
              <Grid item>
                <label
                  htmlFor="mail-primary"
                  className="billing-first-address-label"
                >
                  {t("billingInfo.mailingFirstAddress")}
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="mail-primary"
                  variant="outlined"
                  className="text-field"
                  error={mailPrimaryError !== ""}
                  helperText={mailPrimaryError}
                  value={mailPrimary}
                  onChange={handleMailPrimaryChange}
                />
              </Grid>
            </Grid>
          </div>
          <div className="billing-second-address">
            <Grid
              container
              spacing={0.5}
              direction="column"
              className="input-container"
            >
              <Grid item>
                <label
                  htmlFor="mail-secondary"
                  className="billing-second-address-label"
                >
                  {t("billingInfo.mailingSecondAddress")}
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="mail-secondary"
                  variant="outlined"
                  className="text-field"
                  value={mailSecondary}
                  onChange={handleMailSecondaryChange}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="billing-country-wrapper">
          <Grid
            container
            spacing={0.5}
            direction="column"
            className="input-container"
          >
            <Grid item>
              <label htmlFor="country" className="billing-country-label">
                {t("billingInfo.Country")}
              </label>
            </Grid>
            <Grid item>
              <Select
                id="country"
                variant="outlined"
                className="text-field"
                renderValue={() => (
                  <span className="dropdown-span-value">{selectedCountry}</span>
                )}
                value={selectedCountry}
                onChange={updateCountry}
                error={countryError !== ""}
                helperText={"Select a country"}
              >
                {countries.map((country) => (
                  <MenuItem key={country.isoCode} value={country}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </div>
        <div className="billing-location-wrapper">
          <div className="billing-city-wrapper">
            <Grid
              container
              spacing={0.5}
              direction="column"
              className="input-container"
            >
              <Grid item>
                <label htmlFor="city" className="billing-city-label">
                  {t("billingInfo.City")}
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="city"
                  variant="outlined"
                  className="text-field"
                  value={city}
                  inputProps={{
                    pattern: "[A-Za-z]*",
                  }}
                  onChange={handleCityChange}
                  error={cityError !== "" || !isValidCity}
                  helperText={
                    cityError !== ""
                      ? cityError
                      : !isValidCity
                      ? "The provided city is invalid"
                      : ""
                  }

                />
              </Grid>
            </Grid>
          </div>
          <div className="billing-state-zip-wrapper">
            <div className="billing-state-wrapper">
              <Grid
                container
                spacing={0.5}
                direction="column"
                className="input-container"
              >
                <Grid item>
                  <label htmlFor="state" className="billing-state-label">
                    {t("billingInfo.State")}
                  </label>
                </Grid>
                <Grid item>
                  <Select
                    id="state"
                    variant="outlined"
                    className="text-field"
                    defaultValue=""
                    renderValue={() => (
                      <span className="span-selected">{selectedState}</span>
                    )}
                    value={selectedState}
                    disabled={selectedCountry.length == 0}
                    onChange={updateState}
                    error={stateError}
                    helperText={stateError}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" ||
                        e.key === "Tab" ||
                        e.key === "ArrowLeft" ||
                        e.key === "ArrowRight"
                      ) {
                        return;
                      }
                      const pattern = /^[0-9]*$/;
                      if (!pattern.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  >
                    
                    <MenuItem value="">Select State</MenuItem>
                    {allStates.map((state) => (
                      <MenuItem key={state.isoCode} value={state.name}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </div>
            <div className="billing-zip-wrapper">
              <Grid
                container
                spacing={0.5}
                direction="column"
                className="input-container"
              >
                <Grid item>
                  <label htmlFor="zip" className="billing-zip-label">
                    {t("billingInfo.Zip")}
                  </label>
                </Grid>
                <Grid item>
                  <TextField
                    id="zip"
                    variant="outlined"
                    className="text-field"
                    value={zip}
                    inputProps={{
                      pattern: "^[0-9]{4,6}$",
                      minLength: 4,
                      maxLength: 6,
                    }}
                    onChange={handleZipChange}
                    error={
                      (zip !== "" &&
                        (!/^[0-9]{4,6}$/.test(zip) || !isValidZipForCity)) ||
                      zipError !== ""
                    }
                    helperText={
                      zipError
                        ? zipError
                        : zip === ""
                        ? ""
                        : !/^[0-9]{4,6}$/.test(zip)
                        ? "Please enter a valid zip code (4-6 digits)"
                        : !isValidZipForCity
                        ? "The provided zip code does not belong to the entered city"
                        : ""
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" ||
                        e.key === "Tab" ||
                        e.key === "ArrowLeft" ||
                        e.key === "ArrowRight"
                      ) {
                        return;
                      }
                      const pattern = /^[0-9]*$/;
                      if (!pattern.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <div className="billing-phone-wrapper">
          <Grid
            container
            spacing={0.5}
            direction="column"
            className="input-container"
          >
            <Grid item>
              <label htmlFor="phone" className="billing-phone-label">
                {t("billingInfo.Phone")}
              </label>
            </Grid>
            <Grid item>
              <TextField
                id="phone"
                variant="outlined"
                className="text-field"
                type="tel"
                inputProps={{
                  pattern: "[0-9]{10}",
                  minLength: 10,
                  maxLength: 10,
                }}
                value={phone}
                onChange={handlePhoneChange}
                error={
                  (phone !== "" && !/^[0-9]{10}$/.test(phone)) ||
                  phoneError !== ""
                }
                helperText={
                  phoneError
                    ? phoneError
                    : phone !== ""
                    ? !/^[0-9]{10}$/.test(phone)
                      ? "Please enter a valid 10-digit phone number"
                      : ""
                    : ""
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "Backspace" ||
                    e.key === "Tab" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight"
                  ) {
                    return;
                  }
                  const pattern = /^[0-9]*$/;
                  if (!pattern.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className="billing-email-wrapper">
          <Grid
            container
            spacing={0.5}
            direction="column"
            className="input-container"
          >
            <Grid item>
              <label htmlFor="email" className="billing-email-label">
                {t("billingInfo.Email")}
              </label>
            </Grid>
            <Grid item>
              <TextField
                id="email"
                type="email"
                variant="outlined"
                className="text-field"
                value={email}
                onChange={handleEmailChange}
                error={
                  (email !== "" &&
                    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                      email
                    )) ||
                  emailError !== ""
                }
                helperText={
                  emailError
                    ? emailError
                    : email !== "" &&
                      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                        email
                      )
                    ? "Please enter a valid email address"
                    : ""
                }
              />
            </Grid>
          </Grid>
        </div>
        <div className="billing-button-wrapper">
          <button className="edit-traveler" onClick={handletravelerInfo}>
            {t("billingInfo.editTraveller")}
          </button>
          <button className="billing-button">{t("billingInfo.button")}</button>
        </div>
      </div>
    </form>
  );
}
