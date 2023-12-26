import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form, Input, message, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { changeFaq, deleteFaq } from "../../redux/faqSlice";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddFaq from "./Modals/AddFaq";
const AdminFaqs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const faq = useSelector((state) => state.faq);
  const [defaultFaq, setDefaultFaq] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Silmek istediğine emin misin?")) {
      const deleteService = async () => {
        const response = await fetch(
          `http://localhost:8080/api/admin/faq/${id}`,
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
          dispatch(deleteFaq(id));
        }
      };

      deleteService();
    }
  };

  const handleEdit = (record) => {
    setDefaultFaq(record);
    setEditModal(true);
  };
  const columns = [
    {
      title: "Soru",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Cevap",
      dataIndex: "answer",
      key: "answer",
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
    if (defaultFaq) {
      form.setFieldsValue({
        question: defaultFaq.question,
        answer: defaultFaq.answer,
      });
    }
  }, [defaultFaq, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          question: values.question,
          answer: values.answer,
        };

        const editFaqs = async () => {
          const response = await fetch(`http://localhost:8080/api/admin/faq/${defaultFaq._id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({updateFaq: data}),
          });
          if(response.status === 403 || response.status === 401){
            message.error("Yetkiniz yok!")
            navigate("/admin");
          }
          if (response.ok) {
            const json = await response.json();
            dispatch(changeFaq(json));
            message.success("Soru/Cevap başarıyla güncellendi!");
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
          <Table dataSource={faq.faqs} columns={columns} rowKey={"id"} />
        </div>

        <AddFaq open={isModalVisible} setOpen={setIsModalVisible} />
        <Modal
          title="Hizmet Düzenle"
          open={editModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              name="question"
              label="Soru"
              initialValue={defaultFaq?.question}
              rules={[{ required: true, message: "Soru alanı zorunludur!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="answer"
              label="Cevap"
              initialValue={defaultFaq?.answer}
              rules={[{ required: true, message: "Cevap alanı zorunludur!" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminFaqs;
