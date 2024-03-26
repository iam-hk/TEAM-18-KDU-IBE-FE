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
    cy.get(".submit-button button").should("contain", "Search");
  });
  //Room Page
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
    cy.get(".filter-name").contains("Bed Type").parent().find(".arrow").click();
    cy.get(":nth-child(2) > .filter-name").should("exist");
    cy.contains(".filter-name", "Room Type").should("exist");
    cy.get(".filter-type > :nth-child(1)")
      .find('input[type="checkbox"]')
      .should("exist");
    //room gusts
    cy.get(".room-page-guest-display").should("exist");
    cy.get(".room-page-guest-display").should("be.visible");
    //room page integration
    cy.get(".MuiSelect-select").should("exist");
    cy.get(".room-page-selected-rooms .selected-room").should("contain", "1");
    //selected rooms
    cy.get(".MuiSelect-select").should("exist");
    cy.get(".room-page-selected-rooms .MuiSelect-select").click();
    cy.get("body").click();
    cy.get(".room-page-selected-rooms .selected-room").should("contain", "1");
  });
});
