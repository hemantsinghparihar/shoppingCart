import React, { useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { removeFromCart,updateQuantity } from '../features/shoppingSlice';

function Cart() {
  const dispatch=useDispatch();

  const cartData=useSelector((state)=>state.shop.cartData)
  console.log('✌️cartData --->', cartData);

  const [total,setTotal]=useState(0)

  // const [quantity,setQuantity]=useState(1)

  const handleRemove=(id)=>{
    console.log('✌️id --->', id);
    const updatedCart=cartData.filter((one)=>one.id!==id)
    console.log('✌️updatedCart --->', updatedCart);
    dispatch(removeFromCart(updatedCart))
    
  }

  const handleQuantityChange=(id,quantity)=>{
console.log('✌️quant in handle quant handler--->', quantity);
console.log('✌️id in handle quant handler--->', id);
   
    dispatch(updateQuantity({ id, quantity }))
  }

  useEffect(()=>{
    // const total=cartData.reduce((acc,one)=>acc+one.price*one.quantity,0)
    const newTotal = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal)
  },[cartData])

  return (
    <div className='cart-page  '>
      <div className='container-fluid  '>
      <div className="cart-container">
      <h2 className="cart-title">Shopping Cart [{cartData.length}]</h2>
      <div className="cart-items">
        {cartData?.map((item) => (
          <div className="cart-item"key={item.id}>
            <div className="cart-item-info">
              <img src={item.images[0]}  className="cart-item-image" />
              <div className="cart-item-details">
                <h5 className="cart-item-name">{item.title}</h5>
                <p className="cart-item-price">${item.price}</p>
              </div>
            </div>
            <div className="cart-item-quantity">
              <button className="quantity-btn" 
                 onClick={() => handleQuantityChange(item.id, item.quantity-1)}
                >-</button>
              <input type="number" value={item.quantity}  className="quantity-input" />
              <button className="quantity-btn" onClick={()=>handleQuantityChange(item.id,item.quantity+1)}>+</button>
            </div>
            <p className="cart-item-subtotal">${item.quantity*item.price}</p>
            <button className="remove-btn" onClick={()=>handleRemove(item.id)}>Remove</button>
          </div>
         ))} 
      </div>
      <div className="cart-total">
        <h4>Total: ${total}</h4>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
      </div>
    </div>
  )
}

export default Cart






// <div className="cart-item" >
//             <div className="cart-item-info">
//               <img src={'https://i.pinimg.com/736x/13/fd/ff/13fdff207650f1ba7927d552ef1a8bfa.jpg'}  className="cart-item-image" />
//               <div className="cart-item-details">
//                 <h5 className="cart-item-name">name</h5>
//                 <p className="cart-item-price">$3</p>
//               </div>
//             </div>
//             <div className="cart-item-quantity">
//               <button className="quantity-btn">-</button>
//               <input type="number" value={3} readOnly className="quantity-input" />
//               <button className="quantity-btn">+</button>
//             </div>
//             <p className="cart-item-subtotal">$6</p>
//             <button className="remove-btn">Remove</button>
//           </div>