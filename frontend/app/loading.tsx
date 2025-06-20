import React from "react";

const loading = () => {
  return (
    <div className="flex gap-2 w-full h-full min-h-screen justify-center items-center">
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
    </div>
  );
};

export default loading;
