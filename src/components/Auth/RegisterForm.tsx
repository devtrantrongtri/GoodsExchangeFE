import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useAxios from "../../hooks/useAxios";
import { notification } from "antd";


const RegisterForm: React.FC = () => {
  const { formData, handleInputChange, resetForm } = useForm({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { response, error, loading, fetchData } = useAxios();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic validation
    const validationErrors: string[] = [];
    if (typeof formData.email === "string" && !formData.email.includes("@")) {
      validationErrors.push("Invalid email format.");
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.push("Passwords do not match.");
    }
    if (typeof formData.password === "string" && formData.password.length < 6) {
      validationErrors.push("Password must be at least 6 characters long.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Gửi yêu cầu đăng ký
    const requestOptions = {
      url: 'user/sign-up',
      method: "POST" as "POST",
      data: {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      },
    };

    try {
      fetchData(requestOptions);
      
    } catch (err) {
      // Xử lý lỗi khi gửi yêu cầu
      setErrors([error || 'Loi o component Register Form =)) ']);
    }
  };

  useEffect(() => {
    if (response) {
      if (response.code === 201) {
        // Registration successful - Show success notification and redirect to login
        notification.success({
          message: 'Registration Successful',
          description: 'You have registered successfully. Please log in.',
          placement: 'top' 
        });
        resetForm();
        navigate("/auth/login");
      } else {
        // Handle registration error based on response code
        notification.error({
          message: 'Registration Failed',
          description: response.msg || 'Registration failed. Please try again.',
          placement: 'top' 
        });
      }
    }
  }, [response, navigate]);


  return (
    <div className="bg-white bg-opacity-100 rounded-3xl shadow-2xl p-8 w-full max-w-md">
      <h2 className="text-3xl text-center text-[#2F8689] font-bold mb-6">Register</h2>

      {errors.length > 0 && (
        <div className="text-red-500 mb-4">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5CBFC3] focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5CBFC3] focus:outline-none"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5CBFC3] focus:outline-none"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5CBFC3] focus:outline-none"
            placeholder="Re-enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#2F8689] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#5CBFC3] transition-colors duration-300"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-700">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-[#1e6668] hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
