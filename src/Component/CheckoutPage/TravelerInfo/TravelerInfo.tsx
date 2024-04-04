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

export function TravelerInfo() {
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
  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
  };
  const handleLastNameChange = (value: string) => {
    setLastName(value);
  };
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };
  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const travelerInfo: ITravelerInfo = {
      tfirstName: firstName,
      tlastName: lastName,
      tphone: phone,
      temail: email,
    };
    reduxDispatch(setCurrentIndex(1));
    reduxDispatch(setTravlerInfo(travelerInfo));
    
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
                required
                inputProps={{ pattern: "[A-Za-z]+" }}
                value={firstName}
                error={!/^[a-zA-Z]*$/.test(firstName)}
                helperText={
                  !/^[a-zA-Z]*$/.test(firstName)
                    ? "Please enter a valid first name."
                    : ""
                }
                onChange={(e) => handleFirstNameChange(e.target.value)}
                onKeyDown={(e) => {
                  const keyCode = e.keyCode;

                  if (
                    (keyCode >= 65 && keyCode <= 90) ||
                    (keyCode >= 97 && keyCode <= 122) ||
                    keyCode === 32 ||
                    keyCode === 9 ||
                    keyCode === 8 ||
                    keyCode === 37 ||
                    keyCode === 39
                  ) {
                    return;
                  }
                  e.preventDefault();
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
                error={!/^[a-zA-Z]*$/.test(lastName)}
                helperText={
                  !/^[a-zA-Z]*$/.test(lastName)
                    ? "Please enter a valid first name."
                    : ""
                }
                onKeyDown={(e) => {
                  const keyCode = e.keyCode;

                  if (
                    (keyCode >= 65 && keyCode <= 90) ||
                    (keyCode >= 97 && keyCode <= 122) ||
                    keyCode === 32 ||
                    keyCode === 9 ||
                    keyCode === 8 ||
                    keyCode === 37 ||
                    keyCode === 39
                  ) {
                    return;
                  }
                  e.preventDefault();
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
              error={phone !== "" && !/^[0-9]{10}$/.test(phone)}
              helperText={
                phone !== "" && !/^[0-9]{10}$/.test(phone)
                  ? "Please enter a valid 10-digit phone number"
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
              error={
                email !== "" &&
                !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)
              }
              helperText={
                email !== "" &&
                !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)
                  ? "Please enter a valid email address"
                  : ""
              }
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
