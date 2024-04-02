import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import "./TravelerInfo.scss";
import { AppDispatch, RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentIndex,
  setTravelerEmail,
  setTravelerFirstName,
  setTravelerLastName,
  setTravelerPhone,
} from "../../../redux/CheckoutSlice";

export function TravelerInfo() {
  const reduxDispatch: AppDispatch = useDispatch();
  const firstName = useSelector(
    (state: RootState) => state.checkoutRoom.travelerInfo.tfirstName
  );
  const lastName = useSelector(
    (state: RootState) => state.checkoutRoom.travelerInfo.tlastName
  );
  const phone = useSelector(
    (state: RootState) => state.checkoutRoom.travelerInfo.tphone
  );
  const email = useSelector(
    (state: RootState) => state.checkoutRoom.travelerInfo.temail
  );
  const handleValidation = () => {
    if (!firstName || !lastName || !phone || !email) {
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid phone number");
      return false;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      alert("Please enter a valid email address");
      return false;
    }

    return true;
  };
  const handleFirstNameChange = (value: string) => {
    reduxDispatch(setTravelerFirstName(value));
  };
  const handleLastNameChange = (value: string) => {
    reduxDispatch(setTravelerLastName(value));
  };
  const handleEmailChange = (value: string) => {
    reduxDispatch(setTravelerEmail(value));
  };
  const handlePhoneChange = (value: string) => {
    reduxDispatch(setTravelerPhone(value));
  };
  const handleSubmit = () => {
    if (handleValidation()) {
      reduxDispatch(setCurrentIndex(1));
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
                First Name
              </label>
            </Grid>
            <Grid item>
              <TextField
                id="first-name"
                variant="outlined"
                className="text-field"
                inputProps={{ pattern: "[A-Za-z]+" }}
                value={firstName}
                required
                onChange={(e) => handleFirstNameChange(e.target.value)}
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
                Last Name
              </label>
            </Grid>
            <Grid item>
              <TextField
                id="last-name"
                variant="outlined"
                className="text-field"
                inputProps={{ pattern: "[A-Za-z]+" }}
                value={lastName}
                required
                onChange={(e) => handleLastNameChange(e.target.value)}
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
              Phone
            </label>
          </Grid>
          <Grid item>
            <TextField
              id="phone"
              variant="outlined"
              className="text-field"
              type="tel"
              inputProps={{ pattern: "[0-9]{10}" }}
              value={phone}
              required
              onChange={(e) => handlePhoneChange(e.target.value)}
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
              Email
            </label>
          </Grid>
          <Grid item>
            <TextField
              id="email"
              variant="outlined"
              className="text-field"
              value={email}
              required
              type="email"
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
      <div className="traveler-submit-button">
        <button type="submit" className="traveler-button">
          NEXT: BILLING INFO
        </button>
      </div>
    </form>
  );
}
