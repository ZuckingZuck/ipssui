import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Space,
  Table,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { changeSocial, deleteSocial } from "../../redux/socialSlice";
import AddSocial from "./Modals/AddSocial";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
const AdminSocials = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const social = useSelector((state) => state.social);
  const [defaultSocial, setDefaultSocial] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [iconUrl, setIconUrl] = useState("");
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Silmek istediğine emin misin?")) {
      const deleteService = async () => {
        const response = await fetch(
          `http://localhost:8080/api/admin/social/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if(response.status === 403 || response.status === 401){
          message.error("Yetkiniz yok!")
          navigate("/admin");
        }
        if(response.ok) {
          dispatch(deleteSocial(id));
        }
      };

      deleteService();
    }
  };

  const handleEdit = (record) => {
    setIconUrl(record.iconUrl);
    setDefaultSocial(record);
    setEditModal(true);
  };
  const columns = [
    {
      title: "İkon",
      dataIndex: "iconUrl",
      width: "10%",
      key: "coverImageUrl",
      render: (_, record) => (
        <img
          className="h-12 w-12 p-3 rounded bg-black"
          src={record.iconUrl}
          alt=""
        />
      ),
    },
    {
      title: "Platform",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "URL",
      dataIndex: "accountUrl",
      key: "accountUrl",
    },
    {
      title: "İşlemler",
      key: "action",
      render: (_, record) => (
        <div>
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                handleEdit(record);
              }}
            />
          </Space>
          <Space size="middle">
            <Button
              className="ml-2"
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

  useEffect(() => {
    if (defaultSocial) {
      form.setFieldsValue({
        name: defaultSocial.name,
        accountUrl: defaultSocial.accountUrl,
        iconUrl: defaultSocial.iconUrl,
      });
    }
  }, [defaultSocial, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          name: values.name,
          accountUrl: values.accountUrl,
          iconUrl: iconUrl,
        };

        const editSocials = async () => {
          const response = await fetch(
            `http://localhost:8080/api/admin/social/${defaultSocial._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({updateSocial: data}),
            }
          );
          if(response.status === 403 || response.status === 401){
            message.error("Yetkiniz yok!")
            navigate("/admin");
          }
          if(response.ok){
            const json = await response.json();
            dispatch(changeSocial(json));
          }
        };
        editSocials();

        setEditModal(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setEditModal(false);
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("name", file);

    const apiUrl = "http://localhost:8080/api/admin/upload";

    fetch(apiUrl, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("bu data", data);
        onSuccess();
        message.success("Dosya yüklendi.");
        setIconUrl(data.imgUrl);
      })
      .catch((error) => {
        onError();
        message.error("Dosya yüklenirken bir hata oluştu!");
        console.error("File upload error:", error);
      });
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Lütfen bir resim dosyası yükleyin!");
    }
    return isImage;
  };

  return (
    <div className="flex">
      <AdminNavbar />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 pt-7">Sosyal Medya Hesapları</h1>
        <div className="mb-4">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={showModal}
          >
            Yeni Veri Ekle
          </Button>
        </div>
        <div>
          <Table dataSource={social.socials} columns={columns} rowKey={"_id"} />
        </div>

        <AddSocial open={isModalVisible} setOpen={setIsModalVisible} />
        <Modal
          title="Sosyal Medya Düzenle"
          open={editModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              name="name"
              label="Platform"
              initialValue={defaultSocial?.name}
              rules={[
                { required: true, message: "Platform alanı zorunludur!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="accountUrl"
              label="Hesap URL"
              initialValue={defaultSocial?.accountUrl}
              rules={[
                { required: true, message: "Hesap URL alanı zorunludur!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="iconUrl"
              label="İkon Yükle"
              rules={[
                { required: true, message: "Lütfen bir görsel yükleyin!" },
              ]}
            >
              <Upload
                customRequest={customRequest}
                beforeUpload={beforeUpload}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>Görsel Yükle</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminSocials;
