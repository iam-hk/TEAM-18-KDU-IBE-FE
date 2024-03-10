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
    cy.get(".main-heading").should("contain", "Kickdrum");
    cy.get(".sub-heading").should("contain", "Internet Booking Engine");
  });
});
