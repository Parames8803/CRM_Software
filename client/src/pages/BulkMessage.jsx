import React, { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";
import {
  useAddFollowUserMutation,
  useDeleteFollowUserMutation,
  useGetFollowUserQuery,
} from "../redux/slices/api/followUserApiSlice";
import { toast } from "sonner";
import SendMessage from "../components/SendMessage";
import Button from "../components/Button";
import Loading from "../components/Loader";

const BulkMessage = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [sendEmails, setEmails] = useState([]);

  const [followUsers] = useAddFollowUserMutation();
  const { users, isLoading, refetch } = useGetFollowUserQuery();
  const [deleteFollowUser] = useDeleteFollowUserMutation();

  const sendEmailHandler = (state) => {
    if (state === false) {
      window.location.reload();
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        let res = await followUsers(parsedData).unwrap();
        window.location.reload();
        toast.success(res.message);
      };
    }
  };

  const handleDeleteUser = async (user) => {
    await deleteFollowUser(user._id);
    refetch();
    window.location.reload();
    toast.success("Follow on user deleted");
  };

  const handleGmailService = async (user) => {
    setOpen(true);
    setEmails([user]);
  };

  const handlePhoneService = async (user) => {
    console.log(user);
  };

  const fetchData = async () => {
    try {
      const result = await refetch();
      setEmails(result.data);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-5">
      <>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">
            Send Bulk Messages
          </div>
          <div className="py-6">
            <form action="" method="post" onSubmit={handleFileSubmit}>
              <input
                type="file"
                name="xcel_file"
                onChange={handleFileChange}
                required
              />
              <Button
                icon={<FaCloudUploadAlt />}
                className={"text-white bg-gray-800 rounded-lg"}
                type={"submit"}
              />
            </form>
          </div>
        </div>
        {data.length > 0 ? (
          <div>
            <table className="w-full bg-gray-200 rounded-lg">
              <thead className="bg-slate-300">
                <tr>
                  <th className="py-3 text-lg">S.no</th>
                  <th className="py-3 text-lg">Name</th>
                  <th className="py-3 text-lg">Phone</th>
                  <th className="py-3 text-lg">Email</th>
                  <th className="py-3 text-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="py-4 text-base text-center">{index + 1}</td>
                    <td className="py-4 text-base text-center">{item.name}</td>
                    <td className="py-4 text-base text-center">{item.phone}</td>
                    <td className="py-4 text-base text-center">{item.email}</td>
                    <td className="py-4 text-base text-center flex justify-around items-center">
                      <FaPhone
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          handlePhoneService(item);
                        }}
                      />
                      <SiGmail
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                          handleGmailService(item);
                        }}
                      />
                      <MdDelete
                        className="text-black-600 text-2xl cursor-pointer"
                        onClick={() => {
                          handleDeleteUser(item);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-2xl text-gray-700">
            No Follow ups in Database
          </div>
        )}
        <div className="flex justify-end">
          <Button
            icon={<FaCloudUploadAlt />}
            className={
              "flex gap-5 items-center justify-between text-white bg-gray-800 rounded-lg w-fit my-8"
            }
            type={"submit"}
            label={"Send Bulk Email"}
            onClick={() => {
              setOpen(true);
              setEmails(data);
            }}
          />
        </div>
      </>
      <SendMessage
        open={open}
        setOpen={setOpen}
        handler={sendEmailHandler}
        data={sendEmails}
      />
    </div>
  );
};

export default BulkMessage;
