import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plane,
} from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import Modal from "./Model";
const SearchResults = ({ isOpen, onClose, results, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;
  const totalPages = Math.ceil((results?.length || 0) / ITEMS_PER_PAGE);

  const paginatedResults = results?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Flight Search Results">
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bg-primary" />
        </div>
      ) : results?.length > 0 ? (
        <div>
          <div className="space-y-4">
            {paginatedResults?.map((flight, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Plane className="h-6 w-6 text-bg-primary" />
                    <div>
                      <p className="font-semibold">
                        {flight.itineraries[0].segments[0].carrierCode}
                      </p>
                      <p className="text-sm text-gray-500">
                        Flight {flight.itineraries[0].segments[0].number}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {flight.price.total} {flight.price.currency}
                    </p>
                    <p className="text-sm text-gray-500">
                      {flight.numberOfBookableSeats} seats left
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <div>
                      <p className="font-semibold">
                        {format(
                          new Date(
                            flight.itineraries[0].segments[0].departure.at
                          ),
                          "HH:mm"
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        {flight.itineraries[0].segments[0].departure.iataCode}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-0.5 w-16 bg-gray-300" />
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div className="h-0.5 w-16 bg-gray-300" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {format(
                          new Date(
                            flight.itineraries[0].segments[0].arrival.at
                          ),
                          "HH:mm"
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        {flight.itineraries[0].segments[0].arrival.iataCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-4 mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
          <p className="text-lg font-semibold">No flights found</p>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </Modal>
  );
};
export default SearchResults;
