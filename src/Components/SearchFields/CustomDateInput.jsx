import { Calendar, ChevronDown } from "lucide-react";
import React from "react";
const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <div
    className="flex items-center border rounded-lg p-3 hover:border-bg-primary transition-colors cursor-pointer h-16"
    onClick={onClick}
    ref={ref}
  >
    <Calendar className="w-5 h-5 text-gray-500" />
    <span className="ml-2">{value}</span>
    <ChevronDown className="ml-auto text-gray-400" />
  </div>
));
export default CustomDateInput;
