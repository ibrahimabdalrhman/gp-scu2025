"use client";

import { IFaqItemProps } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";

const FAQITEM = ({ question, answer, index } : IFaqItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="border-b border-gray-200 py-5">
        <button 
          className="flex justify-between items-center w-full"
          onClick={() => setIsOpen(!isOpen)}

        >
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white ">
              <span className="text-sm">{index + 1}</span>
            </div>
            <h3 className="heading-six">{question}</h3>
          </div>
          <div className={`bg-primary text-white rounded-full p-1 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
            <Plus className="h-4 w-4" aria-hidden="true" />
          </div>
        </button>
        
        {isOpen && (
          <div className="ps-9 pe-4 mt-2 text-darkText">
            <p>{answer}</p>
          </div>
        )}
      </div>
    );
  };

  export default FAQITEM;