import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message, Space, Table } from "antd";
import {
  UserOutlined,
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddUser from "./Modals/AddUser";
import { useSelector } from "react-redux";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import SendNoteModal from "../../components/Admin/SendNoteModal";
const AdminUsers = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState(null);
  console.log(users);
  const [defaultUser, setDefaultUser] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:8080/api/admin/user", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status === 403 || response.status === 401) {
        message.error("Yetkiniz yok!");
        navigate("/admin");
      }

      if (response.ok) {
        const json = await response.json();
        setUsers(json);
      }
    };

    fetchUsers();
    if (defaultUser) {
      form.setFieldsValue({
        username: defaultUser.username,
        email: defaultUser.email,
      });
    }
  }, [defaultUser, form, user.token, navigate]);

  const handleOpenModal = (record) => {
    setDefaultUser(record);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Silmek istediğine emin misin?")) {
      const deleteUser = async () => {
        const response = await fetch(
          `http://localhost:8080/api/admin/user/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.status === 403 || response.status === 401) {
          message.error("Yetkiniz yok!");
          navigate("/admin");
        }

        if (response.ok) {
          window.location.reload();
        }
      };

      deleteUser();
    }
  };

  const handleEdit = (record) => {
    setDefaultUser(record);
    setEditModal(true);
  };

  const handleBlogger = async (record) => {
    const response = await fetch(
      `http://localhost:8080/api/admin/user/blogger/${record._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.status === 403 || response.status === 401) {
      message.error("Yetkiniz yok!");
    }

    if (response.ok) {
      message.success("Kullanıcıya rolü başarıyla verildi!");
      window.location.reload();
    }
  };

  const handleAdmin = async (record) => {
    const response = await fetch(
      `http://localhost:8080/api/admin/user/admin/${record._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (response.status === 403 || response.status === 401) {
      message.error("Yetkiniz yok!");
    }

    if (response.ok) {
      message.success("Kullanıcıya rolü başarıyla verildi!");
      window.location.reload();
    }
  };

  const columns = [
    {
      title: "Kullanıcı Adı",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "E-posta",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Roller",
      key: "roles",
      render: (_, record) => {
        return <p>{record.role}</p>;
      },
    },
    {
      title: "İşlemler",
      key: "action",
      render: (_, record) => (
        <div>
          <Space size="middle">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                handleBlogger(record);
              }}
            >
              Blogger Yap
            </Button>
          </Space>
          <Space className="ml-2 mr-2" size="middle">
            <Button
              className="bg-yellow-600"
              icon={<UserOutlined />}
              onClick={() => {
                handleAdmin(record);
              }}
            >
              Admin Yap
            </Button>
          </Space>
          <Space className="ml-2 mr-2" size="middle">
            <Button type="primary" onClick={() => {handleOpenModal(record)}}>
              Not Bırak
            </Button>
          </Space>
          <Space size="middle">
            <Button
              danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDelete(record._id);
              }}
            />
          </Space>
        </div>
      ),
    },
  ];

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          username: values.username,
          email: values.email,
          id: defaultUser.id,
        };
        console.log(data);

        const editFaqs = async () => {
          const response = await fetch("https://ibrahimbagislar.com/api/User", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(data),
          });
          console.log(response);
          if (response.ok) {
            message.success("Kullanıcının bilgileri başarıyla güncellendi!");
          }
        };

        editFaqs();

        setEditModal(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setEditModal(false);
  };

  return (
    <div className="flex">
      <AdminNavbar />
      <div className="container mx-auto mt-6">
        <SendNoteModal defaultUser={defaultUser} visible={modalVisible} onClose={handleCloseModal} />
        <h1 className="text-3xl font-bold mb-4">Kullanıcılar</h1>
        <div className="mb-4">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={showModal}
          >
            Yeni Kullanıcı Ekle
          </Button>
        </div>
        <div>
          {users && (
            <Table dataSource={users} columns={columns} rowKey={"_id"} />
          )}
        </div>

        <AddUser open={isModalVisible} setOpen={setIsModalVisible} />
        <Modal
          title="Kullanıcı Düzenle"
          open={editModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              name="userName"
              label="Kullanıcı Adı"
              initialValue={defaultUser?.userName}
              rules={[{ required: true, message: "Soru alanı zorunludur!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-posta"
              initialValue={defaultUser?.email}
              rules={[{ required: true, message: "Cevap alanı zorunludur!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminUsers;
