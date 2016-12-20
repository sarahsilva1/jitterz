module.exports = function Cart(oldCart) {

    /** Properties from last cart to new cart */
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.subTotal = Number(oldCart.subTotal) || 0;
    this.totalTax = Number(oldCart.totalTax) || 0;
    this.totalPrice = Number(oldCart.totalPrice) || 0;

    /** Totals rounded two places after point */
    this.subTotalPrice = Number(this.subTotal).toFixed(2);
    this.totalTaxPrice = Number(this.totalTax).toFixed(2);
    this.grandTotalPrice = Number(this.totalPrice).toFixed(2);

    this.add = function(item, id) {
        var storedItem = this.items[id];

        /** Creates an object if the same item was not already in cart */
        if (!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }


            /** Individual item price and rounds it to two digits after point*/
            storedItem.qty++;
            storedItem.price = Number(storedItem.item.price * storedItem.qty);

            /** Updates total quantity,price and taxes */
            this.totalQty++;
            this.subTotal += Number(storedItem.item.price);
            this.totalTax += Number(storedItem.item.price / 100 * 8.25);
            this.totalPrice += Number(storedItem.item.price)+ (storedItem.item.price / 100 * 8.25);


      };

    this.reduceByOne = function(id) {
        this.items[id].qty--;
        this.items[id].price -= Number(this.items[id].item.price);
        this.totalQty--;

        this.subTotal -= Number(this.items[id].item.price);
        this.totalTax -= Number(this.items[id].item.price / 100 * 8.25);
        this.totalPrice -= Number(this.items[id].item.price) + (this.items[id].item.price / 100 * 8.25);

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.increaseByOne = function(id) {
        this.items[id].qty++;
        this.items[id].price += Number(this.items[id].item.price);

        this.totalQty++;
        this.subTotal += Number(this.items[id].item.price);
        this.totalTax += Number(this.items[id].item.price / 100 * 8.25);
        this.totalPrice += Number(this.items[id].item.price) + (this.items[id].item.price / 100 * 8.25);
    };

    this.removeItem = function(id) {
        this.subTotal -= Number(this.items[id].item.price * this.items[id].qty);
        this.totalTax -= Number(this.items[id].item.price * this.items[id].qty / 100 * 8.25);
        this.totalPrice -= Number(this.items[id].item.price * this.items[id].qty) + (this.items[id].item.price  * this.items[id].qty / 100 * 8.25);

        this.totalQty -= this.items[id].qty;
        delete this.items[id];
    };
    /** Stores items objects in an array */
    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};
