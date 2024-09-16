  // Hàm xác định màu Badge dựa trên trạng thái sản phẩm
  export const getStatusColor = (status: string) => {
    switch (status) {
      case 'BANNED':
        return 'red';
      case 'UNAVAILABLE':
        return 'yellow';
      case 'AVAILABLE':
        return 'green';
      default:
        return 'blue'; // Màu mặc định nếu không có trạng thái phù hợp
    }
  };