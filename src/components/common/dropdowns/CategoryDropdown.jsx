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
    <div className={`nav-category-dropdown ${className || ""}`}>
    <select value={selectedCategory} onChange={handleChange}  className={className}>
        <option value="">All Categories</option>
        {categories.map((category)=>(
            <option key ={category.categoryId}value={category.categoryId}>{category.name}</option>
        ))}
    </select>
    </div>
    </>
  )
}

export default CategoryDropdown