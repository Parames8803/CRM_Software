import { apiSlice } from "../apiSlice";

const PROPOSAL_URL = "/proposals";

const proposalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProposal: builder.mutation({
      query: (data) => ({
        url: `${PROPOSAL_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getProposals: builder.query({
      query: () => ({
        url: `${PROPOSAL_URL}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getProposalById: builder.query({
      query: (id) => ({
        url: `${PROPOSAL_URL}/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteProposal: builder.mutation({
      query: (id) => ({
        url: `${PROPOSAL_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateProposalMutation,
  useGetProposalByIdQuery,
  useGetProposalsQuery,
  useDeleteProposalMutation,
} = proposalApiSlice;
