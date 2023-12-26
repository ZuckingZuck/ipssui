import React from "react";
import { Modal, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddUser = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user.user);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const postServices = async () => {
          const response = await fetch("http://localhost:8080/api/admin/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(values),
          });
          if(response.status === 403 || response.status === 401){
            message.error("Yetkiniz yok!")
            navigate("/admin");
          }
          if(response.ok) {
            window.location.reload();
          }
        };
        postServices();
        console.log(values);
        message.success("Kullanıcı başarıyla eklendi!");
        setOpen(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Kullanıcı Ekle"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="username"
          label="Kullanıcı Adı"
          rules={[
            { required: true, message: "Kullanıcı adı alanı zorunludur!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-posta"
          rules={[{ required: true, message: "E-posta alanı zorunludur!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Parola"
          rules={[{ required: true, message: "Şifre alanı zorunludur!" }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUser;
