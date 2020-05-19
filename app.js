/*
make some render functions
-renderShoppingList
-renderShoppingListItem

append list to ul element

make state
 -items
   {
     name: 'string'
     checked: false
   }
 */

const ShoppingList = (rootEl) => {
  let id = 1;
  let items = [
    {name: 'shrimp', checked: false, id: id++},
    {name: 'beer', checked: true, id: id++}
  ];

  return {
    addItem(newItem) {
      newItem.id = id++;
      newItem.check = false;
      items.push(newItem);
      this.renderList();
    },
    deleteItem(itemId) {
      console.log({itemId})
      items = items.filter(item => item.id !== itemId);
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
      const html = $(`
        <li>
          <span class="${itemClass}">${name}</span>
          <div class="shopping-item-controls">
            <button class="shopping-item-toggle">
                <span class="button-label">check</span>
            </button>
            <button class="shopping-item-delete js-shopping-item-delete">
              <span class="button-label">delete</span>
            </button>
          </div>
        </li>
        `);

      const deleteButton = html.find('.js-shopping-item-delete');
      deleteButton.click(() => this.deleteItem(id));

      return html;
    },
    renderList() {
      const renderedItems = items.map(item => this.renderListItem(item));
      rootEl.html(renderedItems);
    }
  }
};

const main = () => {
  //jj
  const listRootEl = $('.js-shopping-list');
  const shoppingList = ShoppingList(listRootEl);

  const itemInputEl = $("#shopping-list-entry").val('fdsa')

  $("#js-shopping-list-form").submit(function (event) {
    const itemInputEl = $("#shopping-list-entry");
    const newItem = {name: itemInputEl.val()};
    shoppingList.addItem(newItem);
    event.preventDefault();
  });

  const items = shoppingList.getItems();
  shoppingList.renderList();

};
main();

// shoppingList.addItem({ name: 'pizza', id: 23, checked: false, });










