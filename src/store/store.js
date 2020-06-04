import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartItems: []
    },
    mutations: {
        getLocalStorageItem(state){
            var items = JSON.parse(localStorage.getItem('CartItems'));
            if(items === null || items.length === 0){
                items = [];
                var save = JSON.stringify(items);
                localStorage.setItem('CartItems', JSON.stringify(items))
            }
            state.cartItems = items;
        },
        removeItem(state, index) {
            state.cartItems.splice(index, 1);
            localStorage.setItem('CartItems', JSON.stringify(state.cartItems))
        },
        decreaseQuantity(state, index){
            state.cartItems[index].Quantity -= 1;
            localStorage.setItem('CartItems', JSON.stringify(state.cartItems))
        },
        addItem(state, item){
            state.cartItems.push(item);
        }
    },
    actions: {
        removeFromCart({ commit }, item) {
            for (var i = 0; i < this.state.cartItems.length; i++) {
                if (this.state.cartItems[i].Id == item.Id) {
                    if (this.state.cartItems[i].Quantity > 1) {
                        commit('decreaseQuantity', i);
                        break;
                    } else {
                        commit('removeItem', i);
                        break;
                    }
                }
            }
        },
        addToCart({commit}, object) {
            object.e.stopPropagation();
            var found = false;
            this.state.cartItems.forEach(element => {
              if(element.Id == object.dog.Id){
                element.Quantity += 1;
                found = true;
              }
            });
            if(!found){
              commit('addItem', object.dog);
            }
            localStorage.setItem('CartItems', JSON.stringify(this.state.cartItems))
          }
    },
    getters: {
        getCartItems: state => state.cartItems
    }
});