import { apiSlice } from "./apiSlice";

export const expensesApi = apiSlice.injectEndpoints({
  keepUnusedDataFor: 60, // duración de datos en cache
  refetchOnMountOrArgChange: true, // revalida al montar el componente
  refetchOnFocus: true, // revalida al cambiar de foco
  refetchOnReconnect: true, // revalida al reconectar
  tagTypes: ["expenses"],

  endpoints: (builder) => ({
    getAllExpenses: builder.query({
      query: () => "/expenses",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
      providesTags: ["expenses"],
    }),

    getExpenses: builder.query({
      query: (id) => `/expenses/${id}`,
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 3 },
      providesTags: ["expenses"],
    }),

    postExpenses: builder.mutation({
      query: (items) => ({
        url: "/expenses",
        method: "post",
        body: items,
      }),
      invalidatesTags: ["expenses"],
      extraOptions: { maxRetries: 0 },
    }),

    putExpenses: builder.mutation({
      query: ({ id, ...items }) => ({
        url: `/expenses/${id}`,
        method: "put",
        body: items,
      }),
      invalidatesTags: ["expenses"],
      extraOptions: { maxRetries: 0 },
    }),

    deleteExpenses: builder.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["expenses"],
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useGetExpensesQuery,
  usePostExpensesMutation,
  usePutExpensesMutation,
  useDeleteExpensesMutation,
} = expensesApi;
