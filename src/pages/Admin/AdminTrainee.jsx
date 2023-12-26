import React, { useEffect, useState } from "react";
import { Table, Space, Modal } from "antd";
import axios from "axios";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { useSelector } from "react-redux";

const AdminTrainee = () => {
  const user = useSelector((state) => state.user.user);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    {
      title: "Ad Soyad",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Eğitim Bilgisi",
      dataIndex: "eduInfo",
      key: "eduInfo",
    },
    {
      title: "Başvurulan Alan",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "Detay",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleView(record)}>Görüntüle</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/trainee/applications",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.status === 200) {
          setApplications(response.data);
        } else {
          console.error("Başvuruları getirme hatası:", response.statusText);
        }
      } catch (error) {
        console.error("Başvuruları getirme hatası:", error);
      }
    };

    fetchData();
  }, [user.token]);

  const handleView = (record) => {
    setSelectedApplication(record);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex">
      <AdminNavbar />
      <div className="container mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Kursiyer Başvuru Listesi</h2>
        <Table
          columns={columns}
          dataSource={applications}
          rowKey="_id"
          pagination={{
            pageSize: 10, // Her sayfada gösterilecek öğe sayısı
            showSizeChanger: true, // Sayfa boyutunu değiştirme seçeneğini göster
            pageSizeOptions: ["10", "20", "30"], // Sayfa boyutu seçenekleri
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} kayıt`,
          }}
          className="rounded-md overflow-hidden shadow-md"
        />

        <Modal
          width={700}
          title="Başvuru Detayları"
          open={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          {selectedApplication && (
            <div className="flex flex-col gap-1">
              <p>
                <strong>Ad Soyad:</strong> {selectedApplication.fullName}
              </p>
              <p>
                <strong>Telefon:</strong> {selectedApplication.phone}
              </p>
              <p>
                <strong>Eğitim Bilgisi:</strong> {selectedApplication.eduInfo}
              </p>
              <p>
                <strong>Başvurulan Eğitim:</strong> {selectedApplication.field}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AdminTrainee;
