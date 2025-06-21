class ShoppingListItem {
  constructor(
    name,
    quantity,
    unitOfMeasure = null,
    category = null,
    itemType,
    isPurchased = false,
  ) {
    this.name = name;
    this.quantity = quantity;
    this.unitOfMeasure = unitOfMeasure;
    this.category = category;
    this.itemType = itemType;
    this.isPurchased = isPurchased;
  }

  toPlainObject() {
    return {
      name: this.name,
      quantity: this.quantity,
      unitOfMeasure: this.unitOfMeasure,
      category: this.category,
      itemType: this.itemType,
      isPurchased: this.isPurchased,
    };
  }

  static fromFirestore(data) {
    return new ShoppingListItem(
      data.name,
      data.quantity,
      data.unitOfMeasure || null,
      data.category || null,
      data.itemType,
      data.isPurchased || false,
    );
  }
}

export default ShoppingListItem;
