import React, { useState } from "react";

interface ProductFormProps {
  onSubmit: (data: any) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      category_id: categoryId,
      title: title,
      description: description,
      price: price,
      status: status,
      image: selectedFile,
    };

    onSubmit(data);

    // const handleUpload = async () => {
    //   try {
    //     const formData = new FormData();
    //     formData.append("image", selectedFile);

    //     const response = await fetch(
    //       "http://localhost:8080/api/drive/uploadToGoogleDrive",
    //       {
    //         method: "POST",
    //         body: formData,
    //       }
    //     );

    //     const result = await response.json();
    //     setResultMessage({ type: "success", message: result });
    //   } catch (error) {
    //     console.error("Error uploading image:", error.message);
    //     setResultMessage({ type: "error", message: error.message });
    //   }
    //   setTimeout(() => setResultMessage(null), 5000);
    // };
    // handleUpload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          rows={4}
          required
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label
          htmlFor="category_id"
          className="block text-sm font-medium text-gray-700"
        >
          Category ID
        </label>
        <input
          type="number"
          id="category_id"
          name="category_id"
          value={categoryId}
          onChange={(e) => setCategoryId(parseInt(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        >
          <option value="">Select status</option>
          <option value="AVAILABLE">Available</option>
          <option value="SOLD">Sold</option>
          <option value="unavailable">Unavailable</option>
          <option value="BANNED">Banned</option>
        </select>
      </div>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 light:bg-gray-700 hover:bg-gray-300 light:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            required
          />
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
          disabled={!selectedFile}
        >
          Save Product
        </button>
      </div>
      {resultMessage && (
        <div>
          {resultMessage.message.status == 200
            ? `Success: ${resultMessage.message.message}`
            : `Error: ${resultMessage.message.message}`}
        </div>
      )}
    </form>
  );
};

export default ProductForm;
