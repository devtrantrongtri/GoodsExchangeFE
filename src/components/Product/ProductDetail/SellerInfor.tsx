import React from 'react';
import { Card, Avatar, Descriptions, Spin, Alert } from 'antd';
import { SellerType } from '../../../types/Product/PostProb';
import { useGetSellerProfileQuery } from '../../../services/user/user.service';
import { useGetAllPostedQuery } from '../../../services/product/product.service';
import CardPost from '../../Home/Products/CardPost';

function SellerInfor({ seller }: { seller: SellerType }) {
  // Fetch seller profile
  const { data: profileData, isError: profileError, isLoading: profileLoading } = useGetSellerProfileQuery(seller.userId);
  
  // Ensure username is available before fetching posted items
  const username = profileData?.data?.user.username;
  const { data: postData, isLoading: postLoading, isError: postError } = useGetAllPostedQuery(username || '');

  // Check for loading or error states
  if (profileLoading || postLoading) return <div className="p-6 flex justify-center items-center"><Spin size="large" /></div>;
  if (profileError || postError) return <div className="p-6"><Alert message="Error loading information" type="error" showIcon /></div>;

  const profile = profileData?.data;
  const user = profile?.user;
  const fullname = (profile?.firstName && profile?.lastName) 
    ? `${profile.firstName} ${profile.lastName}` 
    : user?.username;
  const postOfUser = postData?.data;
  const createdAt = new Date(profile?.createdAt || 0).toLocaleString();
  const profileImageUrl = profile?.profileImageUrl || 'https://via.placeholder.com/150';

  return (
    <div className='flex flex-row py-10'>
      {/* Thông tin người dùng */}
      
      <Card
        className='w-full min-w-80 md:w-1/3 p-4'
        cover={
          <div className="flex justify-center">
            <Avatar
              size={128}
              src={profileImageUrl}
              alt={user?.username || 'Profile Picture'}
              // style={{ marginBottom: '16px' }}
            />
          </div>
        }
      >
        <Descriptions title={fullname} column={1}>
          <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user?.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="Address">{user?.address}</Descriptions.Item>
          <Descriptions.Item label="Member Since">{createdAt}</Descriptions.Item>
          <Descriptions.Item label="Bio">{profile?.bio || 'No bio available'}</Descriptions.Item>
        </Descriptions>
      </Card>
      
      {/* Sản phẩm được đăng */}
      <div className='w-full md:w-2/3 p-4'>
        <h2 className="text-lg font-bold mb-4">Posted Products of {fullname}</h2>
        <div className="flex overflow-x-auto space-x-4">
          {postOfUser?.map((product) => (
            <div className="min-w-[350px]" key={product.productId}>
              <CardPost product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerInfor;
