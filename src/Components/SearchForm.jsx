import React, { useState, useEffect } from "react";
import {
  ArrowLeftRight,
  Calendar,
  ChevronDown,
  PlaneLanding,
  PlaneTakeoff,
  Search,
  Users,
  X,
} from "lucide-react";
import { format } from "date-fns";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FlightSearchForm = () => {
  const [activeClass, setActiveClass] = useState("business");
  const [tripType, setTripType] = useState("roundtrip");
  const [departureCity, setDepartureCity] = useState(null);
  const [arrivalCity, setArrivalCity] = useState(null);
  const [passengers, setPassengers] = useState(2);
  const [dates, setDates] = useState({
    departure: new Date(),
    arrival: new Date(),
  });

  const [departureSearch, setDepartureSearch] = useState("");
  const [arrivalSearch, setArrivalSearch] = useState("");
  const [departureResults, setDepartureResults] = useState([]);
  const [arrivalResults, setArrivalResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [token, setToken] = useState(null);

  // Get Amadeus access token
  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch(
          "https://test.api.amadeus.com/v1/security/oauth2/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "client_credentials",
              client_id: "LlHaOIpIcE2KQPWq0zusruhfrI4Lg5qM",
              client_secret: "yQIVEgx5pO3N2Jce",
            }),
          }
        );

        const data = await response.json();
        setToken(data.access_token);
      } catch (err) {
        setError("Failed to authenticate with Amadeus API");
      }
    };

    getToken();
  }, []);

  // Search airports function
  const searchAirports = async (query, setResults) => {
    if (!query || query.length < 2 || !token) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setResults(data.data || []);
    } catch (err) {
      setError("Failed to fetch airports");
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchAirports(departureSearch, setDepartureResults);
    }, 300);

    return () => clearTimeout(timer);
  }, [departureSearch, token]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchAirports(arrivalSearch, setArrivalResults);
    }, 300);

    return () => clearTimeout(timer);
  }, [arrivalSearch, token]);

  // Custom Input component for DatePicker
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div
      className="flex items-center border rounded-lg p-3 hover:border-bg-primary transition-colors cursor-pointer"
      onClick={onClick}
      ref={ref}
    >
      <Calendar className="w-5 h-5 text-gray-500" />
      <span className="ml-2">{value}</span>
      <ChevronDown className="ml-auto text-gray-400" />
    </div>
  ));

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

  // City Selection Component
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
            placeholder="Search city or airport"
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
                    <div className="font-semibold">
                      {result.address.cityName}
                    </div>
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

  const handleSearch = async () => {
    if (!departureCity || !arrivalCity || !dates.departure) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${
          departureCity.iataCode
        }&destinationLocationCode=${
          arrivalCity.iataCode
        }&departureDate=${format(
          dates.departure,
          "yyyy-MM-dd"
        )}&adults=${passengers}&travelClass=${activeClass.toUpperCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      // Handle the flight search results here
      console.log(data);
    } catch (err) {
      setError("Failed to search flights");
    }
  };

  return (
    <div className="relative z-20 mx-auto -mt-36">
      {/* Class Selection Tabs */}
      <div className="flex justify-center -space-x-4">
        {["BUSINESS CLASS", "FIRST CLASS"].map((classType) => (
          <button
            key={classType}
            onClick={() =>
              setActiveClass(classType.toLowerCase().split(" ")[0])
            }
            className={`px-6 py-3 w-60 text-white font-bold rounded-tl-xl rounded-tr-xl ${
              activeClass === classType.toLowerCase().split(" ")[0]
                ? "bg-bg-primary z-10 shadow-lg"
                : "bg-gray-500"
            }`}
          >
            {classType}
          </button>
        ))}
      </div>

      {/* Main Form Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6">
        {/* Trip Type Selection */}
        <div className="flex justify-center mb-6">
          <div className="flex w-fit justify-center space-x-4 bg-gray-100 rounded-lg p-2">
            {["One Way", "Round Trip", "Multicity"].map(
              (type, index, array) => (
                <React.Fragment key={type}>
                  <button
                    onClick={() =>
                      setTripType(type.toLowerCase().replace(" ", ""))
                    }
                    className={`px-4 py-2 font-bold rounded-lg transition-colors ${
                      tripType === type.toLowerCase().replace(" ", "")
                        ? "bg-white text-bg-primary shadow-sm"
                        : "text-gray-500"
                    }`}
                  >
                    {type}
                  </button>
                  {index < array.length - 1 && (
                    <span className="text-2xl text-gray-500">|</span>
                  )}
                </React.Fragment>
              )
            )}
          </div>
        </div>

        {/* Flight Search Fields */}
        <div className="flex flex-wrap md:flex-nowrap">
          <CityField
            label="Departure City"
            icon={PlaneTakeoff}
            searchValue={departureSearch}
            setSearchValue={setDepartureSearch}
            results={departureResults}
            selectedCity={departureCity}
            setSelectedCity={setDepartureCity}
          />

          {/* Swap Button */}
          <div className="flex items-center justify-center relative -left-3 top-3 z-10">
            <button
              className="bg-bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-bg-primary transition-colors"
              onClick={() => {
                const temp = departureCity;
                setDepartureCity(arrivalCity);
                setArrivalCity(temp);
              }}
            >
              <ArrowLeftRight size={20} />
            </button>
          </div>

          <CityField
            label="Arrival City"
            icon={PlaneLanding}
            searchValue={arrivalSearch}
            setSearchValue={setArrivalSearch}
            results={arrivalResults}
            selectedCity={arrivalCity}
            setSelectedCity={setArrivalCity}
            className="-ml-6 z-0"
          />

          {/* Date Fields */}
          <div className="w-5/12 md:w-1/5 md:ml-4 z-40">
            <label className="block text-sm text-bg-primary mb-1">
              Departure Date
            </label>
            <DatePicker
              selected={dates.departure}
              onChange={(date) => setDates({ ...dates, departure: date })}
              customInput={<CustomDateInput />}
              minDate={new Date()}
              dateFormat="dd MMM yyyy, eee"
            />
          </div>

          {tripType === "roundtrip" && (
            <div className="w-5/12 md:w-1/5 ml-4 z-40">
              <label className="block text-sm text-bg-primary mb-1">
                Return Date
              </label>
              <DatePicker
                selected={dates.arrival}
                onChange={(date) => setDates({ ...dates, arrival: date })}
                customInput={<CustomDateInput />}
                minDate={dates.departure}
                dateFormat="dd MMM yyyy, eee"
              />
            </div>
          )}

          {/* Passengers */}
          <div className="w-10/12 md:w-1/5 md:ml-4">
            <label className="block text-sm text-bg-primary mb-1">
              Passengers
            </label>
            <div className="flex items-center border rounded-lg p-3 hover:border-bg-primary transition-colors h-16">
              <Users className="w-5 h-5 text-gray-500" />
              <span className="ml-2">{passengers} Passengers</span>
              <ChevronDown className="ml-auto text-gray-400" />
            </div>
          </div>
        </div>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        {/* Search Button */}
        <div className="flex justify-center relative top-12">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-bg-primary hover:bg-red-950 text-white px-8 py-3 w-48 rounded-full flex items-center space-x-4 transition-all duration-300 shadow-lg hover:shadow-xl relative "
          >
            {loading ? "Searching..." : "Search Flight"}
            <div className="bg-white p-2 w-10 h-10 rounded-full flex items-center justify-center absolute right-1  transition-all">
              <Search className="w-5 h-5 text-bg-primary" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchForm;
