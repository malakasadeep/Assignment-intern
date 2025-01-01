import { AlertCircle, X } from "lucide-react";
import React from "react";
const CustomAlert = ({ message, type = "error", onClose }) => {
  return (
    <div
      className={`${
        type === "error"
          ? "bg-red-50 border-red-200"
          : "bg-yellow-50 border-yellow-200"
      } border rounded-lg p-4 flex items-center shadow-sm`}
    >
      <AlertCircle
        className={`h-4 w-4 ${
          type === "error" ? "text-red-500" : "text-yellow-500"
        }`}
      />
      <span className="ml-2 text-sm">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto hover:bg-gray-100 rounded-full p-1"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      )}
    </div>
  );
};
export default CustomAlert;
