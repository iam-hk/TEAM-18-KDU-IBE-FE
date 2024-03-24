import { Provider } from "react-redux";
import { store } from "../../../../src/redux/Store";
import RoomSelectedRoom from "../../../../src/Component/RoomSearchPage/Rooms/RoomSelectedRoom";
describe("<SelectedRoom />", () => {
  it("mounts", () => {
    cy.viewport(
      parseInt(`${import.meta.env.VITE_VIEWPORT_WIDTH}`),
      parseInt(`${import.meta.env.VITE_VIEWPORT_HEIGHT}`)
    );
    cy.mount(
      <Provider store={store}>
        <RoomSelectedRoom />
      </Provider>
    );
    cy.get(".MuiSelect-select").should("exist");
    cy.get(".room-page-selected-rooms .MuiSelect-select").click();
    cy.get(".MuiButtonBase-root").click();
    cy.get(".room-page-selected-rooms .selected-room").should("contain", "1");
  });
});
