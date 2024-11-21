import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from './redux/usersSlice';
import { Modal, Form, Input, message } from 'antd';
import UserList from './components/UserList';
import Loader from './components/Loader';

const App = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);

  const [favorites, setFavorites] = useState([]);
  const [userList, setUserList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setUserList(users);
    }
  }, [users, status]);

  const handleFavorite = (userId) => {
    setFavorites((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleEdit = (userId) => {
    const user = userList.find((u) => u.id === userId);
    setSelectedUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (userId) => {
    setUserList((prev) => prev.filter((user) => user.id !== userId));
    message.success('User deleted successfully!');
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      setUserList((prev) =>
        prev.map((user) => (user.id === selectedUser.id ? { ...user, ...values } : user))
      );
      setIsModalVisible(false);
      message.success('User updated successfully!');
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container my-5">
      {status === 'loading' && <Loader/>}
      {status === 'succeeded' && (
        <UserList
          users={userList}
          onFavorite={handleFavorite}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {status === 'failed' && <p className="text-danger text-center">Failed to load users. Please try again.</p>}

      <Modal
        title="Edit User"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="horizontal">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'This field is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'invalid email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'This field is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="website" label="Website" rules={[{ required: true, message: 'This field is required' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
