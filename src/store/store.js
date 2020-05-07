import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartItems: []
    },
    mutations: {
        removeItem(state, index) {
            state.cartItems.splice(index, 1);
        },
        decreaseQuantity(state, index){
            state.cartItems[index].Quantity -= 1;
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
          }
    },
    getters: {
        getCartItems: state => state.cartItems
    }
});