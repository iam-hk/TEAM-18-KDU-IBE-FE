import { Provider } from "react-redux";
import { store } from "../../../src/redux/Store";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../src/Constants/LanguageTranslator";
import { DateCalender } from "../../../src/Component/Search/dateCalendar/DateCalendar";
describe("<Calendar />", () => {
  it("mounts", () => {
    cy.viewport(
      parseInt(`${import.meta.env.VITE_VIEWPORT_WIDTH}`),
      parseInt(`${import.meta.env.VITE_VIEWPORT_HEIGHT}`)
    );
    cy.mount(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <DateCalender />
        </I18nextProvider>
      </Provider>
    );
    cy.get(".date-container").should("be.visible");
    cy.get(".date-container").should("contain", "Select dates");
    cy.get(".date-input-wrapper img").should("exist");
  });
});
