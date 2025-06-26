import React, { useEffect, useCallback, useState } from 'react';
import { Modal, notification } from 'antd';
import { useGetAuthUserData } from '@/queries/auth.query';
import { useSingleDelete } from '@/queries/jobseeker.query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/auth/auth.store';

function DeleteAccount() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutate: singleDelete } = useSingleDelete();

  // Show modal when page loads
  useEffect(() => {
    setIsModalVisible(true);
  }, []);

  const handleDelete = useCallback(() => {
    if (!user?.id) return;

    singleDelete(
      { id: user.id },
      {
        onSuccess: () => {
          notification.success({
            message: 'Your account has been deleted successfully.',
          });
          // Optional: logout user or redirect
          navigate('/'); // redirect to home (or login page)
        },
        onError: (error) => {
          notification.error({
            message: 'Error deleting your account.',
            description: error?.message,
          });
        },
      }
    );
    setIsModalVisible(false);
  }, [singleDelete, user?.id, navigate]);

  const handleCancel = () => {
    setIsModalVisible(false);
    navigate(-1); // Go back if user cancels
  };

  return (
    <Modal
      title="Delete Account"
      open={isModalVisible}
      onOk={handleDelete}
      onCancel={handleCancel}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
    >
      <p>Are you sure you want to delete your account? This action cannot be undone.</p>
    </Modal>
  );
}

export default DeleteAccount;
