
const PRICE = 9.99;

new Vue({
    el: "#app",
    data: {
       total: 0,
        items: [
            {id: 1, title: "Item1"},
            {id: 2, title: "Item2"},
            {id: 3, title: "Item3"}
        ],
        cart: []
    },
    methods: {
        addItem: function(index) {
            this.total += PRICE;
            const item = this.items[index];
            let found = false;

            for (let i = 0; i < this.cart.length; i++){
                if (this.cart[i].id === item.id){
                    this.cart[i].qty++;
                    found = true;
                }
            }

            if (!found){
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    qty: 1,
                    price: PRICE
                });
            }
        },
        inc: function(item) {
            item.qty++;
            this.total += PRICE;
        },
        dec: function(item) {
            if (item.qty > 1){
                item.qty--;
            } else {
                this.cart.splice(this.cart.indexOf(item), 1);
            }
            this.total -= PRICE;
        }
    },
    filters: {
        currency: function(price) {
            return "$".concat(price.toFixed(2));
        }
    }
});