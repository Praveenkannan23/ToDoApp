"use client";

import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Ballpit from "@/background/Ballpit/Ballpit";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { api } from "../envfile/api";
import toast, { Toaster } from "react-hot-toast";

const Todo = () => {
  const [userdata, setUserdata] = useState([]);
  const [newuserdata, setNewuserdata] = useState("");
  const [edit, setEdit] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const handleInputChange = (e) => {
    setNewuserdata(e.target.value);
  };

  const handleadd = () => {
    if (newuserdata.trim() !== "") {
      setUserdata((prevUserdata) => [...prevUserdata, newuserdata]);
      setNewuserdata("");
    }
  };

  const handleedit = (index) => {
    setNewuserdata(userdata[index]);
    setEdit(index);
  };

  const handlesave = () => {
    if (edit !== null && newuserdata.trim() !== "") {
      setUserdata((prevUserdata) =>
        prevUserdata.map((item, index) => (index === edit ? newuserdata : item))
      );
      setNewuserdata("");
      setEdit(null);
    }
  };

  const handleChange = (index) => {
    setCheckedItems((prevChecked) => ({
      ...prevChecked,
      [index]: !prevChecked[index],
    }));
  };

  const handledatasave = async () => {
    const token = localStorage.getItem("token");
    const header = { Authorization: `Bearer ${token}` };

    const body = {
      usertododata: userdata.map((item) => ({
        text: typeof item === "string" ? item : item.text,
      })),
    };

    console.log(body, "body");

    const response = await axios.post(api + "/auth/userSaveData", body, {
      header: header,
    });

    console.log(response.data, "response from server");
    console.log(header);
    

    if (response.data.success === true) {
      toast.success(` ${response.data.message}`);

    } else {
      toast.error(`${response.data.message}`);
    }
  };


  return (
    <>
      <div className="relative w-full h-screen">
        <Ballpit
          count={200}
          gravity={0.7}
          friction={0.8}
          wallBounce={0.95}
          followCursor={false}
        />
        <Toaster/>
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="bg-green-200 p-[5%] rounded-lg bg-opacity-80">
            <div className="text-2xl flex justify-center items-center text-green-700 font-serif font-bold bg-gray-100 p-4 rounded-full">
              Todo App
            </div>
            <div className="w-96">
              <input
                type="text"
                value={newuserdata}
                placeholder="Enter something you want to save"
                onChange={handleInputChange}
                className="bg-emerald-100 w-full rounded-lg h-10 text-black mt-4 mb-4 p-4"
              />
              <div className="flex justify-center w-96 items-center">
                <button
                  className="bg-emerald-500 p-2 w-full rounded-lg"
                  onClick={edit === null ? handleadd : handlesave}
                >
                  {edit === null ? "Add the details" : "Update"}
                </button>
              </div>
              <div className="w-96 mt-4 rounded-lg bg-emerald-100">
                <ol className="list-decimal pl-2">
                  {userdata.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-2"
                    >
                      <span
                        className={`text-black text-lg transition-opacity duration-300 ${
                          checkedItems[index] ? "opacity-30" : "opacity-100"
                        }`}
                      >
                        {item}
                      </span>
                      <div className="flex justify-evenly w-40 items-center">
                        <button
                          className="bg-indigo-500 hover:bg-fuchsia-500 text-white p-1 rounded-lg"
                          onClick={() => handleedit(index)}
                        >
                          <EditIcon />
                        </button>
                        <button
                          className="bg-red-500 p-1 rounded-lg"
                          onClick={() => handledelete(item.id)}
                        >
                          <DeleteIcon />
                        </button>
                        <Checkbox
                          checked={checkedItems[index] || false}
                          onChange={() => handleChange(index)}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="flex justify-end items-end m-2">
                  <button
                    className="bg-emerald-500 p-2 w-96 mt-2 mb-2 rounded-lg"
                    onClick={handledatasave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
