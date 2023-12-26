import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePost, deletePost } from "../../redux/postSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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

import AddPost from "./Modals/AddPost";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
const AdminPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const post = useSelector((state) => state.post);
  const [defaultPost, setDefaultPost] = useState({});
  const [content, setContent] = useState(defaultPost.content);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Silmek istediğine emin misin?")) {
      const deletePosts = async () => {
        const response = await fetch(
          `http://localhost:8080/api/admin/blog/${id}`,
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

        if (response.ok) {
          dispatch(deletePost(id));
        }
      };

      deletePosts();
    }
  };

  const handleEdit = (record) => {
    setImgUrl(record.ImageUrl);
    setDefaultPost(record);
    setEditModal(true);
  };
  const columns = [
    {
      title: "Görsel",
      dataIndex: "ImageUrl",
      width: "10%",
      key: "ImageUrl",
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
      dataIndex: "BlogTitle",
      key: "BlogTitle",
    },
    {
      title: "Ekleyen",
      dataIndex: "UserName",
      key: "UserName",
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
    if (defaultPost) {
      form.setFieldsValue({
        BlogTitle: defaultPost.BlogTitle,
        ImageUrl: defaultPost.ImageUrl,
      });
    }
  }, [defaultPost, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          BlogTitle: values.BlogTitle,
          ImageUrl: imgUrl,
          content: content,
          postStatus: defaultPost.postStatus,
        };
        console.log(data);

        const editServices = async () => {
          const response = await fetch(
            `http://localhost:8080/api/admin/blog/${defaultPost._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({updateBlog: data}),
            }
          );
          const json = await response.json();
          if (response.ok) {
            dispatch(changePost(json));
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
        console.log("bu data", data);
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
        <h1 className="text-3xl font-bold mb-4">Blog Paylaşımları</h1>
        <div className="mb-4">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={showModal}
          >
            Yeni Paylaşım Yap
          </Button>
        </div>
        <div>
          <Table dataSource={post.posts} columns={columns} rowKey={"_id"} />
        </div>

        <AddPost open={isModalVisible} setOpen={setIsModalVisible} />
        <Modal
          width={"1000px"}
          title="Paylaşım Düzenle"
          open={editModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              name="BlogTitle"
              label="Başlık"
              initialValue={defaultPost?.title}
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
            <Form.Item
              name="content"
              label="İçerik"
              rules={[{ required: true, message: "İçerik alanı zorunludur!" }]}
            >
              <CKEditor
                editor={ClassicEditor}
                data={defaultPost?.content}
                onChange={(event, editor) => {
                  const content = editor.getData();
                  setContent(content);
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminPosts;
