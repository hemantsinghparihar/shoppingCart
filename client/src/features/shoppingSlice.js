import { createSlice } from '@reduxjs/toolkit'


// Load initial cartData from localStorage if available
const initialCartData = JSON.parse(localStorage.getItem('cartData')) || [];

export const shopSlice=createSlice({
    name:'shop',
    initialState:{
        cartData:initialCartData,
        products:[],
        searchQuery:'',
        searchResults:[],
        loading: false,
        error: null
    },
    reducers:{
        fetchProductsRequest:(state,action)=>{
            state.loading=true
            state.error = null
        },
        fetchProductsSuccess:(state,action)=>{
            state.loading=false
            state.products=action.payload.products
        },
        fetchProductsFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },


        searchProductsRequest: (state, action) => {
            state.loading = true;
            state.error = null;
            state.searchQuery = action.payload;//=========flag doubt
        },
        searchProductsSuccess: (state, action) => {
            state.loading = false;
            state.searchResults = action.payload;
        },
        searchProductsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        setCartData:(state,action)=>{
            state.cartData=action.payload
            localStorage.setItem('cartData', JSON.stringify(state.cartData));
        },
        removeFromCart: (state, action) => {
            // Filter out the item by ID
            state.cartData = action.payload;
            // Update local storage
            localStorage.setItem('cartData', JSON.stringify(state.cartData));
        },
        updateQuantity:(state,action)=>{
            const {id,quantity}=action.payload;
            // const item = cartData.find((item) => item.id === id);
            state.cartData = state.cartData.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
            );
           
            localStorage.setItem('cartData',JSON.stringify(state.cartData))
            
        },
        setProducts:(state,action)=>{
            state.products=action.payload
        },
        setSearchResults:(state,action)=>{
            state.searchResults=action.payload
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery=action.payload
        }

    }
})

export const {setCartData,
    removeFromCart,
    updateQuantity,
    setProducts,
    setSearchResults,
    setSearchQuery,
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,

    searchProductsRequest,
    searchProductsSuccess,
    searchProductsFailure

}=shopSlice.actions
export default shopSlice.reducer