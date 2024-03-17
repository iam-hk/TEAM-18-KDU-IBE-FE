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
    cy.get(".language-selection").should("be.visible");
    cy.get(".currency-selection").should("be.visible");
    cy.get(".currency-selection option").should("have.length", 3);
    cy.get(".language-selection option").should("have.length", 3);
    cy.get(".my-bookings").should("be.visible").and("contain", "MY BOOKINGS");
  });
});