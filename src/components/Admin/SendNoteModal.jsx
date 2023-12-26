import React, { useState } from 'react';
import { Modal, Button, Input, message } from 'antd';
import { useSelector } from 'react-redux';

const SendNoteModal = ({ visible, onClose, defaultUser }) => {
  const [note, setNote] = useState('');
  const user = useSelector((state) => state.user.user);
  const handleOk = async () => {
    const response = await fetch(
        "http://localhost:8080/api/admin/sendnote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({receiver: defaultUser.username, message: note}),
        }
      );

      if(response.ok){
        message.success("Mesaj gönderildi!");
      }

      if(response.status === "404"){
        message.error("Bir hata oluştu!");
      }
    onClose();
  };

  const handleCancel = () => {
    // Modal'ı kapat
    onClose();
  };

  return (
    <Modal
      title="Not Bırak"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          İptal
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Kaydet
        </Button>,
      ]}
    >
      <Input.TextArea
        placeholder="Notunuzu buraya yazın..."
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </Modal>
  );
};

export default SendNoteModal;
