import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cartItems: [],
        user: {
            loggedIn: false,
            data: null
        }
    },
    mutations: {
        set_logged_in(state, value){
            state.user.loggedIn = value;
        },
        set_user(state,data){
            state.user.data = data;
        },
        getLocalStorageItem(state){
            var items = JSON.parse(localStorage.getItem('CartItems'));
            if(items === null || items.length === 0){
                items = [];
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
        fetchUser({commit}, user){
            commit("set_logged_in", user!= null);
            if(user){
                commit("set_user", {
                    displayName: user.displayName,
                    email: user.email
                });
            }else{
                commit("set_user", null);
            }
        },
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
            localStorage.setItem('CartItems', JSON.stringify(this.state.cartItems))
        },
        addToCart({commit}, object) {
            console.log(object);
            object.e.stopPropagation();
            var found = false;
            this.state.cartItems.forEach(element => {
              if(element.Id == object.camel.Id){
                element.Quantity += 1;
                found = true;
              }
            });
            if(!found){
              commit('addItem', object.camel);
            }
            localStorage.setItem('CartItems', JSON.stringify(this.state.cartItems))
          }
    },
    getters: {
        getCartItems: state => state.cartItems,
        getUser: state => state.user
    }
});