import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Title from "../components/Title";
import { IoMdAdd } from "react-icons/io";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useGetProposalsQuery } from "../redux/slices/api/proposalApiSlice";
import Loading from "../components/Loader";
import { formatDate } from "../helpers/formatDate.js";

const Proposals = () => {
  const navigate = useNavigate();

  const { data: proposalData, isLoading, refetch } = useGetProposalsQuery();
  const [proposals, setProposals] = useState();

  useEffect(() => {
    if (proposalData) {
      console.log(proposalData);
      setProposals(proposalData.proposals);
    }
  }, [proposalData]);

  if (isLoading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-5">
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Proposals list" />
          <Button
            label="Add New Proposal"
            icon={<IoMdAdd className="text-lg" />}
            onClick={() => {
              navigate("/proposals/add_proposal");
            }}
            className="flex flex-row-reverse gap-1 items-center bg-gray-600 text-white rounded-md 2xl:py-2.5"
          />
        </div>

        <div className="bg-white shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700 text-white">
                <tr className="text-left">
                  <th className="text-center py-3">S.No</th>
                  <th className="text-center py-3">Proposal No</th>
                  <th className="text-center py-3">Date</th>
                  <th className="text-center py-3">Company</th>
                  <th className="text-center py-3">Amount</th>
                  <th className="text-center py-3">Status</th>
                  <th className="text-center py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {proposals && proposals.length > 0 && (
                  <>
                    {proposals.map((value, index) => (
                      <tr key={index} className="border-b border-gray-300">
                        <td className="text-center py-3">{index + 1}</td>
                        <td className="text-center py-3">{value.proposalId}</td>
                        <td className="text-center py-3">
                          {formatDate(value.createdAt)}
                        </td>
                        <td className="text-center py-3">
                          {value.leadId.companyName}
                        </td>
                        <td className="text-center py-3">
                          {value.totalAmount}
                        </td>
                        <td className="text-center py-3">
                          <span
                            className={clsx(
                              "text-white rounded-lg py-0.5 px-2 text-sm",
                              value.status === "Gain"
                                ? "bg-green-600"
                                : "bg-blue-600"
                            )}
                          >
                            {value.status}
                          </span>
                        </td>
                        <td className="text-center py-3">
                          <button
                            className="w-fit px-4 py-0.5 text-sm rounded-full bg-gray-200"
                            onClick={() => {
                              navigate(`/proposals/${value._id}`);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposals;
