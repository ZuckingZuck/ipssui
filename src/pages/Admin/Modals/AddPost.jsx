import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../../redux/postSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";

const AddPost = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.user.user);
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = { BlogTitle: values.BlogTitle, content: content, ImageUrl: imgUrl };
        console.log(data);
        const postServices = async () => {
          const response = await fetch(
            "http://localhost:8080/api/admin/blog",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({addBlog: data}),
            }
          );
          if(response.status === 403 || response.status === 401){
            message.error("Yetkiniz yok!")
            navigate("/admin");
          }
          if(response.ok){
            const json = await response.json();
            dispatch(addPost(json));
          }
        };
        postServices();
        setOpen(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("name", file);
    console.log("bu file....: ", formData);

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
        message.success("Dosya yüklendi.");
        onSuccess(data);
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
    <Modal
      width={"1000px"}
      title="Paylaşım Yap"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="BlogTitle"
          label="Başlık"
          rules={[{ required: true, message: "Başlık alanı zorunludur!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="ImageUrl"
          label="Kapak Resim URL"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: "Lütfen bir görsel yükleyin!" }]}
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
          {/* CKEditor 5 React entegrasyonu */}
          <CKEditor
            editor={ClassicEditor}
            data=""
            onChange={(event, editor) => {
              const content = editor.getData();
              setContent(content);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPost;
