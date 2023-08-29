import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { Album } from "./albumsApi";
// import { faker } from "@faker-js/faker";
// import { BASE_URL } from "../../utils/constants";

export interface Employee {
  id: number;
  url: string;
  albumId: number;
}

export const employeesApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/employess",
  }),
  tagTypes: ["Employees"],
  endpoints(builder) {
    return {
      // FETCH Employees
      fetchEmployees: builder.query({
        providesTags: (results, error, album) => [
          ...results.map((employee: Employee) => ({
            type: "Photo",
            id: employee.id,
          })),
          { type: "AlbumPhoto", id: album.id },
        ],
        query: () => {
          return {
            method: "GET",
            url: "/employess",
            // params: {
            //   albumId: album.id,
            // },
          };
        },
      }),
      // ADD Photo
      // addPhoto: builder.mutation({
      //   invalidatesTags: (results, error, album) => [
      //     { type: "AlbumPhoto", id: album.id },
      //   ],
      //   query: (album: Album) => {
      //     return {
      //       method: "POST",
      //       url: "/photos",
      //       body: {
      //         url: faker.image.url(),
      //         albumId: album.id,
      //       },
      //     };
      //   },
      // }),
      // DELETE Photo
      // deletePhoto: builder.mutation({
      //   invalidatesTags: (results, error, photo) => [
      //     { type: "Photo", id: photo.id },
      //   ],
      //   query: (photo: Photo) => {
      //     return {
      //       method: "DELETE",
      //       url: `/photos/${photo.id}`,
      //     };
      //   },
      // }),
    };
  },
});

export const { useFetchEmployeesQuery } = employeesApi;
