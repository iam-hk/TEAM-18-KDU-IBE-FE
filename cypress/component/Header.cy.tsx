import { Provider } from "react-redux";
import { store } from "../../src/redux/Store";
import { Header } from "../../src/Component/Header/Header";

describe('<Header />', () => {
  it('mounts', () => {
    cy.viewport(1024, 700);
    cy.mount(
      <Provider store={store}>
      <Header />
      </Provider>
    )
    cy.get('.main-heading').should('contain', 'Kickdrum');
    cy.get('.sub-heading').should('contain', 'Internet Booking Engine');
  })
});