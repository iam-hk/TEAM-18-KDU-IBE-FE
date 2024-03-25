import { Provider } from "react-redux";
import { store } from "../../../../src/redux/Store";
import RoomBeds from "../../../../src/Component/RoomSearchPage/RoomBeds/RoomBeds";

describe("<RoomBeds />", () => {
  it("mounts", () => {
    cy.viewport(
      parseInt(`${import.meta.env.VITE_VIEWPORT_WIDTH}`),
      parseInt(`${import.meta.env.VITE_VIEWPORT_HEIGHT}`)
    );
    cy.mount(
      <Provider store={store}>
        <RoomBeds />
      </Provider>
    );
    cy.get(".room-page-selected-beds .MuiSelect-select").should("exist");
    cy.get(".room-page-selected-beds .MuiSelect-select").contains("Beds");
    cy.get(".room-page-selected-beds .MuiSelect-select").click();
    cy.get('[data-value="2"]').click();
    cy.get(".beds-selected").should("have.text", "2");
  });
});
