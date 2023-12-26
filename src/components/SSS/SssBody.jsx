import React, { useState } from "react";
import { useSelector } from "react-redux";
const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item border-2 border-black rounded">
      <div
        className="accordion-header bg-color p-3 text-white text-2xl cursor-pointer flex justify-between items-center"
        onClick={toggleAccordion}
      >
        <h3 className="accordion-title">{title}</h3>
        <span className="accordion-icon">
          {isOpen ? (
            <i className="fas fa-angle-down text-xl"></i>
          ) : (
            <i className="fas fa-angle-right text-xl"></i>
          )}
        </span>
      </div>
      {isOpen && (
        <div className="accordion-content bg-blue-950 transition text-white text-xl p-5 rounded-b">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

const SssBody = () => {
  const faq = useSelector((state) => state.faq);
  return (
    <div className="accordion-container flex flex-col gap-3 mb-40">
      {faq?.faqs?.map((item) => {
        return (
          <AccordionItem
            title={item.question}
            content={item.answer}
          />
        );
      })}
    </div>
  );
};

export default SssBody;
