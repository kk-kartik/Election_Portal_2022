import React from "react";
import { FAQData } from "./FAQData";
import FAQCard from "./FAQCard";
const FAQSection = (props) => {
  return (
    <div className="flex-row space-y-4 p-6 break-words">
      <div className="font-normal text-2xl">Frequently Asked Questions</div>
      {props.faq.map((item, index) => {
        return <FAQCard item={item} key={index} />;
      })}
    </div>
  );
};

export default FAQSection;