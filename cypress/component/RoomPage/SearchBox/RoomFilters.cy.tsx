import { Provider } from "react-redux";
import { store } from "../../../../src/redux/Store";
import Filters from "../../../../src/Component/RoomSearchPage/Filters/Filters";

describe("<Filters />", () => {
  it("mounts", () => {
    cy.viewport(
      parseInt(`${import.meta.env.VITE_VIEWPORT_WIDTH}`),
      parseInt(`${import.meta.env.VITE_VIEWPORT_HEIGHT}`)
    );
    cy.mount(
      <Provider store={store}>
        <Filters />
      </Provider>
    );
    cy.contains(".filter-heading-text", "Narrow your results").should("exist");
    cy.contains(".filter-name", "Bed type").should("exist");
    cy.get(".filter-name").contains("Bed type").parent().find(".arrow").click();
    cy.get(":nth-child(2) > .filter-name").should("exist");
    cy.contains(".filter-name", "Room type").should("exist");
    cy.get(".filter-type > :nth-child(1)")
      .find('input[type="checkbox"]')
      .should("exist");
  });
});
