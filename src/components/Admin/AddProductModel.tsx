import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
};

type ProductReq = {
  category_id: string;
  email: string;
  password: string;
  role: string;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onProductAdded,
}) => {
  const [Productname, setProductname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { fetchData } = useAxios<ProductReq>();

  const handleSubmit = async () => {
    try {
      await fetchData({
        url: "Product/sign-up",
        method: "POST",
        data: {
          Productname,
          email,
          password,
          role,
        },
      });
      onProductAdded();
      onClose();
    } catch (error) {
      console.error("Error adding Product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Add New Product</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Productname
          </label>
          <input
            type="text"
            value={Productname}
            onChange={(e) => setProductname(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            onChange={(e) => setRole(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          >
            <option value="">Select role</option>
            <option value="CLIENT">Client</option>
            <option value="ADMIN">Admin</option>
            <option value="MODERATOR">Moderator</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
