import { Provider } from "react-redux";
import { store } from "../../src/redux/Store";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/constants/LanguageTranslator";
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
  });
});
