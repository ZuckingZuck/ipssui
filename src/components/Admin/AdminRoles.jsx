import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AdminRoles = ({ record }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState({ roles: [] });
  const [userids, setUserids] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await fetch("https://ibrahimbagislar.com/api/Roles", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if(response.status === 403 || response.status === 401){
        message.error("Bu sayfayı görmeye yetkiniz yok!")
        navigate("/admin");
      }
      
      if (response.ok) {
        const json = await response.json();
        setRoles(json);
      }else {
        console.log("bustatus", response.status);
      }
    };

    const fetchUserRoles = async () => {
      const response = await fetch(
        `https://ibrahimbagislar.com/api/User/GetUserRoles/${record.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if(response.status === 403 || response.status === 401){
        message.error("Bu sayfayı görmeye yetkiniz yok!")
        navigate("/admin");
      }
      
      const json = await response.json();

      if (response.ok) {
        setUserRoles(json);
      }
    };

    fetchUserRoles();
    fetchRoles();
  }, [user, record, roles, navigate]);

  const handleRole = async (e) => {
    const roleId = e.target.value;
    const updatedUserIds = [...userids];

    roles.forEach((role) => {
      userRoles.roles.forEach((item) => {
        if (role.name === item) {
          if (!updatedUserIds.includes(role.id)) {
            updatedUserIds.push(role.id);
          }
        }
      });
    });

    if (updatedUserIds.includes(roleId)) {
      updatedUserIds.splice(updatedUserIds.indexOf(roleId), 1);
      message.success("Rol kullanıcıdan alındı!");
    } else {
      updatedUserIds.push(roleId);
      message.success("Rol kullanıcıya verildi!");
    }

    setUserids(updatedUserIds);

    const response = await fetch(
      "https://ibrahimbagislar.com/api/Roles/AssignRole",
      {
        method: "POST",
        body: JSON.stringify({
          userId: record.id,
          roleIds: updatedUserIds,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    

    if (response.ok) {
      console.log(json);
      setRoles((prevRoles) => [...prevRoles]);
    }
  };

  return (
    <div>
      <form>
        {roles?.map((item) => (
          <span className="mr-2" key={item.id}>
            <input
              type="checkbox"
              value={item.id}
              checked={userRoles?.roles?.includes(item.name)}
              onChange={handleRole}
            />
             {item.name}
          </span>
        ))}
      </form>
    </div>
  );
};

export default AdminRoles;
