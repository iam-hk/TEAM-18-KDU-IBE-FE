import { Grid, MenuItem, Select, TextField } from "@mui/material";
import "./BillingInfo.scss";
import { Country, State, City } from "country-state-city";
export function BillingInfo() {
  // console.log(Country.getAllCountries(), "countries");
  // console.log(State.getAllStates());
  // console.log(City.getAllCities(), "cities");
  const countries = Country.getAllCountries();

  function handleBillingSubmit() {}
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
                  First Name
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="first-name"
                  variant="outlined"
                  className="text-field"
                  required
                  inputProps={{
                    pattern: "[A-Za-z]*",
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
                  Last Name
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="last-name"
                  variant="outlined"
                  className="text-field"
                  required
                  inputProps={{
                    pattern: "[A-Za-z]*",
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
                  htmlFor="first-name"
                  className="billing-first-address-label"
                >
                  Mailing Address 1
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="first-name"
                  variant="outlined"
                  className="text-field"
                  required
                  type="email"
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
                  htmlFor="last-name"
                  className="billing-second-address-label"
                >
                  Mailing Address 2
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="last-name"
                  variant="outlined"
                  className="text-field"
                  required
                  type="email"
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
                Country
              </label>
            </Grid>
            <Grid item>
              <Select
                id="country"
                variant="outlined"
                className="text-field"
                defaultValue=""
                required
              >
                <MenuItem value="">Select Country</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="Germany">Germany</MenuItem>
                {/* Add more countries as needed */}
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
                <label htmlFor="phone" className="billing-city-label">
                  City
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="city"
                  variant="outlined"
                  className="text-field"
                  required
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
                    State
                  </label>
                </Grid>
                <Grid item>
                  <Select
                    id="state"
                    variant="outlined"
                    className="text-field"
                    defaultValue=""
                  >
                    <MenuItem value="">Select State</MenuItem>
                    <MenuItem value="California">California</MenuItem>
                    <MenuItem value="New York">New York</MenuItem>
                    <MenuItem value="Texas">Texas</MenuItem>
                    {/* Add more states as needed */}
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
                    Zip
                  </label>
                </Grid>
                <Grid item>
                  <TextField
                    id="zip"
                    variant="outlined"
                    className="text-field"
                    required
                    inputProps={{ pattern: "^[0-9]{4,5}$" }}
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
                Phone
              </label>
            </Grid>
            <Grid item>
              <TextField
                id="phone"
                variant="outlined"
                className="text-field"
                required
                type="tel"
                inputProps={{ pattern: "[0-9]{10}" }}
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
                Email
              </label>
            </Grid>
            <Grid item>
              <TextField
                id="email"
                type="email"
                variant="outlined"
                className="text-field"
                required
              />
            </Grid>
          </Grid>
        </div>
        <div className="billing-button-wrapper">
          <button className="edit-traveler">Edit Traveler Info.</button>
          <button className="billing-button">NEXT: PAYMENT INFO</button>
        </div>
      </div>
    </form>
  );
}
