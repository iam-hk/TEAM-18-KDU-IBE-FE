import { Provider } from "react-redux";
import { store } from "../../../../src/redux/Store";
import Guests from "../../../../src/Component/RoomSearchPage/Guests/RoomGuests";

describe("<Guests />", () => {
  it("mounts", () => {
    cy.viewport(
      parseInt(`${import.meta.env.VITE_VIEWPORT_WIDTH}`),
      parseInt(`${import.meta.env.VITE_VIEWPORT_HEIGHT}`)
    );
    cy.mount(
      <Provider store={store}>
        <Guests />
      </Provider>
    );
    cy.get(".room-page-guest-display").should("exist");
    cy.get(".room-page-guest-display").click();
    cy.get(".room-page-guest-display").should("be.visible");
  });
});
