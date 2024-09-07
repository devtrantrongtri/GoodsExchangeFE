// Định nghĩa kiểu cho phản hồi toàn bộ
export interface UserProfileResponse {
    code: number;
    msg: string;
    data: UserProfile;
  }
  
  // Định nghĩa kiểu cho UserProfile
  export interface UserProfile {
    profileId: number;
    user: User;
    bio: string | null;
    profileImageUrl: string | null;
    createdAt: number | Date; // Có thể là timestamp hoặc Date object
    firstName: string | null;
    lastName: string | null;
  }
  
  // Định nghĩa kiểu cho User
  export interface User {
    userId: number;
    username: string;
    email: string;
    roles: string;
    phoneNumber: string | null;
    address: string | null;
    createdAt: number[] | Date; // Mảng số hoặc Date object
  }

// Type cho thông tin của user
export interface UserUpdateInfo {
  email: string;
  phoneNumber: string; // Thay đổi thành string để phù hợp với dữ liệu đầu vào (có thể là số hoặc chuỗi)
  address: string;
}

// Type cho thông tin cập nhật profile
export interface UpdateProfileRequest {
  user: UserUpdateInfo;
  bio: string | null;
  profileImageUrl: string | null;
  firstName: string | null;
  lastName: string | null;
}

