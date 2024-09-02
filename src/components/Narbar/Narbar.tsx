import React from 'react';
import { Link } from 'react-router-dom';

const categoryFake = [
    { name: 'Category 1' },
    { name: 'Category 2' },
    { name: 'Category 3' },
    { name: 'Category 4' },
    { name: 'Category 5' },
    { name: 'Category 6' },
    { name: 'Category 7' },
    { name: 'Category 8' }
];

function Navbar() {
  return (
    <div className='bg-slate-50'>
      <h1 className='font-bold text-2xl pl-6 pt-6'>Khám phá danh mục</h1>
      <div className='flex justify-center my-6'>
        <ul className='flex flex-wrap m-4'>
          {categoryFake.map((category, index) => (
            <li key={index} className='text-center m-2'>
              <Link
                to={`/category/${index}`}
                className='block px-6 py-4 bg-slate-400 text-white font-semibold rounded-lg shadow-md hover:bg-slate-600 transition duration-300'
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
