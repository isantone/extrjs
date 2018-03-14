import paths from '../paths';

export default class EmptyCartView {
  getTemplate() {
    const emptyCartTemplate =
    `<div id="pageContent" class="page-main">
      <!-- Navigation -->
      <div class="page-main__content">
        <main>
          <h2>Shopping cart</h2>
          <p>Your shopping cart is empty</p>
          <a href="#">
            <button class="button button_color big-top-margin">
              CONTINUE SHOPPING
            </button>
          </a>
        </main>
      </div>
    </div>`;

    const compiledEmptyCartTemplate = Handlebars.compile(emptyCartTemplate);

    document.title = "EXTREME SHOP - Cart";
    return compiledEmptyCartTemplate();
  }
}