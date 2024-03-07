import React from "react";
import { categories } from "../../dummydata";
import Category from "./Category";


const Categories = () => {
    return(
        <div className= "categories-container">
            {categories.map(item => (
                <Category item = {item} key = {item.id}/>
            ))}
            </div>
    )
}

export default Categories;