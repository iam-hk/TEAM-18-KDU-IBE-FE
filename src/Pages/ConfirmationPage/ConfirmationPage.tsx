import React, { useRef, useState } from "react";
import "./ConfirmationPage.scss";
import downArrow from "../../assets/down-arrow.png";
import upArrow from "../../assets/up-arrow.png";
import userIcon from "../../assets/u_user.png";

export default function ConfirmationPage() {

  const [totalSummary,setTotalSummary] = useState<boolean>(false);
  const [guestInformation,setGuestInformation] = useState<boolean>(false);
  const [billing,setBilling] = useState<boolean>(false);
  const [paymentInformation,setPaymentInformation] = useState<boolean>(false);


  async function handlePrint(){
    console.log("he");
    await setTotalSummary(true);
    await setGuestInformation(true);
    await setBilling(true);
    await setPaymentInformation(true);

    window.print();
  
    // Restore the original body content after printing
    // document.body.innerHTML = originalContents;
  };

  const toggleSummary=()=>{
    setTotalSummary(!totalSummary);
  }

  const toggleGuestInformation = ()=>{
    setGuestInformation(!guestInformation);
  }
  
  const toggleBilling = () =>{
    setBilling(!billing);
  }

  const togglePayment = () =>{
    setPaymentInformation(!paymentInformation);
  }


  return (
    <div className="confirmation_main_container" id="printable_content">
      <div className="bookingId_print_or_email_container">
        <div className="reservation_id_container">
          Upcoming reservation #XXXXXXXXXX
        </div>
        <div className="print_or_email_box">
          <button className="print_button" onClick={handlePrint}>Print</button>
          <button className="email_button">Email</button>
        </div>
      </div>

      <div className="all_information_of_reservation_container" >
        <div className="room_type_details_container">
          <div className="title_of_booked_room">
            <div className="roomType_title_and_guest_container">
              <div className="room_type_name">Room 1 : Executive Room</div>
              <div className="guest_type_count_box">
              <img
                          className="user_icon_count"
                          src={userIcon}
                          alt="notfound"
                        />
                        <span className="content_count_guest">
                          2 adults,1 child
                          </span>
                          </div>
            </div>
            <div className="cancel_button_container">
              <button className="cancel_button">Cancel Room</button>
            </div>
          </div>
          <div className="image_and_details_container">
            <div className="image_container_of_room_type">
              <img className="actual_image"src="https://images.unsplash.com/photo-1711924847907-498771a92bde?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
            </div>
            <div className="dates_promocode_container">
              <div className="checkin_checkout_date_container">
                <div className="checkin_box">
                  <div className="checkin_title">Check in</div>
                  <div className="checkin_day">9</div>
                  <div className="checkin_month_year">May 2024</div>
                </div>
                <div className="checkout_box">
                  <div className="checkout_title">Check Out</div>
                  <div className="checkout_day">10</div>
                  <div className="checkout_month_year">May 2024</div>
                </div>
              </div>

              <div className="package_information">
                <div className="package_title_box">
                  $150 Dining Credit Package
                </div>
                <div className="package_description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequatur, quo?
                </div>
              </div>

              <div className="cancellation_and_bill_information">
                <div className="cancellation_policy">
                  Lorem ipsum dolor sit amet.
                </div>
                <div className="total_bill">$XXX/night total</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bill_summary_container">
          <div className="arrow_button" onClick={toggleSummary}>
            <img src={downArrow}
            alt="down-arrow"
            style={{display:totalSummary ? "none" : "block"}}/>
            <img src={upArrow}
            alt="down-arrow"
            style={{display:totalSummary ? "block" : "none"}}/>

          </div>
          <div className="all_details">
            <div className="title_bill_summary" onClick={toggleSummary}>Room Total summary</div>
            {totalSummary && <div className="break_down_bill_box">
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Nightly rate</div>
                <div className="value_of_nightly_rate">$XXXX</div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Subtotal</div>
                <div className="value_of_nightly_rate">$XXX.xx</div>
              </div>

              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Taxes,Surcharges,Fees</div>
                <div className="value_of_nightly_rate">$XXX.xx</div>
              </div>

              <div className="nightly_rate_box">
                <div className="title_nightly_rate">VAT</div>
                <div className="value_of_nightly_rate">$XXX.xx</div>
              </div>

              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Total for stay</div>
                <div className="value_of_nightly_rate">$XXX.xx</div>
              </div>
            </div>}
          </div>
        </div>

        <div className="guest_information_container">
          <div className="arrow_button" onClick={toggleGuestInformation}>
          <img src={downArrow}
            alt="down-arrow"
            style={{display:guestInformation ? "none" : "block"}}/>
            <img src={upArrow}
            alt="down-arrow"
            style={{display:guestInformation ? "block" : "none"}}/>
          </div>
          <div className="all_details">
            <div className="title_bill_summary" onClick={toggleGuestInformation}>Guest Information</div>
            {guestInformation && <div className="break_down_bill_box">
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">First Name</div>
                <div className="value_of_nightly_rate">Ankush</div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Middle Name</div>
                <div className="value_of_nightly_rate"> -- </div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Last Name</div>
                <div className="value_of_nightly_rate">Rauniyar</div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Phone</div>
                <div className="value_of_nightly_rate">9123569462</div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Alternate Phone</div>
                <div className="value_of_nightly_rate">--</div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Email</div>
                <div className="value_of_nightly_rate">
                  ankushrauni@gmail.com
                </div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Alternate Email</div>
                <div className="value_of_nightly_rate"> -- </div>
              </div>
            </div>}
          </div>
        </div>
        <div className="billing_address_box">
          <div className="arrow_button" onClick={toggleBilling}>
          <img src={downArrow}
            alt="down-arrow"
            style={{display:billing ? "none" : "block"}}/>
            <img src={upArrow}
            alt="down-arrow"
            style={{display:billing ? "block" : "none"}}/>
          </div>
          <div className="all_details">
            <div className="title_bill_summary" onClick={toggleBilling}>Billing Address</div>
            {billing && <div className="break_down_bill_box">
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">First Name</div>
                <div className="value_of_nightly_rate">Ankush</div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Middle Name</div>
                <div className="value_of_nightly_rate"> -- </div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Last Name</div>
                <div className="value_of_nightly_rate">Rauniyar</div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Mailing Address</div>
                <div className="value_of_nightly_rate">
                  ankushrauni@gmail.com
                </div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">
                  Alternate Mailing Address
                </div>
                <div className="value_of_nightly_rate">--</div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Country</div>
                <div className="value_of_nightly_rate">Nepal</div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">State</div>
                <div className="value_of_nightly_rate">Bagmati</div>
              </div>

              <div className="nightly_rate_box">
                <div className="title_nightly_rate">City</div>
                <div className="value_of_nightly_rate">Kathmandu</div>
              </div>

              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Zip</div>
                <div className="value_of_nightly_rate">56400</div>
              </div>

              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Phone</div>
                <div className="value_of_nightly_rate">9123569462</div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Alternate Phone</div>
                <div className="value_of_nightly_rate">--</div>
              </div>

              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Email</div>
                <div className="value_of_nightly_rate">
                  ankushrauni@gmail.com
                </div>
              </div>

              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Alternate Email</div>
                <div className="value_of_nightly_rate">
                  ankushrauni@gmail.com
                </div>
              </div>
            </div>}
          </div>
        </div>
        <div className="payment_details_box">
          <div className="arrow_button" onClick={togglePayment}>
          <img src={downArrow}
            alt="down-arrow"
            style={{display:paymentInformation ? "none" : "block"}}/>
            <img src={upArrow}
            alt="down-arrow"
            style={{display:paymentInformation ? "block" : "none"}}/>
          </div>
          <div className="all_details">
            <div className="title_bill_summary" onClick={togglePayment}>Payment Information</div>
            {paymentInformation && <div className="break_down_bill_box">
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Card Number</div>
                <div className="value_of_nightly_rate">****_****_***_*4-12</div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Expiry Month</div>
                <div className="value_of_nightly_rate"> Decemeber </div>
              </div>
              <div className="nightly_rate_box">
                <div className="title_nightly_rate">Expiry Year</div>
                <div className="value_of_nightly_rate"> 2023 </div>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
