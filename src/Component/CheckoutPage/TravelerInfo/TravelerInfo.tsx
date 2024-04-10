import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import "./TravelerInfo.scss";
import { AppDispatch, RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  ITravelerInfo,
  setCheckoutPage,
  setCurrentIndex,
  setTravlerInfo,
} from "../../../redux/CheckoutSlice";
import { useTranslation } from "react-i18next";

export function TravelerInfo() {
  const { t } = useTranslation();
  const reduxDispatch: AppDispatch = useDispatch();
  const firstNameSlice = useSelector(
    (state: RootState) => state.checkoutRoom.travelerInfo.tfirstName
  );
  const lastNameSlice = useSelector(
    (state: RootState) => state.checkoutRoom.travelerInfo.tlastName
  );
  const phoneSlice = useSelector(
    (state: RootState) => state.checkoutRoom.travelerInfo.tphone
  );
  const emailSlice = useSelector(
    (state: RootState) => state.checkoutRoom.travelerInfo.temail
  );
  const [firstName, setFirstName] = useState(firstNameSlice);
  const [lastName, setLastName] = useState(lastNameSlice);
  const [phone, setPhone] = useState(phoneSlice);
  const [email, setEmail] = useState(emailSlice);
  const [submitted, setSubmitted] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const handleFirstNameChange = (value:string) => {
    setFirstName(value);
    if (submitted) {
      setFirstNameError(!value.trim() ? 'Please enter a first name.' : !/^[a-zA-Z]+$/.test(value) ? 'Please enter a valid first name.' : '');
    }
  };

  const handleLastNameChange = (value:string) => {
    setLastName(value);
    if (submitted) {
      setLastNameError(!value.trim() ? 'Please enter a last name.' : !/^[a-zA-Z]+$/.test(value) ? 'Please enter a valid last name.' : '');
    }
  };

  const handlePhoneChange = (value:string) => {
    setPhone(value);
    if (submitted) {
      setPhoneError(!value.trim() ? 'Please enter a phone number.' : !/^[0-9]{10}$/.test(value) ? 'Please enter a valid 10-digit phone number.' : '');
    }
  };

  const handleEmailChange = (value:string) => {
    setEmail(value);
    if (submitted) {
      setEmailError(!value.trim() ? 'Please enter an email address.' : !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value) ? 'Please enter a valid email address.' : '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setFirstNameError(!firstName.trim() ? 'Please enter a first name.' : !/^[a-zA-Z]+$/.test(firstName) ? 'Please enter a valid first name.' : '');
    setLastNameError(!lastName.trim() ? 'Please enter a last name.' : !/^[a-zA-Z]+$/.test(lastName) ? 'Please enter a valid last name.' : '');
    setPhoneError(!phone.trim() ? 'Please enter a phone number.' : !/^[0-9]{10}$/.test(phone) ? 'Please enter a valid 10-digit phone number.' : '');
    setEmailError(!email.trim() ? 'Please enter an email address.' : !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email) ? 'Please enter a valid email address.' : '');

    if (firstName.trim() && /^[a-zA-Z]+$/.test(firstName) && lastName.trim() && /^[a-zA-Z]+$/.test(lastName) && phone.trim() && /^[0-9]{10}$/.test(phone) && email.trim() && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      const travelerInfo: ITravelerInfo = {
        tfirstName: firstName,
        tlastName: lastName,
        tphone: phone,
        temail: email,
      };
      reduxDispatch(setCurrentIndex(1));
      reduxDispatch(setTravlerInfo(travelerInfo));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="traveler-info-wrapper">
      <div className="traveler-name-wrapper">
        <div className="traveler-first-name">
          <Grid
            container
            spacing={0.5}
            direction="column"
            className="input-container"
          >
            <Grid item>
              <label htmlFor="first-name" className="traveler-first-name-label">
                {t("travelerInfo.firstName")}
              </label>
            </Grid>
            <Grid item>
              <TextField
                id="first-name"
                variant="outlined"
                className="text-field"
                value={firstName}
                error={!!firstNameError}
                helperText={firstNameError}
                onBlur={() => handleFirstNameChange(firstName)}
                onChange={(e) => handleFirstNameChange(e.target.value)}
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
        <div className="traveler-last-name">
          <Grid
            container
            spacing={0.5}
            direction="column"
            className="input-container"
          >
            <Grid item>
              <label htmlFor="last-name" className="traveler-last-name-label">
                {t("travelerInfo.lastName")}
              </label>
            </Grid>
            <Grid item>
              <TextField
                id="last-name"
                variant="outlined"
                className="text-field"
                value={lastName}
                error={!!lastNameError}
                helperText={lastNameError}
                onBlur={() => handleLastNameChange(lastName)}
                onChange={(e) => handleLastNameChange(e.target.value)}
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
      <div className="traveler-phone-wrapper">
        <Grid
          container
          spacing={0.5}
          direction="column"
          className="input-container"
        >
          <Grid item>
            <label htmlFor="phone" className="traveler-phone-label">
              {t("travelerInfo.phone")}
            </label>
          </Grid>
          <Grid item>
            <TextField
              id="phone"
              variant="outlined"
              className="text-field"
              type="tel"
              inputProps={{maxLength: 10 }}
              value={phone}
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
              onBlur={() => handlePhoneChange(phone)}
              onChange={(e) => handlePhoneChange(e.target.value)}
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
      <div className="traveler-email-wrapper">
        <Grid
          container
          spacing={0.5}
          direction="column"
          className="input-container"
        >
          <Grid item>
            <label htmlFor="email" className="traveler-email-label">
              {t("travelerInfo.email")}
            </label>
          </Grid>
          <Grid item>
            <TextField
              id="email"
              variant="outlined"
              className="text-field"
              value={email}
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
              onBlur={() => handleEmailChange(email)}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
      <div className="traveler-submit-button">
        <button type="submit" className="traveler-button">
          {t("travelerInfo.button")}
        </button>
      </div>
    </form>
  );
}
