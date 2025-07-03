// "use client";
// import { useFetchData } from "@/hooks/useFetchData";
// import Link from "next/link";
// import React, { useState } from "react";

// export default function Dashboard() {
//   const [tab, setTab] = useState<"bookings" | "favorites" | "userInfo">(
//     "bookings"
//   );
//   const {
//     data: bookings,
//     isPending: bookingsPending,
//     isError: bookingsError,
//   } = useFetchData("/flight-booking", "bookings");
//   const {
//     data: user,
//     isPending: userPending,
//     isError: userError,
//   } = useFetchData("/user/profile", "userInfo");

//   const tabs = ["bookings", "userInfo"] as const;

//   // Loading Component
//   const LoadingSpinner = () => (
//     <div className="flex justify-center items-center py-12">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       <span className="ml-3 text-gray-600">Loading...</span>
//     </div>
//   );

//   // Error Component
//   const ErrorMessage = ({ message }: { message: string }) => (
//     <div className="flex justify-center items-center py-12">
//       <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
//         <div className="flex items-center">
//           <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
//             <svg
//               className="w-5 h-5 text-red-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               ></path>
//             </svg>
//           </div>
//           <div>
//             <h3 className="text-red-800 font-medium">Error</h3>
//             <p className="text-red-600 text-sm">{message}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="md:py-16 py-6 container">
//       <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

//       {/* Tabs */}
//       <div className="flex justify-center mb-8 border-b">
//         {tabs.map((key) => (
//           <button
//             key={key}
//             onClick={() => setTab(key)}
//             className={`px-6 py-2 font-medium border-b-2 transition ${
//               tab === key
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-blue-600"
//             }`}
//           >
//             {key.charAt(0).toUpperCase() + key.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       {tab === "bookings" && (
//         <>
//           {bookingsPending && <LoadingSpinner />}
//           {bookingsError && (
//             <ErrorMessage message="Failed to load bookings. Please try again." />
//           )}
//           {!bookingsPending && !bookingsError && bookings && (
//             <div className="overflow-x-auto max-w-[90%] mx-auto border rounded-lg">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-100 text-gray-700 uppercase">
//                   <tr>
//                     <th className="p-3 whitespace-nowrap">Passenger</th>
//                     <th className="p-3 whitespace-nowrap">Flight</th>
//                     <th className="p-3 whitespace-nowrap">Date</th>
//                     <th className="p-3 whitespace-nowrap">Class</th>
//                     <th className="p-3 whitespace-nowrap">Price</th>
//                     <th className="p-3 whitespace-nowrap">Status</th>
//                     <th className="p-3 whitespace-nowrap">Count</th>
//                     <th className="p-3 whitespace-nowrap">Requests</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white">
//                   {bookings?.length > 0 ? (
//                     bookings.map((b: any) => (
//                       <tr key={b._id} className="border-b hover:bg-gray-50">
//                         <td className="p-3 whitespace-nowrap">
//                           {b.passenger_name}
//                         </td>
//                         <td className="p-3 whitespace-nowrap">
//                           {b.flight.departure_airport} →{" "}
//                           {b.flight.arrival_airport}
//                         </td>
//                         <td className="p-3 whitespace-nowrap">
//                           {new Date(b.flight.departure_time).toLocaleString()}
//                         </td>
//                         <td className="p-3 capitalize whitespace-nowrap">
//                           {b.seat_class.replace("_", " ")}
//                         </td>
//                         <td className="p-3 font-semibold whitespace-nowrap">
//                           ${b.price}
//                         </td>
//                         <td
//                           className={`p-3 font-medium whitespace-nowrap ${
//                             b.payment_status === "paid"
//                               ? "text-green-600"
//                               : "text-red-600"
//                           }`}
//                         >
//                           {b.payment_status}
//                         </td>
//                         <td className="p-3 whitespace-nowrap">
//                           {b.passenger_count}
//                         </td>
//                         <td className="p-3 text-sm text-gray-600 max-w-xs truncate">
//                           {b.special_requests}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td className="p-8 text-center text-gray-500">
//                         <div className="flex flex-col items-center">
//                           <svg
//                             className="w-12 h-12 text-gray-300 mb-3"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                             ></path>
//                           </svg>
//                           <p>No bookings found</p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </>
//       )}

//       {/* {tab === 'favorites' && (
//         <div className="text-center text-gray-500 py-12">
//           <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
//           </svg>
//           <p>المفضلة فارغة الآن، سيتم إضافتها لاحقًا</p>
//         </div>
//       )} */}

//       {tab === "userInfo" && (
//         <>
//           {userPending && <LoadingSpinner />}
//           {userError && (
//             <ErrorMessage message="Failed to load user information. Please try again." />
//           )}
//           {!userPending && !userError && user && (
//             <div className="md:max-w-[60%] mx-auto">
//               {/* Header Card */}
//               <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
//                     {user.firstname?.charAt(0) || "U"}
//                     {user.lastname?.charAt(0) || "N"}
//                   </div>
//                   <div>
//                     <h2 className="text-2xl font-bold">
//                       {user.firstname || "Unknown"} {user.lastname || "User"}
//                     </h2>
//                     <p className="text-blue-100 capitalize">
//                       {user.role || "No role"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Info Card */}
//               <div className="bg-white rounded-b-lg shadow-md border border-gray-100 p-6">
//                 <div className="space-y-4">
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Email:</span>
//                     <span className="font-medium text-gray-900">
//                       {user.email || "Not provided"}
//                     </span>
//                   </div>

//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Phone:</span>
//                     <span className="font-medium text-gray-900">
//                       {user.phone_number || "Not provided"}
//                     </span>
//                   </div>

//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Created:</span>
//                     <span className="font-medium text-gray-900">
//                       {user.createdAt
//                         ? new Date(user.createdAt).toLocaleDateString()
//                         : "Unknown"}
//                     </span>
//                   </div>

//                   <div className="flex justify-between py-2">
//                     <span className="text-gray-600">Updated:</span>
//                     <span className="font-medium text-gray-900">
//                       {user.updatedAt
//                         ? new Date(user.updatedAt).toLocaleDateString()
//                         : "Unknown"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="text-end pt-4">
//                 <Link
//                   href="/change-password"
//                   className="inline-block px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition"
//                 >
//                   Change Password
//                 </Link>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
"use client";
import { useFetchData } from "@/hooks/useFetchData";
import Link from "next/link";
import React, { useState } from "react";

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

// Error message component
const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center py-12">
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-600 text-sm">{message}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [tab, setTab] = useState<"bookings" | "hotelBookings" | "userInfo">("bookings");

  const {
    data: flightBookings,
    isPending: flightBookingsPending,
    isError: flightBookingsError,
  } = useFetchData("/flight-booking", "flightBookings");

  const {
    data: hotelBookings,
    isPending: hotelBookingsPending,
    isError: hotelBookingsError,
  } = useFetchData("/booking", "hotelBookings");

  const {
    data: user,
    isPending: userPending,
    isError: userError,
  } = useFetchData("/user/profile", "userInfo");

  const tabs = [
    { key: "bookings", label: "Flight Bookings" },
    { key: "hotelBookings", label: "Hotel Bookings" },
    { key: "userInfo", label: "User Info" },
  ] as const;

  return (
    <div className="md:py-16 py-6 container">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Booking</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8 border-b">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-6 py-2 font-medium border-b-2 transition ${
              tab === key ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* === Bookings Tab === */}
      {tab === "bookings" && (
        <>
          {flightBookingsPending && <LoadingSpinner />}
          {flightBookingsError && <ErrorMessage message="Failed to load bookings. Please try again." />}
          {!flightBookingsPending && !flightBookingsError && flightBookings && (
            <div className="overflow-x-auto w-full">
              <div className="min-w-[700px] max-w-[90%] mx-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                      <th className="p-3">Passenger</th>
                      <th className="p-3">Flight</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Class</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Count</th>
                      <th className="p-3">Requests</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {flightBookings.length > 0 ? (
                      flightBookings.map((b: any) => (
                        <tr key={b._id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{b?.passenger_name}</td>
                          <td className="p-3">{b?.flight.departure_airport} → {b.flight.arrival_airport}</td>
                          <td className="p-3">{new Date(b?.flight.departure_time).toLocaleString()}</td>
                          <td className="p-3 capitalize">{b?.seat_class.replace("_", " ")}</td>
                          <td className="p-3 font-semibold">${b?.price}</td>
                          <td className={`p-3 font-medium ${b?.payment_status === "paid" ? "text-green-600" : "text-red-600"}`}>
                            {b.payment_status}
                          </td>
                          <td className="p-3">{b.passenger_count}</td>
                          <td className="p-3 text-gray-600 truncate">{b.special_requests}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-8 text-center text-gray-500" colSpan={8}>
                          <div className="flex flex-col items-center">
                            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p>No bookings found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* === Hotel Bookings Tab === */}
      {tab === "hotelBookings" && (
        <>
          {hotelBookingsPending && <LoadingSpinner />}
          {hotelBookingsError && <ErrorMessage message="Failed to load hotel bookings. Please try again." />}
          {!hotelBookingsPending && !hotelBookingsError && hotelBookings && (
            <div className="overflow-x-auto w-full">
              <div className="min-w-[700px] max-w-[90%] mx-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                      <th className="p-3">Guest</th>
                      <th className="p-3">Hotel</th>
                      <th className="p-3">Check-In</th>
                      <th className="p-3">Check-Out</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Paid</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {hotelBookings.length > 0 ? (
                      hotelBookings.map((b: any) => (
                        <tr key={b._id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{b?.user?.firstname} {b.user.lastname}</td>
                          <td className="p-3">{b?.hotel?.name}</td>
                          <td className="p-3">{new Date(b?.checkIn).toLocaleDateString()}</td>
                          <td className="p-3">{new Date(b?.checkOut).toLocaleDateString()}</td>
                          <td className="p-3 font-semibold">${b?.totalPrice}</td>
                          <td className="p-3 capitalize text-blue-600 font-medium">{b?.status}</td>
                          <td className={`p-3 font-medium ${b?.paid ? "text-green-600" : "text-red-600"}`}>
                            {b.paid ? "Paid" : "Unpaid"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-8 text-center text-gray-500" colSpan={7}>
                          <div className="flex flex-col items-center">
                            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p>No hotel bookings found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* === User Info Tab === */}
      {tab === "userInfo" && (
        <>
          {userPending && <LoadingSpinner />}
          {userError && <ErrorMessage message="Failed to load user information. Please try again." />}
          {!userPending && !userError && user && (
            <div className="md:max-w-[60%] mx-auto">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                    {user?.firstname?.charAt(0) || "U"}{user?.lastname?.charAt(0) || "N"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{user?.firstname || "Unknown"} {user?.lastname || "User"}</h2>
                    <p className="text-blue-100 capitalize">{user?.role || "No role"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-b-lg shadow-md border p-6 space-y-4">
                <div className="flex justify-between border-b py-2 text-gray-700">
                  <span>Email:</span>
                  <span className="font-medium text-gray-900">{user?.email || "Not provided"}</span>
                </div>
                <div className="flex justify-between border-b py-2 text-gray-700">
                  <span>Phone:</span>
                  <span className="font-medium text-gray-900">{user?.phone_number || "Not provided"}</span>
                </div>
                <div className="flex justify-between border-b py-2 text-gray-700">
                  <span>Created:</span>
                  <span className="font-medium text-gray-900">
                    {user?.createdAt ? new Date(user?.createdAt).toLocaleDateString() : "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between py-2 text-gray-700">
                  <span>Updated:</span>
                  <span className="font-medium text-gray-900">
                    {user?.updatedAt ? new Date(user?.updatedAt).toLocaleDateString() : "Unknown"}
                  </span>
                </div>
              </div>

              <div className="text-end pt-4">
                <Link href="/change-password" className="inline-block px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition">
                  Change Password
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
