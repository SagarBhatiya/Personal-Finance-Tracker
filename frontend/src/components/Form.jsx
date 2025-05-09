import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../components/globalContext";
import { plus } from "../utils/Icons";

function Form() {
  const { addIncome, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !date || !category) {
      setError("Please fill all required fields.");
      return;
    }

    addIncome({
      ...inputState,
      amount: Number(amount),
      date: date.toISOString(),
    });

    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: "",
    });

    setError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-700 text-center">
        Add Income
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        value={title}
        name={"title"}
        placeholder="Income Title"
        onChange={handleInput("title")}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
      />

      <input
        value={amount}
        type="text"
        name={"amount"}
        placeholder={"Amount"}
        onChange={handleInput("amount")}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
      />

      <DatePicker
        selected={date}
        placeholderText="Select Date"
        dateFormat="dd/MM/yyyy"
        onChange={(date) => setInputState({ ...inputState, date })}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={category}
        name="category"
        onChange={handleInput("category")}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
      >
        <option value="" disabled>
          Select Category
        </option>
        <option value="salary">Salary</option>
        <option value="freelancing">Freelancing</option>
        <option value="investments">Investments</option>
        <option value="stocks">Stocks</option>
        <option value="bitcoin">Bitcoin</option>
        <option value="bank">Bank Transfer</option>
        <option value="youtube">YouTube</option>
        <option value="other">Other</option>
      </select>

      <textarea
        name="description"
        value={description}
        placeholder="Add a Reference"
        onChange={handleInput("description")}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        rows="4"
      ></textarea>

      <button
        name={"Add Income"}
        icon={plus}
        bPad={".8rem 1.6rem"}
        bRad={"30px"}
        bg={"var(--color-accent"}
        color={"#fff"}
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        Add Income
      </button>
    </form>
  );
}

export default Form;
