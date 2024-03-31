describe("home page", () => {
  it("passes", () => {
    //Header
    cy.visit("http://localhost:5173");
    cy.get(".language-selection").should("be.visible");
    cy.get(".currency-selection").should("be.visible");
    cy.get(".currency-selection option").should("have.length", 3);
    cy.get(".language-selection option").should("have.length", 3);
    cy.get(".my-bookings").should("be.visible").and("contain", "MY BOOKINGS");
    //Footer
    cy.get(".left-heading h2").contains("Kickdrum").should("be.visible");
    cy.get(".right-heading h4")
      .eq(0)
      .contains("Kickdrum Technology Group LLC")
      .should("be.visible");
    cy.get(".right-heading h4")
      .eq(1)
      .contains("All Rights Reserved")
      .should("be.visible");
    //Search Form
    cy.get(".search-property-name h4").should("contain", "Property name*");
    cy.wait(2000);
    cy.get(".MuiSelect-select").click();
    cy.get(".MuiMenu-root").find("li").last().click();
    cy.get(".date-container").should("be.visible");
    cy.get(".date-container").should("contain", "Select dates");
    cy.get(".input-date-container").click();
    cy.get("body").click();
    cy.get(".guests").should("be.visible").and("contain", "Guests");
    cy.get(".guests .MuiSelect-select").click();
    cy.get(".MuiPopover-root .MuiList-root .MuiMenuItem-root").should(
      "have.length",
      3
    );
    cy.get("body").click();
    cy.contains("Rooms").should("exist");
    cy.get(".rooms .MuiSelect-select").click();
    cy.get("body").click();
    cy.get(".disabled-checkbox")
      .should("exist")
      .then(() => {
        cy.get(".disabled-checkbox input[type='checkbox']").should("exist");
        cy.get(".disabled-checkbox h5").should(
          "contain",
          "I need an accessible room"
        );
      });
    cy.get(".submit-button>button");
    cy.get(".submit-button>button").should("be.visible").should("be.disabled");
    cy.get(".submit-button button").should("contain", "SEARCH");
    cy.get(".military-checkbox > .search-wrapper-label > h5").should(
      "contain",
      "Military Service Veteran ?"
    );
  });
  // Room Page
  it("Room Page", () => {
    cy.visit(
      "http://localhost:5173/rooms?id=18&guestCount=1&roomCount=1&startDate=2024-03-25&endDate=2024-03-26&Adults=1&Kids=0&Teens=0&bedCount=1&sortType=true&sortTerm=price"
    );
    cy.wait(8000);
    //room beds
    cy.get(".room-page-selected-beds .MuiSelect-select").should("exist");
    cy.get(".room-page-selected-beds .MuiSelect-select").contains("Beds");
    cy.get(".room-page-selected-beds .MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".beds-selected").should("have.text", "2");
    //room Calendar
    cy.contains(".date-component", "Check in between").should("exist");
    cy.contains(".date-component", "Check out between").should("exist");
    cy.get(".date-calender-icon").should("be.visible");
    //room filters
    cy.get(".filter-heading-text").contains("Narrow Your Results");
    cy.get(".filter-name").contains("Bed");
    cy.get(
      ':nth-child(2) > .filter-name > .arrow > [src="/src/assets/down-arrow.png"]'
    ).click();
    cy.get(":nth-child(2) > .filter-name").should("exist");
    cy.get(":nth-child(3) > .filter-name > .filter-content")
      .should("exist")
      .should("contain", "Room type");
    cy.get(".filter-type > :nth-child(1)")
      .find('input[type="checkbox"]')
      .should("exist");
    //room guests
    cy.get(".room-page-guest-display").should("exist");
    cy.get(".room-page-guest-display").should("be.visible");

    cy.get(".checkbox-wrapper .disabled-person .checkbox-input")
      .should("have.length", 1)
      .click();

    cy.get(".search-submit-button .search-submit")
      .should("exist")
      .and("have.text", "SEARCH DATES")
      .click();
    //room page integration
    cy.get(".MuiSelect-select").should("exist");
    cy.get(".room-page-selected-rooms .selected-room").should("contain", "1");
    //selected rooms
    cy.get(".MuiSelect-select").should("exist");
    cy.get(".room-page-selected-rooms .MuiSelect-select").click();
    cy.get("body").click();
    cy.get(".room-page-selected-rooms .selected-room").should("contain", "1");

    //room results
    cy.get(".top-left-heading .room-results").should("contain", "Room Results");
    cy.get(".top-right-heading").should("exist");
    cy.get(".top-right-heading img").should("have.length", 3);

    //each card
    cy.get(".all-cards-display > :nth-child(1)");
    cy.get(
      ":nth-child(1) > .individual-roomCard > .imageOfRoomTypeContainer > .carousel-root > .carousel-slider > .slider-wrapper > .slider > :nth-child(2) > div"
    ).should("exist");

    cy.get(".propertyNameContainer")
      .should("exist")
      .should("contain", "GRAND DELUXE");

    cy.get(".reviewAndRatingContainer").should("exist");
    cy.get(".location_content").should("exist").should("contain", "Kickdrum");

    cy.get(".roomCategoryAndSizeContainer")
      .should("exist")
      .should("contain", "450 ft");

    cy.get(".maximumNumberOfGuestsContainer").should("exist");

    cy.get(".bedInformation").should("exist");
    cy.get(".priceLabelContainer")
      .should("exist")
      .should("contain", "per night");
    cy.get(".all-cards-display").should("exist");

    cy.get(".all-cards-display").each(($card, index) => {
      cy.wrap($card).should("exist");
      cy.wrap($card)
        .find(".propertyNameContainer")
        .should("exist")
        .should("contain", "GRAND DELUXE");
    });
    cy.get(
      ":nth-child(1) > .individual-roomCard > .price_containerOfRoomType > .selectRoom-btn"
    )
      .should("exist")
      .click();
    cy.get(".nameOfTheRoomType").should("contain", "GRAND DELUXE");
    cy.get(".area_maximumGuests_Beds-Container")
      .should("exist")
      .should("contain", "1-4");
    cy.get(".descriptionOfRoomType").should("exist");
    cy.get(".amenitiesTitleContainer")
      .should("exist")
      .should("contain", "Amenities");
    cy.get(".amenitiesListContainer")
      .should("exist")
      .find(".individual_amenity")
      .should("have.length", 10);
    cy.get(".standard-Container")
      .should("exist")
      .should("contain", "Standard Rate");
    cy.get(".individual_promotion_title")
      .should("exist")
      .should("contain", "Exclusive Retreat");
    cy.get(".rate_price_of_promotion").should("exist");
    cy.get(".selectPackageButton")
      .should("exist")
      .should("contain", "SELECT PACKAGE");
    cy.get(".titleOfDealsContainer")
      .should("exist")
      .should("contain", "Deals & Packages");
    cy.get(".promoCode_title")
      .should("exist")
      .should("contain", "Enter a promo code");

    cy.get(".titleOfDealsContainer")
      .should("exist")
      .should("contain", "Deals & Packages");
    cy.get(".individualDeal_rateContainer")
      .should("have.length.gt", 0)
      .each(($deal, index) => {
        cy.wrap($deal).within(() => {
          cy.get(".individual_promotion_title").should("exist");
          cy.get(".individual_promotion_description").should("exist");
          cy.get(".rate_price_of_promotion").should("exist");
        });
      });
    cy.get(
      ".dealsAndPackagesContainer > :nth-child(2) > .right-container_rateBox > .selectPackageButton"
    ).click();

    //itinerary test
    cy.get(".itinerary").should("exist");
    cy.contains(".itinerary-heading", "Your Trip Itinerary").should("exist");
    cy.get(".itinerary-hotel-name").should("exist");
    cy.get(".itinerary-hotel-remove").should("exist");
    cy.contains(".date-details", "March 25 - March 26, 2024").should("exist");
    cy.contains(".room-name", "GRAND DELUXE").should("exist");
    cy.contains(".room-count", "1 room").should("exist");
    cy.get(".itinerary-each-day-rate-details").should("have.length", 2);
    cy.get(".itinerary-promocode").should("exist");
    cy.get(".itinerary-taxes").should("exist");
    cy.contains(".itinerary-vat-field", "VAT").should("exist");
    cy.contains(".itinerary-due-now", "Due Now").should("exist");
    cy.get(".itinerary-checkout-button").should("exist");
    cy.get(".checkout-wrapper").should("exist");

    cy.get("form").within(() => {
      cy.get(".email-heading").should("exist");
      cy.get("input[type='email']").should("exist");
    });
    cy.get(".stepper-container").should("exist");

    const steps = ["Choose Room", "Choose add on", "Checkout"];
    cy.get(".stepper").within(() => {
      steps.forEach((label) => {
        cy.contains(label).should("exist");
      });
    });
    cy.get(".active-label").should("contain.text", "3:Checkout");
  });
  it("Review Page", () => {
    cy.visit("http://localhost:5173/review");
    cy.get(".review-form-wrapper").should("exist");
    cy.contains(".review-form-heading", "Review Form").should("be.visible");
    cy.contains("label[for='stars']", "Stars:").should("be.visible");
    cy.contains("label[for='review']", "Review:").should("be.visible");
    cy.contains("button", "Submit").should("be.visible");

    cy.get("form").within(() => {
      cy.get(".stars-container").should("be.visible");
      cy.get("textarea#review").should("be.visible");
      cy.get("button[type='submit']").should("be.visible");
    });

    // Check if snackbar is not initially visible
    cy.get(".snackbar").should("not.exist");

   
  });
});
