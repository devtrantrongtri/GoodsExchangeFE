
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';


// Định nghĩa kiểu dữ liệu cho phản hồi từ API
interface ApiResponse {
  code: number;
  msg: string;
  data: any;
}

const LoginForm: React.FC = () => {

  const { formData, handleInputChange } = useForm({
    username: "",
    password: "",
  });

  // State 
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { response, error, loading, fetchData } = useAxios<ApiResponse>();

  useEffect(() => {
    // Xử lý phản hồi API sau khi fetchData hoàn thành
    if (response) {
      if (response.code === 200) {
        // Đăng nhập thành công - Chuyển hướng tới trang chính hoặc trang người dùng
        // TODO : se lam redux sau =)))))))))
        console.log('Login successful:', response);
        navigate("/"); 
      } else {
        // Xử lý lỗi khi phản hồi từ API cho biết đăng nhập thất bại
        setErrors([response.msg || 'Login failed']);
      }
    }
  }, [response, navigate]);

  useEffect(() => {
    // Xử lý lỗi khi gửi yêu cầu
    if (error) {
      setErrors([error || 'An error occurred during login']);
    }
  }, [error]);

  // Hàm xử lý khi form được submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Kiểm tra lỗi cơ bản
    const validationErrors: string[] = [];
    if (typeof formData.username === 'string' && !formData.username.trim()) {
      validationErrors.push("Username is required.");
    }
    if (typeof formData.password === 'string' && !formData.password.trim()) {
      validationErrors.push("Password is required.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Tạo cấu hình yêu cầu gửi đi
    const requestOptions = {
      url: 'auth/authenticate',
      method: 'POST' as 'POST',
      data: {
        username: formData.username,
        password: formData.password,
      },
    };

    // fect Data den API
    await fetchData(requestOptions);
  }


  return (
    <div className="bg-white bg-opacity-100 rounded-3xl shadow-2xl p-8 w-full max-w-md">
      <h2 className="text-3xl text-center text-[#2F8689] font-bold mb-6">Login</h2>

      {errors.length > 0 && (
        <div className="text-red-500 mb-4">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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

        <button
          type="submit"
          className="w-full bg-[#2F8689] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#5CBFC3] transition-colors duration-300"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-700">
        Don't have an account?{" "}
        <Link to="/auth/register" className="text-[#1e6668] hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
