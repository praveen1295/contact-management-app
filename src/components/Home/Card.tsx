import React from "react";
interface CardProps {
  item: { name?: string; status: string }[] | any;
  idx: number;
  setEditIndex: (editIndex: number) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setShowForm: (showForm: boolean) => void;
  setEdit: (edit: boolean) => void;
  setSelectedOption: (selectedOption: string) => void;
  deleteItem: any;
}
const Card: React.FC<CardProps> = ({
  item,
  idx,
  setEditIndex,
  setFirstName,
  setLastName,
  setShowForm,
  setEdit,
  setSelectedOption,
  deleteItem,
}) => {
  const handleEdit = (idx: number, item: any): void => {
    setEditIndex(idx);
    setFirstName(item.name.split(" ")[0]);
    setLastName(item.name.split(" ")[1]);
    setSelectedOption(item.status);
    setShowForm(true);
    setEdit(true);
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-64 h-36 p-4 rounded-md bg-orange-300 border border-indigo-600 bg-white">
        <div className="flex">
          <div className="w-16">Name: </div>
          <span>{item.name}</span>
        </div>
        <div className="flex">
          <div className="w-16">Status: </div>
          <div>{item.status}</div>
        </div>
      </div>
      <button
        onClick={() => handleEdit(idx, item)}
        className="w-54 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        EDIT
      </button>
      <button
        onClick={() => deleteItem(idx)}
        className="w-54 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        DELETE
      </button>
    </div>
  );
};

export default Card;
