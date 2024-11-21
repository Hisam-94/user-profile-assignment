import React from 'react';
import { Row, Col } from 'antd';
import UserCard from './UserCard';

const UserList = ({ users, onFavorite, onEdit, onDelete }) => {
  return (
    <Row gutter={[16, 16]}>
      {users && users?.map((user) => (
        <Col key={user.id} xs={24} sm={12} lg={6}>
          <UserCard user={user} onFavorite={onFavorite} onEdit={onEdit} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
};

export default UserList;
