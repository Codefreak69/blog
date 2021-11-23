import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

const Categories = () => {
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setcategories(newCategories));
  }, []);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl font-semibold mb-8  pb-4 border-b">
        <span className="text-pink-500 text-3xl">C</span>ategories
      </h3>
      {categories.map((category)=>(
            <Link key={category.slug} href={`categories/${category.slug}`}>
                <span className="cursor-pointer block pb-3 mb-3">
                    {category.name}
                </span>
            </Link>
      ))}
    </div>
  );
};

export default Categories;
