import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState([]); //the items data is stored in an array

  function handleAddItems(newItem) {
    setItems((item) => [...item, newItem]);
  }

  return (
    <div className="app">
      <Logo></Logo>
      <Form onAddItems={handleAddItems}></Form>
      <PackingList items={items}></PackingList>
      <Stats></Stats>
    </div>
  );
}

function Logo() {
  return <h1 className="h1">🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); //the default behaviour of HTML is to reload a page on receiving a response, but we want a single page application

    if (!description) return;

    const itemObj = { id: Date.now(), description, quantity, packed: false };
    console.log(itemObj);

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

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item itemObj={item} key={item.id}></Item>
        ))}
      </ul>
    </div>
  );
}

function Item({ itemObj }) {
  return (
    <li>
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>🎒You have X items on your list, and you already packed X%</em>
    </footer>
  );
}
