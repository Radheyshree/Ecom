import React, { useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";
import { ShopContext } from "../../context/ShopContext";

const List = ({token}) => {
  const {backend_url, currency} = useContext(ShopContext)
  const [list, setList] = useState([])
  const fetchList = async() => {
    try{
      const response = await axios.get(backend_url+"/api/product/all", {headers:{token}})
      console.log(response.data)
      if(response.data.success){
      setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }
    }
    catch(error){
        console.log(error)
        toast.error(error.message)
    }

  }

  const removeProduct = async(id) => {
    try {
      const response = await axios.post(backend_url+"/api/product/delete",{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
        }
        else{
          toast.error(response.data.message)
        }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
    <p className="mb-2"> ALL  LISTED  PRODUCTS </p>
      <div className="flex flex-col ap-2">
        {/* LIST TABLE TITLE */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b> 
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Remove</b>
        </div>
        {/* Product list */}
        {
          list.map((item,index)=>(
            <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm" key={index}>
              <img className="w-12" src={item.image[0]} alt=""/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency} {item.price}</p>
              <p onClick={()=>removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-bold test-lg">X</p>
              </div>
          ))
        }
      </div>
    </>
  )
}

export default List;