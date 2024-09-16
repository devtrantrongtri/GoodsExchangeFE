import React, { useEffect, useState } from 'react';
import { Dropdown, List, Spin, Typography, Badge } from 'antd'; // Ant Design components
import { useGetProfileQuery } from '../../services/user/user.service';
import { useGetNotificationsByUsernameQuery, useMarkReadNotificationMutation } from '../../services/notification/notification.service'; // Thêm mutation
import { skipToken } from '@reduxjs/toolkit/query';

const { Text } = Typography;

const Notification = () => {
  const { data: userData } = useGetProfileQuery(); // Lấy thông tin người dùng
  const [notifications, setNotifications] = useState<any[]>([]); // Danh sách thông báo
  const [unreadCount, setUnreadCount] = useState(0); // Đếm số thông báo chưa đọc

  // Mutation để đánh dấu thông báo đã đọc
  const [markReadNotification] = useMarkReadNotificationMutation();

  // Lấy thông báo từ RTK Query theo username của người dùng
  const { data, isLoading, refetch } = useGetNotificationsByUsernameQuery(
    userData?.data?.user?.username ? userData.data.user.username : skipToken
  );

  // Khi nhận được dữ liệu từ RTK Query, cập nhật danh sách thông báo
  useEffect(() => {
    if (data) {
      setNotifications(data.data);
      setUnreadCount(data.data.filter((notif: any) => !notif.read).length); // Đếm số thông báo chưa đọc
    }
  }, [data]);

  // Xử lý khi click vào thông báo
  const handleNotificationClick = async (notificationId: number) => {
    try {
      // Đánh dấu thông báo đã đọc
      await markReadNotification(notificationId).unwrap();
      // Cập nhật danh sách thông báo
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
      setUnreadCount((prev) => prev - 1); // Giảm số lượng thông báo chưa đọc
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  // Nội dung danh sách thông báo khi hover
  const notificationContent = (
    <div className="p-2 border rounded bg-white shadow-md w-80">
      {isLoading ? (
        <Spin /> // Hiển thị loading khi đang lấy dữ liệu
      ) : notifications.length > 0 ? (
        <List
          dataSource={notifications} // Dữ liệu từ state notifications
          renderItem={(item: any) => (
            <List.Item
              onClick={() => handleNotificationClick(item.id)} // Đánh dấu đã đọc khi click
              style={{ cursor: 'pointer', backgroundColor: item.read ? '#fff' : '#e6f7ff' }} // Nếu chưa đọc, tô màu nền nhạt hơn
            >
              <List.Item.Meta
                title={<Text strong={!item.read}>{item.title}</Text>} // Tô đậm tiêu đề nếu chưa đọc
                description={item.message} // Nội dung thông báo
              />
            </List.Item>
          )}
        />
      ) : (
        <p>Không có thông báo nào</p> // Nếu không có thông báo
      )}
    </div>
  );

  return (
    <Dropdown overlay={notificationContent} trigger={['hover']}>
      <div className="relative p-2 cursor-pointer flex items-center">
        {/* SVG Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-gray-600"
        >
          <g clipPath="url(#clip0)">
            <g clipPath="url(#clip1)">
              <path
                d="M19.4045 18.7012H4.58447C4.33116 18.6997 4.08267 18.6319 3.86373 18.5044C3.64479 18.377 3.46306 18.1945 3.33662 17.975C3.21018 17.7555 3.14344 17.5067 3.14307 17.2534C3.14269 17.0001 3.20868 16.7511 3.33447 16.5312C4.25656 14.6713 4.68036 12.6039 4.56447 10.5312V9.75119C4.56208 8.76941 4.75587 7.79705 5.13447 6.89119C5.50399 5.9826 6.05527 5.15909 6.75447 4.47119C7.44834 3.77705 8.27473 3.22952 9.18447 2.86119C10.0896 2.48125 11.0629 2.29067 12.0445 2.30119C14.0179 2.33276 15.8994 3.14096 17.2809 4.55055C18.6624 5.96015 19.4326 7.8575 19.4245 9.83119V10.5012C19.3053 12.5742 19.7293 14.6423 20.6545 16.5012C20.7789 16.7226 20.8442 16.9723 20.8442 17.2262C20.8442 17.4801 20.7789 17.7298 20.6545 17.9512C20.5307 18.1738 20.3494 18.359 20.1295 18.4874C19.9096 18.6159 19.6591 18.6828 19.4045 18.6812V18.7012ZM11.9945 3.70119C11.2051 3.70057 10.4234 3.85571 9.69411 4.15773C8.96481 4.45974 8.30228 4.90269 7.74447 5.46119C7.17636 6.03386 6.72767 6.71369 6.42447 7.46119C6.13287 8.1891 5.98679 8.9671 5.99447 9.75119V9.75119V10.5012C6.11944 12.8302 5.62973 15.1512 4.57447 17.2312L19.4345 17.3012C18.4083 15.1855 17.914 12.8513 17.9945 10.5012V9.83119C18 8.22614 17.3737 6.68338 16.251 5.53633C15.1283 4.38928 13.5993 3.73008 11.9945 3.70119V3.70119Z"
                fill="currentColor"
              />
              <path
                d="M11.9945 22.4508C11.5081 22.4529 11.0261 22.3585 10.5764 22.1731C10.1267 21.9877 9.71819 21.715 9.37453 21.3708C8.68295 20.6741 8.29475 19.7324 8.29453 18.7508V18.0008C8.29453 17.8151 8.36827 17.6371 8.49955 17.5058C8.63083 17.3745 8.80887 17.3008 8.99452 17.3008C9.18018 17.3008 9.35822 17.3745 9.4895 17.5058C9.62078 17.6371 9.69452 17.8151 9.69452 18.0008V18.7508C9.69584 19.3609 9.9364 19.9461 10.3645 20.3808C10.8081 20.7912 11.3902 21.0192 11.9945 21.0192C12.5989 21.0192 13.181 20.7912 13.6245 20.3808C14.0526 19.9461 14.2932 19.3609 14.2945 18.7508V18.0008C14.2945 17.8151 14.3683 17.6371 14.4995 17.5058C14.6308 17.3745 14.8089 17.3008 14.9945 17.3008C15.1802 17.3008 15.3582 17.3745 15.4895 17.5058C15.6208 17.6371 15.6945 17.8151 15.6945 18.0008V18.7508C15.6958 19.237 15.601 19.7188 15.4156 20.1683C15.2301 20.6178 14.9576 21.0262 14.6138 21.37C14.2699 21.7139 13.8615 21.9863 13.412 22.1718C12.9625 22.3573 12.4808 22.4521 11.9945 22.4508Z"
                fill="currentColor"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="24" height="24" fill="white" />
            </clipPath>
            <clipPath id="clip1">
              <rect width="17.71" height="20.15" fill="white" transform="translate(3.14453 2.30078)" />
            </clipPath>
          </defs>
        </svg>
        {/* Badge hiển thị số lượng thông báo chưa đọc */}
        <Badge count={unreadCount} offset={[10, 0]} />
      </div>
    </Dropdown>
  );
};

export default Notification;
