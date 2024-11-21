import React, { useState } from "react";
import { Card, Button } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import ButtonGroup from "antd/es/button/button-group";

const UserCard = ({ user, onFavorite, onEdit, onDelete }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite(user.id);
  };

  return (
    <Card
      hoverable
      cover={
        <img
          style={{ backgroundColor: "#f5f5f5" }}
          height={"140rem"}
          alt={`${user.name}'s avatar`}
          src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`}
        />
      }
      actions={[
        <ButtonGroup
          style={{
            justifyContent: "space-evenly",
            display: "flex",
            backgroundColor: "#f5f5f5",
          }}>
          <Button
            type="text"
            onClick={handleFavorite}
            icon={
              isFavorited ? (
                <HeartFilled style={{ color: "red", fontSize: "18px" }} />
              ) : (
                <HeartOutlined style={{ color: "red", fontSize: "18px" }} />
              )
            }
          />
          ,
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(user.id)}
          />
          ,
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(user.id)}
          />
          ,
        </ButtonGroup>,
      ]}>
      <Card.Meta title={user.name} />
      <div>
        <MailOutlined className="mt-2" /> {user.email}
      </div>
      <div>
        <PhoneOutlined /> {user.phone}
      </div>
      <div>
        <GlobalOutlined /> {user.website}
      </div>
    </Card>
  );
};

export default UserCard;
