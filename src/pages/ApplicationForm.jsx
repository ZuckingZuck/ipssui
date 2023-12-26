import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ApplicationForm = () => {
    useDocumentTitle("IPSS - Ekip Başvuru Formu")
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    eduInfo: "",
    introduce: "",
    field: "", // Bu alana eklenen değerler select seçenekleri olacak
    competence: "",
    extra: "",
    experience: "",
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
        "http://localhost:8080/api/client/team-application",
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
        competence: "",
        extra: "",
        experience: "",
      });
    } catch (error) {
      console.error("Başvuru gönderme hatası:", error);
      // Hata durumunda kullanıcıya bir hata mesajı gösterilebilir
      alert("Başvurunuz gönderilemedi. Lütfen daha sonra tekrar deneyin.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">IPSS - Başvuru Formu</h2>
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
            Kendinizi tanıtınız (bildiğiniz mühendislik,tasarım/simülasyon
            programları, ilgi alanlarınız, hobileriniz vs.)
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
            Başvurulan Alan
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

        <div className="flex flex-col">
          <label htmlFor="competence" className="text-sm font-semibold mb-1">
            Seçtiğiniz Alandaki Yetenekleriniz ve Kullandığınız Programlar
          </label>
          <textarea
            id="competence"
            name="competence"
            rows="4"
            value={formData.competence}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            required
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="extra" className="text-sm font-semibold mb-1">
            Eklemek İstedikleriniz
          </label>
          <textarea
            id="extra"
            name="extra"
            rows="4"
            value={formData.extra}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="experience" className="text-sm font-semibold mb-1">
            Daha önceden yetkin olduğunuz bir konu üzerine (örnek: web tasarım)
            yapmış olduğunuz çalışmayı elinizde fotoğraf halinde varsa{" "}
            <a
              className="text-blue-500"
              target="_blank"
              rel="noreferrer"
              href="https://hizliresim.com"
            >
              https://hizliresim.com
            </a>{" "}
            adresine yükleyip linkini buraya gönderirseniz, bize değerlendirme
            konusunda çok yardımcı olmuş olursunuz.
          </label>
          <textarea
            id="experience"
            name="experience"
            rows="4"
            value={formData.experience}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          ></textarea>
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

export default ApplicationForm;
