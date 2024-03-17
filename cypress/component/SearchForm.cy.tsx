import { Provider } from "react-redux";
import { store } from "../../src/redux/Store";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/Constants/LanguageTranslator";
import { SearchForm } from "../../src/Component/Search/searchForm/SearchForm";

describe("<SearchForm />", () => {
  it("mounts", () => {
    cy.viewport(
      parseInt(`${import.meta.env.VITE_VIEWPORT_WIDTH}`),
      parseInt(`${import.meta.env.VITE_VIEWPORT_HEIGHT}`)
    );
    cy.mount(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <SearchForm />
        </I18nextProvider>
      </Provider>
    );
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
    cy.get(".MuiMenu-root").find("li").should("have.length", 10);
    cy.get("body").click();
    cy.get(".disabled-checkbox").should("exist").then(() => {
        cy.get(".disabled-checkbox input[type='checkbox']").should("exist");
        cy.get(".disabled-checkbox h5").should(
          "contain",
          "I need an accessible room"
        );
    });
    cy.get(".submit-button button")
    .should("be.visible")
    .should("not.be.disabled")
    .click();
  cy.get(".submit-button button").should("contain", "Search");
  });
});
