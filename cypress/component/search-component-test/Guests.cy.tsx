import { Provider } from "react-redux";
import { store } from "../../../src/redux/Store";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../src/Constants/LanguageTranslator";
import { Guests } from "../../../src/Component/Search/guests/Guests";
describe("<Guests />", () => {
  it("mounts", () => {
    cy.viewport(
      parseInt(`${import.meta.env.VITE_VIEWPORT_WIDTH}`),
      parseInt(`${import.meta.env.VITE_VIEWPORT_HEIGHT}`)
    );
    cy.mount(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Guests />
        </I18nextProvider>
      </Provider>
    );
  });
});
