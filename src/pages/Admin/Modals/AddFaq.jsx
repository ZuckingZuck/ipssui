import React from "react";
import { Modal, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFaq } from "../../../redux/faqSlice";
const AddFaq = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user.user);
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const postServices = async () => {
          const response = await fetch("http://localhost:8080/api/admin/faq", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ addFaq: values}),
          });
          if(response.status === 403 || response.status === 401){
            message.error("Yetkiniz yok!")
            navigate("/admin");
          }
          if(response.ok){
            dispatch(addFaq(values));
          }
        };
        postServices();
        message.success("Soru/Cevap başarıyla eklendi!");
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
      title="Soru/Cevap Ekle"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="question"
          label="Soru"
          rules={[{ required: true, message: "Soru alanı zorunludur!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="answer"
          label="Cevap"
          rules={[{ required: true, message: "Cevap alanı zorunludur!" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFaq;
