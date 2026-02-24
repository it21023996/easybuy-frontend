import axios from 'axios'
import React, { use } from 'react'
import { getCategoriesForDropdown } from '../../../api/categoryApi'
import { useState,useEffect } from 'react'
function CategoryDropdown({onChange,className }) {
    const [categories,setCategories] = useState([])
    const [selectedCategory,setSelectedCategory] = useState("")
    const [message,setMessage] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        const fetchCategories = async ()=> {
            setIsLoading(true)
            try{
                const res = await getCategoriesForDropdown();
                setCategories(res.data.data);
            }catch(err){
                console.log(err)
                setMessage("error fetching categories")
            }finally{
                setIsLoading(false)
            }
        }
        fetchCategories();
    },[]);
    
    const handleChange = (e)=>{
        const value = e.target.value;
        setSelectedCategory(value);
        if(onChange){
            onChange(value)
        }
    }

  return (
    <>
    <select value={selectedCategory} onChange={handleChange}  className={className}>
        <option value="">Select Category</option>
        {categories.map((category)=>(
            <option key ={category.categoryId}value={category.categoryId}>{category.name}</option>
        ))}
    </select>
    </>
  )
}

export default CategoryDropdown