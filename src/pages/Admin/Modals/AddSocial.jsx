import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addSocial } from "../../../redux/socialSlice";
import { useNavigate } from "react-router-dom";
const AddSocial = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const user = useSelector((state) => state.user.user);
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          name: values.name,
          accountUrl: values.accountUrl,
          iconUrl: imgUrl,
        };
        console.log(data);
        const postSocials = async () => {
          const response = await fetch(
            "http://localhost:8080/api/admin/social",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({ addSocial: data}),
            }
          );
          if(response.status === 403 || response.status === 401){
            message.error("Yetkiniz yok!")
            navigate("/admin");
          }
          if(response.ok) {
            const json = response.json();
            dispatch(addSocial(json));
          }
        };
        postSocials();
        console.log(values);
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
      }
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
      title="Hizmet Ekle"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Platform"
          rules={[{ required: true, message: "Başlık alanı zorunludur!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="accountUrl"
          label="Hesap Url"
          rules={[{ required: true, message: "Başlık alanı zorunludur!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="iconUrl"
          label="İkon URL"
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
      </Form>
    </Modal>
  );
};

export default AddSocial;
