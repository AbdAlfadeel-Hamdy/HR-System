// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const authApi = createApi({
//   reducerPath: "photos",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000/api/v1/employess",
//   }),
//   tagTypes: ["Auth"],
//   endpoints(builder) {
//     return {
//       // ADD Photo
//       login: builder.mutation({
//         invalidatesTags: (results, error, album) => [
//           { type: "Auth", id: album.id },
//         ],
//         query: (user: { email: string; password: string }) => {
//           return {
//             method: "POST",
//             url: "/photos",
//             body: {
//               url: faker.image.url(),
//               albumId: album.id,
//             },
//           };
//         },
//       }),
//     };
//   },
// });

// export const { useFetchEmployeesQuery } = employeesApi;
