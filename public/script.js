
const PRICE = 9.99;
const LOAD_NUM = 10;

new Vue({
    el: "#app",
    data: {
        total: 0,
        items: [],
        cart: [],
        results: [],
        resultsTotal: 0,
        search: "nba",
        lastSearch: "",
        loading: false,
        price: PRICE
    },
    methods: {
        appendItems: function(){

            //this needs to be more complex
            if (this.items.length < this.results.length){

                var x = this.items.length;
                var y = this.items.length + LOAD_NUM;

                for (var i = x; i < y; i++){
                    if (typeof this.results[i] !== 'undefined'){
                        console.log(i);
                        this.items.push(this.results[i]);
                    }
                }
            }

        },
        onSubmit: function(){

            this.items = [];
            this.loading = true;
            this.$http
                .get('/search/'.concat(this.search))
                .then(function(res) {
                    this.lastSearch = this.search;
                    this.results = res.data;
                    this.resultsTotal = this.results.length;
                    this.appendItems();
                    this.loading = false;
                });

        },
        addItem: function(index) {
            this.total += PRICE;
            const item = this.items[index];
            let found = false;

            for (let i = 0; i < this.cart.length; i++){
                if (this.cart[i].id === item.id){
                    this.cart[i].qty++;
                    found = true;
                    break;
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
    },
    mounted: function(){
        this.onSubmit();

        var vueInstance = this;

        var elem = document.getElementById('product-list-bottom');
        var watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function(){
            vueInstance.appendItems();
        });
    }
});