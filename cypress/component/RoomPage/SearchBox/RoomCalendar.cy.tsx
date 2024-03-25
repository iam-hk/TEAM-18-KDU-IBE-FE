import { Provider } from "react-redux";
import { store } from "../../../../src/redux/Store";
import { RoomCalendar } from "../../../../src/Component/RoomSearchPage/RoomCalendar/RoomCalendar";

describe("<RoomCalendar />", () => {
  it("mounts", () => {
    cy.viewport(
      parseInt(`${import.meta.env.VITE_VIEWPORT_WIDTH}`),
      parseInt(`${import.meta.env.VITE_VIEWPORT_HEIGHT}`)
    );
    cy.mount(
      <Provider store={store}>
        <RoomCalendar />
      </Provider>
    );
    cy.contains(".date-component", "Check in between").should("exist");
    cy.contains(".date-component", "Check out between").should("exist");
    cy.get(".date-calender-icon").should("be.visible");
  });
});
