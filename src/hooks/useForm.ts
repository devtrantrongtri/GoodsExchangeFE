import { useState, ChangeEvent } from "react";

// Định nghĩa kiểu dữ liệu cho form as =)))
type FormData = {
    [key : string] : string | number;
}

// Hook để quản lý form
function useForm(initialValues: FormData) {
  const [formData, setFormData] = useState<FormData>(initialValues);

  // Hàm lắng nghe sự thay đổi của input
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm reset lại form về giá trị ban đầu
  const resetForm = () => {
    setFormData(initialValues);
  };

  return { formData, handleInputChange, resetForm };
}

export default useForm;
