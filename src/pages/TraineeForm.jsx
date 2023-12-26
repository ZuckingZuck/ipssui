import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import useDocumentTitle from "../hooks/useDocumentTitle";

const TraineeForm = () => {
    useDocumentTitle("IPSS - Kursiyer Başvuru Formu")
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    eduInfo: "",
    introduce: "",
    field: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Bu kısmı kendi API endpoint'inize uygun şekilde güncelleyin
      await axios.post(
        "http://localhost:8080/api/client/trainee-application",
        formData
      );

      // Başvuru başarıyla gönderildiğinde kullanıcıya bir mesaj gösterilebilir
      message.success("Başvurunuz başarıyla alındı!");

      // Formu sıfırla
      setFormData({
        fullName: "",
        phone: "",
        eduInfo: "",
        introduce: "",
        field: "",
      });
    } catch (error) {
      console.error("Başvuru gönderme hatası:", error);
      // Hata durumunda kullanıcıya bir hata mesajı gösterilebilir
      alert("Başvurunuz gönderilemedi. Lütfen daha sonra tekrar deneyin.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">IPSS - Kursiyer Başvuru Formu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="fullName" className="text-sm font-semibold mb-1">
            Ad Soyad
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-semibold mb-1">
            Telefon
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="eduInfo" className="text-sm font-semibold mb-1">
            Okuduğunuz Üniversite Bölüm ve Sınıf (Örnek: İskenderun Teknik
            Üniversitesi Makine Mühendisliği 2.sınıf)
          </label>
          <input
            type="text"
            id="eduInfo"
            name="eduInfo"
            value={formData.eduInfo}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="introduce" className="text-sm font-semibold mb-1">
            Kendinizi tanıtınız
          </label>
          <textarea
            id="introduce"
            name="introduce"
            rows="4"
            value={formData.introduce}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="field" className="text-sm font-semibold mb-1">
            Başvurulan Eğitim
          </label>
          <select
            id="field"
            name="field"
            value={formData.field}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          >
            <option value="" disabled>
              Seçiniz
            </option>
            <option value="Görüntü İşleme">Görüntü İşleme</option>
            <option value="Robotik Kodlama">Robotik Kodlama</option>
            <option value="Teknik Çizim">Teknik Çizim</option>
            <option value="Elektronik Aksan">Elektronik Aksan</option>
            <option value="Sosyal Medya">Sosyal Medya</option>
            <option value="Web Tasarım">Web Tasarım</option>
            <option value="Simülasyon">Simülasyon</option>
          </select>
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            className="bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
          >
            Başvur
          </button>
        </div>
      </form>
    </div>
  );
};

export default TraineeForm;
