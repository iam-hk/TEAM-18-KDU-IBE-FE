import { Provider } from "react-redux";
import { store } from "../../src/redux/Store";
import { Footer } from "../../src/Component/Footer/Footer";

describe("<Footer />", () => {
    it("mounts", () => {
      cy.viewport(
        parseInt(`${import.meta.env.VITE_VIEWPORT_WIDTH}`),
        parseInt(`${import.meta.env.VITE_VIEWPORT_HEIGHT}`)
      );
      cy.mount(
        <Provider store={store}>
          <Footer />
        </Provider>
      );
      cy.get(".left-heading h2").contains("Kickdrum").should("be.visible");
      cy.get(".right-heading h4").eq(0).contains("Kickdrum Technology Group LLC").should("be.visible");
      cy.get(".right-heading h4").eq(1).contains("All Rights Reserved").should("be.visible");
    });
  });