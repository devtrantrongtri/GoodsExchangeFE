import React, { useEffect} from "react";
import { Link } from "react-router-dom";
import { CategoryType } from "../../types/Product/PostProb";
import useAxios from "../../hooks/useAxios";

function Navbar() {
  const { response, error, loading, fetchData } = useAxios<CategoryType[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      await fetchData({
        url: "category/get_all_categories",
        method: "GET",
      });
    };
    fetchCategories();
  }, []);
  
  return (
    <div className="bg-slate-50">
      <h1 className="font-bold text-2xl pl-6 pt-6">Khám phá danh mục</h1>
      <div className="flex justify-center my-6">
        <ul className="flex flex-wrap m-4">
          {response?.data.map((category) => (
            <li key={category.categoryId} className="text-center m-2">
              <Link
                to={`/product?category=${category.name}`}
                className="block px-6 py-4 bg-slate-400 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 transition duration-300"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
