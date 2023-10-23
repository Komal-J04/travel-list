import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); //the default behaviour of HTML is to reload a page on receiving a response, but we want a single page application

    if (!description) return;

    const itemObj = { id: Date.now(), description, quantity, packed: false };
    // console.log(itemObj);

    onAddItems(itemObj);

    setDescription(""); //once the submission is done, form should go back to its initial state
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?😍</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item name"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>add</button>
    </form>
  );
}
