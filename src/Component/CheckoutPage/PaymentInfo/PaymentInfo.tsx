import { Grid, TextField } from "@mui/material";
import "./PaymentInfo.scss";
export function PaymentInfo() {
  return (
    <div className="payment-info-wrapper">
      <div className="payment-card-wrapper">
        <div className="payment-cardname-wrapper">
          <Grid
            container
            spacing={0.5}
            direction="column"
            className="input-container"
          >
            <Grid item>
              <label htmlFor="card-name" className="payment-cardname-label">
                Card Name
              </label>
            </Grid>
            <Grid item>
              <TextField
                id="card-name"
                variant="outlined"
                className="text-field"
              />
            </Grid>
          </Grid>
        </div>
        <div className="payment-month-year-wrapper">
          <div className="payment-month-wrapper">
            <Grid
              container
              spacing={0.5}
              direction="column"
              className="input-container"
            >
              <Grid item>
                <label htmlFor="exp-mm" className="payment-month-label">
                  Exp MM
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="exp-mm"
                  variant="outlined"
                  className="text-field"
                />
              </Grid>
            </Grid>
          </div>
          <div className="payment-year-wrapper">
            <Grid
              container
              spacing={0.5}
              direction="column"
              className="input-container"
            >
              <Grid item>
                <label htmlFor="exp-yy" className="payment-year-label">
                  Exp YY
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="exp-yy"
                  variant="outlined"
                  className="text-field"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <div className="payment-cvv-wrapper">
        <Grid
          container
          spacing={0.5}
          direction="column"
          className="input-container"
        >
          <Grid item>
            <label htmlFor="card-name" className="payment-cvv-label">
              CVV
            </label>
          </Grid>
          <Grid item>
            <TextField
              id="card-name"
              variant="outlined"
              className="text-field"
              type="password"
            />
          </Grid>
        </Grid>
      </div>
      <div className="checkbox-wrapper">
        <div className="special-offers">
          <input type="checkbox" />
          <div className="special-offer-text">Send me special offers</div>
        </div>

        <div className="terms-policies">
          <input type="checkbox" />
          <div className="terms-test">
            I agree to the Terms and Policies of travel
          </div>
        </div>
      </div>
      <div className="payment-bottom-wrapper">
        <div className="payment-amount-container">
          <div className="payment-amount-text">Total Due</div>
          <div className="payment-amount-figure">$XXX.XX</div>
        </div>
        <div className="payment-button-wrapper">
          <button className="edit-billing">Edit Billing Info.</button>
          <button className="purchase-button">PURCHASE</button>
        </div>
      </div>
    </div>
  );
}
