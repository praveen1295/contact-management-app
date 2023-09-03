import React, { useEffect, useState } from "react";
import Card from "./Card";

interface Contact {
  firstName: string;
  lastName: string;
}

const Contact = () => {
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(-1);

  const [contactList, setContactList] = useState<
    { name: string; status: string }[]
  >([]);

  const handleOptionChange = (e: any): void => {
    setSelectedOption(e.target.value);
  };

  const handleChange = (e: string, type: string): void => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    console.log("object", e);
    if (type === "firstName") {
      setFirstName(e);
    } else {
      setLastName(e);
    }
  };

  const handleSubmit = (e: any, type: string): void => {
    e.preventDefault();
    console.log("event", firstName);

    if (firstName === "" && lastName === "") {
      alert("All fields are require");
      return;
    }
    if (type === "edit") {
      const arr = contactList.map((item, idx) => {
        if (idx === editIndex) {
          return { name: firstName + " " + lastName, status: selectedOption };
        }
        return item;
      });
      setContactList(arr);
    } else {
      setContactList([
        ...contactList,
        {
          name: firstName + " " + lastName,
          status: selectedOption,
        },
      ]);
    }
    setFirstName("");
    setLastName("");
    setShowForm(false);
    setEdit(false);
  };

  const deleteItem = (idx: number) => {
    const updatedList = contactList.filter((item, index) => {
      return idx !== index;
    });
    setContactList(updatedList);
  };

  useEffect(() => {
    console.log("contactList", contactList);
  }, [editIndex]);
  console.log("firstName", firstName);

  return (
    <div className="py-8 flex flex-col gap-7 items-center justify-center min-w-full">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Contact
        </button>
      ) : (
        <form className="min-w-full flex flex-col justify-center items-center gap-5">
          <div className="mx-auto w-2/4 h-58 border-2 border-gray-600 p-10 flex flex-col gap-4">
            <label className="flex items-center gap-5">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                First Name
              </span>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => handleChange(e.target.value, "firstName")}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="first name"
              />
            </label>
            <label className="flex items-center gap-5">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Last name
              </span>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => handleChange(e.target.value, "lastName")}
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="last name"
              />
            </label>

            <div className="flex justify-center items-center gap-5">
              <label className="block text-gray-700 font-bold mb-2">
                Status:
              </label>
              <div className="flex flex-col justify-center gap-2">
                <label className="inline-flex items-center">
                  <span className="ml-2 w-16">Active</span>
                  <input
                    type="radio"
                    className="form-radio text-indigo-600 h-5 w-5"
                    value="Active"
                    checked={selectedOption === "Active"}
                    onChange={handleOptionChange}
                  />
                </label>
                <label className="inline-flex items-center">
                  <span className="ml-2 w-16">Inactive</span>
                  <input
                    type="radio"
                    className="form-radio text-indigo-600 h-5 w-5"
                    value="Inactive"
                    checked={selectedOption === "Inactive"}
                    onChange={handleOptionChange}
                  />
                </label>
              </div>
            </div>
          </div>
          {!edit ? (
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, "submit")}
              className="w-54 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Contact
            </button>
          ) : (
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, "edit")}
              className="w-54 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Edited Contact
            </button>
          )}
        </form>
      )}

      <div className="min-w-full flex flex-wrap gap-10 justify-center">
        {contactList.map((item, idx) => {
          return (
            <Card
              key={idx}
              item={item}
              idx={idx}
              setEditIndex={setEditIndex}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setShowForm={setShowForm}
              setEdit={setEdit}
              setSelectedOption={setSelectedOption}
              deleteItem={deleteItem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Contact;
