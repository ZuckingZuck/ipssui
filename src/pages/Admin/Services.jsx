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

import { changeService, deleteService } from "../../redux/serviceSlice";
import { useDispatch } from "react-redux";
import AddService from "./Modals/AddService";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
const Services = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const service = useSelector((state) => state.service);
  const [defaultService, setDefaultService] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Silmek istediğine emin misin?")) {
      const serviceDelete = async () => {
        const response = await fetch(
          `http://localhost:8080/api/admin/service/${id}`,
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
        
        if(response.ok){
          dispatch(deleteService(id));
        }
      };

      serviceDelete();
    }
  };

  const handleEdit = (record) => {
    setImgUrl(record.coverImageUrl);
    setDefaultService(record);
    setEditModal(true);
  };
  const columns = [
    {
      title: "Görsel",
      dataIndex: "coverImageUrl",
      width: "10%",
      key: "coverImageUrl",
      render: (_, record) => (
        <img
          className="h-12 w-12 p-3 rounded bg-black"
          src={record.ImageUrl}
          alt=""
        />
      ),
    },
    {
      title: "Başlık",
      dataIndex: "ServiceTitle",
      key: "ServiceTitle",
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
    if (defaultService) {
      form.setFieldsValue({
        ServiceTitle: defaultService.ServiceTitle,
        ImageUrl: defaultService.ImageUrl,
      });
    }
  }, [defaultService, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        const data = {
          ServiceTitle: values.ServiceTitle,
          ImageUrl: imgUrl,
        };
        console.log(data);

        const editServices = async () => {
          const response = await fetch(
            `http://localhost:8080/api/admin/service/${defaultService._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({ updateService: data}),
            }
          );
          if(response.ok) {
            const json = await response.json();
            dispatch(changeService(json));
          }
        };
        editServices();

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
        console.log("bu data", data.imgUrl);
        onSuccess();
        message.success("Dosya yüklendi.");
        setImgUrl(data.imgUrl);
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
      <div className="container mx-auto mt-6">
        <h1 className="text-3xl font-bold mb-4">Hizmetler</h1>
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
          <Table
            dataSource={service.services}
            columns={columns}
            rowKey={"_id"}
          />
        </div>

        <AddService open={isModalVisible} setOpen={setIsModalVisible} />
        <Modal
          title="Hizmet Düzenle"
          open={editModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              name="ServiceTitle"
              label="Başlık"
              initialValue={defaultService?.ServiceTitle}
              rules={[{ required: true, message: "Başlık alanı zorunludur!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ImageUrl"
              label="Kapak Resim URL"
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

export default Services;
