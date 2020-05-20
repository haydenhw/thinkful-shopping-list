const ShoppingList = (rootEl) => {
  let id = 1;
  let items = [];

  return {
    addItem(newItem) {
      newItem.id = id++;
      newItem.checked = false;
      items.push(newItem);
      this.renderList();
    },
    deleteItem(itemId) {
      items = items.filter(item => item.id !== itemId);
      this.renderList();
    },
    checkItem(itemId) {
      item = items.find(item => item.id === itemId);
      item.checked = !item.checked;
      this.renderList();
    },
    getItems() {
      return items;
    },
    renderListItem({name, id, checked, }) {
      let itemClass = "shopping-item";
      if (checked) {
        itemClass += " shopping-item__checked"
      }
      let html = `
        <li>
          <span class="${itemClass}">${name}</span>
          <div class="shopping-item-controls">
            <button class="shopping-item-toggle">
                <span class="button-label js-shopping-item-check">check</span>
            </button>
            <button class="shopping-item-delete js-shopping-item-delete">
              <span class="button-label">delete</span>
            </button>
          </div>
        </li>
        `;
      html = $(html);

      const deleteButton = html.find('.js-shopping-item-delete');
      deleteButton.click(() => this.deleteItem(id));

      const checkButton = html.find('.js-shopping-item-check');
      checkButton.click(() => this.checkItem(id));

      return html;
    },
    renderList() {
      const renderedItems = items.map(item => this.renderListItem(item));
      rootEl.html(renderedItems);
    }
  }
};

$(() => {
    const listRootEl = $('.js-shopping-list');
    const shoppingList = ShoppingList(listRootEl);
    shoppingList.renderList();


    $("#js-shopping-list-form").submit(function (event) {
      const itemInputEl = $("#shopping-list-entry");
      const newItem = {name: itemInputEl.val()};
      shoppingList.addItem(newItem);
      event.preventDefault();
    });
});











