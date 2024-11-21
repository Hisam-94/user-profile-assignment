// import React from 'react';
// import UserCard from './UserCard';

// const UserList = ({ users }) => {
//     console.log("inside UserList.js")
//     console.log("users",users)
//   return (
//     <div className="row row-cols-1 row-cols-md-2 g-4">
//       {users && users?.map((user) => (
//         <div key={user.id} className="col">
//           <UserCard user={user} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserList;


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
