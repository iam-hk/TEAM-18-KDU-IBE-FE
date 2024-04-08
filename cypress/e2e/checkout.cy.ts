describe("checkout page", () => {
    it("passes", () => {
      cy.visit("http://localhost:5173/rooms?id=18&guestCount=3&roomCount=1&startDate=2024-04-08&endDate=2024-04-14&Adults=1&Kids=1&Teens=1&bedCount=1");
      cy.wait(3000);
      cy.get(':nth-child(1) > .individual-roomCard > .price_containerOfRoomType > .selectRoom-btn').click();
      cy.get('.dealsAndPackagesContainer > :nth-child(2) > .right-container_rateBox > .selectPackageButton').click();
      cy.get('.form-heading').should('contain', 'Payment Info');
      //traveler infof
      cy.get('.traveler-heading').should('contain', 'Traveler Info');
    cy.get('.traveler-first-name-label').should('contain', 'First Name');
    cy.get('.traveler-last-name-label').should('contain', 'Last Name');
    cy.get('#first-name').type('Harsh');
    cy.get('#last-name').type('Kachhawa');
    cy.get('.traveler-phone-label').should('contain', 'Phone');
    cy.get('#phone').type('1222222222');
    cy.get('.traveler-email-label').should('contain', 'Email');
    cy.get('#email').type('harsh.kachhawa2002@gmail.com');
    cy.get('.traveler-button').should('be.visible').click();
    //billing info
    cy.get('.billing-heading').should('contain', 'Billing Info');
    cy.get('.billing-first-name-label').should('contain', 'First Name');
    cy.get('#first-name').type('Harsh');
    cy.get('.billing-last-name-label').should('contain', 'Last Name');
    cy.get('#last-name').type('Kachhawa');
    cy.get('.billing-first-address-label').should('contain', 'Mailing Address 1');
    cy.get('#mail-primary').type('27 Sova Bazar');
    cy.get('.billing-second-address-label').should('contain', 'Mailing Address 2');
    cy.get('#mail-secondary').type('27 Lal Bazar');
    cy.get('.billing-country-label').should('contain', 'Country');
    cy.get('#city').type('Kolkata');
    cy.get('.billing-state-label').should('contain', 'State');
    cy.get('.billing-zip-label').should('contain', 'Zip');
    cy.get('#zip').type('3354');
    cy.get('.billing-phone-label').should('contain', 'Phone');
    cy.get('#phone').type('9494949494');
    cy.get('.billing-email-label').should('contain', 'Email');
    cy.get('#email').type('harsh.kachhawa@gmail.com');
    cy.get('.billing-button').should('be.visible');

    });
    it("passes", () => {
        cy.visit('http://localhost:5173/confirmation?id=859666c2-71c3-4679-8bd9-884d189818da');
        cy.get('.reservation_id_container').should('contain.text', 'Upcoming reservation #859666c2-71c3-4679-8bd9-884d189818da');
  cy.get('.room_type_name').should('contain.text', 'Rooms 1 : Super Deluxe');
  cy.get('.content_count_guest').should('contain.text', 'Adults 1');
  cy.get('.cancel_button').should('be.visible').and('contain.text', 'Cancel Room');
  cy.get('.print_button').should('be.visible').and('contain.text', 'Print');
  cy.get('.email_button').should('be.visible').and('contain.text', 'Email');
  cy.get('.checkin_title').should('contain.text', 'Check-in');
  cy.get('.checkin_day').should('contain.text', '13');
  cy.get('.checkin_month_year').should('contain.text', 'April 2024');
  cy.get('.package_title_box').should('contain.text', 'Long weekend discount');
  cy.get('.package_description').should('contain.text', 'Applies only if trip more than 2 days and across weekends');
  
  // Open and close cancellation policy modal
  cy.get('.cancellation_policy').click();
  cy.get('.cancellation-policies-modal').should('be.visible');
  cy.get('body').click('topRight');

  // Expand bill summary
  cy.get('.bill_summary_container > .arrow_button > [src="/src/assets/down-arrow.png"]').click();
  cy.get('.all_details > .title_bill_summary').should('contain.text', 'Room Total Summary');

  // Expand guest information
  cy.get('.guest_information_container > .arrow_button > [src="/src/assets/down-arrow.png"]').click()
  cy.get('.all_details > .title_bill_summary').should('contain.text', 'Guest Information');
  cy.get('.break_down_bill_box > :nth-child(1) > .title_nightly_rate').should('contain.text', 'First Name');
  cy.get('.break_down_bill_box > :nth-child(2) > .title_nightly_rate').should('contain.text', 'Middle Name');
  cy.get('.break_down_bill_box > :nth-child(3) > .title_nightly_rate').should('contain.text', 'Last Name');
  cy.get('.break_down_bill_box > :nth-child(4) > .title_nightly_rate').should('contain.text', 'Phone');
  cy.get('.break_down_bill_box > :nth-child(5) > .title_nightly_rate').should('contain.text', 'Alternate Phone');
  cy.get(':nth-child(6) > .title_nightly_rate').should('contain.text', 'Email');
  cy.get(':nth-child(7) > .title_nightly_rate').should('contain.text', 'Alternate Email');
  
   // Verify Billing Information section
   cy.get('.billing_address_box > .all_details > .title_bill_summary').should('contain.text', 'Billing Information');
   cy.get('.billing_address_box > .arrow_button > [src="/src/assets/down-arrow.png"]').click();
   cy.get('.billing_address_box > .all_details > .break_down_bill_box > :nth-child(1) > .title_nightly_rate').should('contain.text', 'First Name');
   cy.get('.billing_address_box > .all_details > .break_down_bill_box > :nth-child(2) > .title_nightly_rate').should('contain.text', 'Middle Name');
   cy.get('.billing_address_box > .all_details > .break_down_bill_box > :nth-child(3) > .title_nightly_rate').should('contain.text', 'Last Name');
   cy.get('.billing_address_box > .all_details > .break_down_bill_box > :nth-child(4) > .title_nightly_rate').should('contain.text', 'Mailing Address');
   cy.get('.billing_address_box > .all_details > .break_down_bill_box > :nth-child(5) > .title_nightly_rate').should('contain.text', 'Alternate Mailing Address');
   cy.get('.billing_address_box > .all_details > .break_down_bill_box > :nth-child(6) > .title_nightly_rate').should('contain.text', 'Country');
   cy.get('.billing_address_box > .all_details > .break_down_bill_box > :nth-child(7) > .title_nightly_rate').should('contain.text', 'State');
   cy.get(':nth-child(8) > .title_nightly_rate').should('contain.text', 'City');
   cy.get(':nth-child(9) > .title_nightly_rate').should('contain.text', 'Zip');
   cy.get(':nth-child(10) > .title_nightly_rate').should('contain.text', 'Phone');
   cy.get(':nth-child(11) > .title_nightly_rate').should('contain.text', 'Alternate Phone');
   cy.get(':nth-child(12) > .title_nightly_rate').should('contain.text', 'Email');
   cy.get(':nth-child(13) > .title_nightly_rate').should('contain.text', 'Alternate Email');
 
   // Verify Payment Information section
   cy.get('.payment_details_box > .all_details > .title_bill_summary').should('contain.text', 'Payment Information');
   cy.get('.payment_details_box > .arrow_button > [src="/src/assets/down-arrow.png"]').click();
   cy.get('.payment_details_box > .all_details > .break_down_bill_box > :nth-child(1) > .title_nightly_rate').should('contain.text', 'Card Number');
   cy.get('.payment_details_box > .all_details > .break_down_bill_box > :nth-child(2) > .title_nightly_rate').should('contain.text', 'Expiry Month');
   cy.get('.payment_details_box > .all_details > .break_down_bill_box > :nth-child(3) > .title_nightly_rate').should('contain.text', 'Expiry Year');
 

   cy.get('.cancel_button').should('be.visible').and('contain.text', 'Cancel Room').click();

  cy.get('.cancel-heading-text').should('contain.text', 'Enter OTP for cancelling the booking');
  cy.get('input').should('exist');

  cy.get('.send-otp-button > button').should('contain.text', 'SEND OTP').click();

    })
  });
  