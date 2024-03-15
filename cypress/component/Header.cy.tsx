import { Provider } from "react-redux";
import { store } from "../../src/redux/Store";
import { Header } from "../../src/Component/Header/Header";

describe("<Header />", () => {
  it("mounts", () => {
    cy.viewport(
      parseInt(`${import.meta.env.VITE_VIEWPORT_WIDTH}`),
      parseInt(`${import.meta.env.VITE_VIEWPORT_HEIGHT}`)
    );
    cy.mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    cy.get(".header").then(($header) => {
      console.log($header);
    });
    cy.get(".currency-selection").should("be.visible");
    cy.get(".language-selection").should("be.visible");
    cy.get(".login-button").should("be.visible");
  });
});
