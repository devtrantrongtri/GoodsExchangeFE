import React, { useState } from 'react';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../../services/user/user.service';
import { Card, Form, Input, Button, Avatar, Alert, message } from 'antd';
import LoadingPopup from '../../Util/LoadingPopup';

interface avartar {
  url: string;
  label: string;
}

const Profile: React.FC = () => {
  const { data: profileData, isLoading, isError, refetch } = useGetProfileQuery();
  const [updateProfile, { error, data }] = useUpdateProfileMutation();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleUpdate = async (values: any) => {
    try {
      await updateProfile({
        user: {
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
        },
        bio: values.bio,
        profileImageUrl: selectedAvatar || values.profileImageUrl,
        firstName: values.firstName,
        lastName: values.lastName,
      }).unwrap();
      console.log(data)
      // if (data && data.code === 200) {
      //   message.success('Profile updated successfully!');
      // } else {
      //   message.error('Failed to update profile. ' + (data?.msg || ''));
      // }
    } catch (error) {
      console.error('Failed to update profile:', error);
      console.log('Failed to update profile:', error);
      message.error('Failed to update profile.');
    }
    refetch();
  };

  if (isLoading) return <LoadingPopup />;
  if (isError) return <Alert message="Something went wrong." type="error" showIcon className="my-4" />;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Profile Information</h1>
      {profileData && (
        <div>
          <Card
            cover={<Avatar size={128} src={profileData.data.profileImageUrl || 'https://secure.gravatar.com/avatar/f53779b5676d15e4a7aeeef9c81fa564?s=70&d=wavatar&r=g'} className="mx-auto mt-4" />}
            className="mb-4"
          >
            <Form
              initialValues={{
                email: profileData.data.user.email,
                phoneNumber: profileData.data.user.phoneNumber || '',
                address: profileData.data.user.address || '',
                bio: profileData.data.bio || '',
                profileImageUrl: profileData.data.profileImageUrl || '',
                firstName: profileData.data.firstName || '',
                lastName: profileData.data.lastName || '',
              }}
              onFinish={handleUpdate}
              layout="vertical"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item label="First Name" name="firstName">
                  <Input />
                </Form.Item>
                <Form.Item label="Last Name" name="lastName">
                  <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Phone Number" name="phoneNumber">
                  <Input />
                </Form.Item>
              </div>

              <Form.Item label="Address" name="address">
                <Input />
              </Form.Item>
              <Form.Item label="Bio" name="bio">
                <Input.TextArea rows={4} />
              </Form.Item>

              {/* Avatar selection */}
              <Form.Item label="Profile Image">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {profileData.data.profileImageUrl && (
                    <div className="flex flex-col items-center cursor-pointer" onClick={() => setSelectedAvatar(profileData.data.profileImageUrl)}>
                      <img
                        className={`w-16 h-16 rounded-full ${selectedAvatar === profileData.data.profileImageUrl ? 'transform scale-110 border-4 border-blue-500' : ''}`}
                        src={profileData.data.profileImageUrl}
                        alt="current avatar"
                      />
                      <strong className="text-slate-900 text-xs font-medium mt-2">Old Avatar</strong>
                    </div>
                  )}
                  {avatarOptions.map((avatar) => (
                    <div
                      key={avatar.url}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => setSelectedAvatar(avatar.url)}
                    >
                      <img
                        className={`w-16 h-16 rounded-full ${selectedAvatar === avatar.url ? 'transform scale-110 border-4 border-blue-500' : ''}`}
                        src={avatar.url}
                        alt={avatar.label}
                      />
                      <strong className="text-slate-900 text-xs font-medium mt-2">{avatar.label}</strong>
                    </div>
                  ))}
                </div>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full md:w-auto">Update Profile</Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Profile;


// const avatarOptions = [
//     'https://i.pinimg.com/736x/c7/03/ea/c703ea56db91e39b6394178d45f78a67.jpg',
//     'https://cdn-media.sforum.vn/storage/app/media/THANHAN/avartar-anime-91.jpg',
//     'https://i.pinimg.com/736x/90/ec/c8/90ecc895bc58317808cda71ff8b26ae2.jpg',
//     'https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223'
    
//   ];

const avatarOptions: avartar[] = [
    { 
        url: 'https://i.pinimg.com/736x/c7/03/ea/c703ea56db91e39b6394178d45f78a67.jpg', 
        label: 'girl' 
    },
    { 
        url: 'https://cdn-media.sforum.vn/storage/app/media/THANHAN/avartar-anime-91.jpg', 
        label: 'boy' 
    },
    { 
        url: 'https://i.pinimg.com/736x/90/ec/c8/90ecc895bc58317808cda71ff8b26ae2.jpg', 
        label: 'couple' 
    },
    { 
        url: 'https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223', 
        label: 'china style' 
    },
    { 
        url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80', 
        label: 'Andrew' 
    },
    { 
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80', 
        label: 'Emily' 
    },
    { 
        url: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80', 
        label: 'Whitney' 
    },
    { 
        url: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80', 
        label: 'David' 
    },
    { 
        url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80', 
        label: 'Kristin' 
    },
    { 
        url: 'https://images.unsplash.com/photo-1605405748313-a416a1b84491?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80', 
        label: 'Sarah' 
    },

];
