import React from "react";
import "./category.css";

const Category = ({ item }) => {
    return (
      <div className= "category-container">
          <div className= "category-info">
              <img className= "category-images" src={item.img} alt= "categoryImg"/>
              <h1 className= "category-tittle">{item.title}</h1>
          </div>
          <button className= "category-button">SHOP NOW</button>
      </div>
    )
}

export default Category;