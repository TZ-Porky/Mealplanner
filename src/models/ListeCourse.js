import ShoppingListItem from './ElementListeCourse';

class ShoppingList {
  constructor(
    id = null,
    authorId,
    name,
    recipeName = null,
    items = [],
    dateCreated = new Date(),
    status = 'EN COURS',
  ) {
    this.id = id;
    this.authorId = authorId;
    this.name = name;
    this.recipeName = recipeName;
    this.items = items;
    this.dateCreated = dateCreated;
    this.status = status;
  }

  toPlainObject() {
    return {
      authorId: this.authorId,
      name: this.name,
      recipeName: this.recipeName,
      items: this.items.map(item => item.toPlainObject()),
      dateCreated: this.dateCreated,
      status: this.status,
    };
  }

  static fromFirestore(data, id) {
    const items = Array.isArray(data.items)
      ? data.items.map(item => ShoppingListItem.fromFirestore(item))
      : [];

    return new ShoppingList(
      id,
      data.authorId,
      data.name,
      data.recipeName || null,
      items,
      data.dateCreated ? data.dateCreated.toDate() : new Date(),
      data.status || 'EN COURS',
    );
  }
}

export default ShoppingList;
