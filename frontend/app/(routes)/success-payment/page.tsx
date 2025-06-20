"use client";

import { useEffect } from "react";

export default function page() {
    useEffect(() => {
      setTimeout(() => {
        window.location.href = "/";
      }, 4000);
    })
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase! Your transaction has been completed.
          </p>
        
        </div>
      </div>
    );
  }
  