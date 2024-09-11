import React from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng useNavigate thay vì useHistory

interface ErrorPageProps {
  errorMessage?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  const navigate = useNavigate(); // Thay thế useHistory bằng useNavigate

  const handleReload = () => {
    window.location.reload();
  };

  const handleLogin = () => {
    navigate('/login'); // Sử dụng navigate để điều hướng đến trang đăng nhập
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Đã xảy ra lỗi</h1>
      <p>{errorMessage || 'Lỗi kết nối. Vui lòng tải lại trang hoặc đăng nhập lại.'}</p>
      <div>
        <button onClick={handleReload} style={{ margin: '10px' }}>
          Tải lại trang
        </button>
        <button onClick={handleLogin} style={{ margin: '10px' }}>
          Đăng nhập lại
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
