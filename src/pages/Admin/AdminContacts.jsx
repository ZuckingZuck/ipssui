import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify'; // DOMPurify ekleyin
import { useSelector } from "react-redux";

const AdminContacts = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState({});
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/admin/contact",{
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
          const json = await response.json();
          setContacts(json);
        } else {
          console.error("Failed to fetch contacts");
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    getContacts();
  }, [navigate]);

  const handleCancel = () => {
    setDetail({});
    setOpen(false);
  };

  const handleDetail = (record) => {
    setDetail(record);
    setOpen(true);
  };

  const renderProjectDetail = () => {
    // projectDetail içindeki \n karakterini <br> etiketi ile değiştir
    const formattedProjectDetail = detail.projectDetail?.replace(/\n/g, '<br>');

    // Güvenli bir şekilde HTML içeriği işleme
    const sanitizedHTML = DOMPurify.sanitize(formattedProjectDetail, { ALLOWED_TAGS: ['br'] });

    return (
      <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    );
  };

  const columns = [
    {
      title: "Ad Soyad",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "E-posta",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Konu",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Detay",
      key: "detail",
      render: (_, record) => {
        return (
          <Button
            onClick={() => {
              handleDetail(record);
            }}
            type="primary"
          >
            Detay
          </Button>
        );
      },
    },
  ];

  return (
    <div className="flex">
      <AdminNavbar />
      <div className="container mx-auto mt-6">
        <h1 className="text-3xl font-bold mb-3">Mesajlar</h1>
        <Table dataSource={contacts} rowKey={"_id"} columns={columns} />
        <Modal
          footer={false}
          title="Proje Detayı"
          open={open}
          onCancel={handleCancel}
        >
          {renderProjectDetail()}
        </Modal>
      </div>
    </div>
  );
};

export default AdminContacts;
