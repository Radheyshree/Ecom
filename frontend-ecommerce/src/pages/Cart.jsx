import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const {products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const tempCartData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        
          if (cartItems[items][item] > 0){
            tempCartData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
    
    setCartData(tempCartData);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 ">
      <div className="text-2xl mb-3">
        <Title text1="MY" text2="CART"/>
      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product)=> product._id === item._id);
            return (
              <div key={index} className="py-4 border-t border-b text-gray-700 grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  
                  <img src={productData.image[0]} className="w-16 sm:w-20" alt=""/>
                  
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex gap-5 mt-2 items-center">
                    <p className="text-gray-500">{currency} {productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">Size: {item.size}</p>
                    </div>
                    </div>           
                
                
                  <input type="number" min={1} defaultValue={item.quantity} onChange={(e)=>updateQuantity(item._id, item.size, e.target.value)} className="border  max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 " />
                  <img src={assets.bin_icon} alt="delete" onClick={() => updateQuantity(item._id, item.size, 0)} className="cursor-pointer w-4 mr-4 sm:w-5 pt-1 "/>
                </div>  
                </div> 
                            
              
            )
          })
        }
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal/>
          <div className="w-full text-end">
            <button onClick={()=>navigate("/place-order")} className="bg-black text-white text-sm my-8 py-3 px-8 rounded">CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;