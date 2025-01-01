import { format } from "date-fns";
import { X } from "lucide-react";
import React from "react";

const CityField = ({
  label,
  icon: Icon,
  searchValue,
  setSearchValue,
  results,
  selectedCity,
  setSelectedCity,
  className = "",
}) => (
  <div className={`w-5/12 md:w-1/5 relative ${className}`}>
    <label className="block text-sm text-bg-primary mb-1">{label}</label>
    {selectedCity ? (
      <div className="flex items-center border rounded-lg p-3 hover:border-bg-primary transition-colors">
        <span className="text-base font-bold flex items-center">
          <Icon className="text-gray-500 mr-2" />
          {selectedCity.iataCode}
          <span className="text-4xl font-thin mx-2">|</span>
        </span>
        <div className="flex-grow">
          <p className="font-bold">{selectedCity.cityName}</p>
          <p className="text-sm text-gray-500">{selectedCity.name}</p>
        </div>
        <button
          onClick={() => setSelectedCity(null)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>
    ) : (
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search city or airport ..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-bg-primary h-16"
        />
        {results.length > 0 && searchValue && (
          <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {results.map((result) => (
              <button
                key={result.id}
                className="w-full p-2 text-left hover:bg-gray-100 flex items-center"
                onClick={() => {
                  setSelectedCity({
                    iataCode: result.iataCode,
                    cityName: result.address.cityName,
                    name: result.name,
                  });
                  setSearchValue("");
                }}
              >
                <Icon className="text-gray-500 mr-2" size={16} />
                <div>
                  <div className="font-semibold">{result.address.cityName}</div>
                  <div className="text-sm text-gray-500">{result.name}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
);

export default CityField;
