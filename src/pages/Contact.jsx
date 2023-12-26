import React, { useState } from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { message } from 'antd';
import DOMPurify from 'dompurify';

const ContactForm = () => {
  useDocumentTitle("IPSS - İletişim");
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [projectDetail, setProjectDetail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // İletiyi gönder
    const sendContact = async () => {
      const response = await fetch("http://localhost:8080/api/client/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, subject, projectDetail: DOMPurify.sanitize(projectDetail) }),
      });

      if (response.ok) {
        message.success("Mesajınız alındı!");
      }
    };

    await sendContact();

    // Formu sıfırla
    setName('');
    setPhone('');
    setEmail('');
    setSubject('');
    setProjectDetail('');

    console.log({
      name,
      phone,
      email,
      subject,
      projectDetail,
    });
  };

  return (
    <div className="contact bg-gray-100 p-8 rounded-lg shadow-md container mx-auto mt-10 mb-10">
      <div className="head text-center">
        <h2 className="text-2xl font-bold mb-2">İletişim</h2>
        <p>IPSS ile iletişime geçme zamanı.</p>
      </div>

      <div className="contact-body mt-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label htmlFor="isim-soyisim" className="text-sm font-semibold mb-1">Ad Soyad<span className="text-red-500">*</span></label>
            <input
              type="text"
              maxLength="25"
              id="isim-soyisim"
              name="name"
              pattern="[a-zA-Z'-'\s]*"
              title="Lütfen harf giriniz"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="telefon" className="text-sm font-semibold mb-1">Telefon<span className="text-red-500">*</span></label>
            <input
              type="string"
              maxLength="10"
              name="telefon"
              placeholder="XXX XXX XXXX"
              pattern="\d{3}\d{3}\d{4}"
              title="Lütfen sadece sayı girin(XXX XXX XXXX)"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold mb-1">E-mail<span className="text-red-500">*</span></label>
            <input
              type="email"
              maxLength="25"
              name="email"
              size="30"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="subject" className="text-sm font-semibold mb-1">Konu</label>
            <input
              type="text"
              name="subject"
              size="20"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="subjectt" className="text-sm font-semibold mb-1">Proje Detayı<span className="text-red-500">*</span></label>
            <textarea
              type="text"
              name="subjectt"
              rows="7"
              required
              value={projectDetail}
              onChange={(e) => setProjectDetail(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            ></textarea>
          </div>

          <button type="submit" className="bg-color text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
