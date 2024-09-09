import React from 'react'

function SellerInfor() {
  type ProductType = {
    productId: number,
    seller: {
      userId: number;
      username: string;
      email: string;
      roles: string; // "CLIENT"
      phoneNumber: string;
      address: string;
      createdAt: [number, number, number, number, number, number]; // Year, Month, Day, Hour, Minute, Second
    };
    category: {
      categoryId: number,
      name: string,
      categoryID: number,
    },
    title: string,
    description: string,
    price: number,
    status: string,
    create_at: number,
    imageUrls: string[]
  }
  
  return (
    <div>SellerInfor</div>
  )
}

export default SellerInfor