class Ustensile {
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }

  toPlainObject() {
    return {
      name: this.name,
      quantity: this.quantity,
    };
  }

  static fromFirestore(data) {
    return new Ustensile(data.name, data.quantity);
  }
}

export default Ustensile;
