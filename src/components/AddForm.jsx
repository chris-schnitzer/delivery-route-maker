import { useState } from "react";
import "../Forms.css";
import { v4 as uuid } from 'uuid';

export default function AddForm({ passFormData }) {
  const [formData, setFormData] = useState({
    vanNo: "",
    vanId: uuid(),
    items: [{itemId: uuid(), value: ""}], // We will store the items as an array
  });

  const handleChange = (e, index) => {
    const { value } = e.target;
    
    // Update the specific item value at the given index
    setFormData((prevData) => {
      const updatedItems = [...prevData.items];
      updatedItems[index].value = value;
      return { ...prevData, items: updatedItems };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    passFormData(formData);
    setFormData({vanNo: "", vanId: uuid(), items:[{ itemId: uuid(), value: ""}]});
  };

  const handleAddInputs = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { itemId: uuid(), value: ""}] // Add a new empty item field
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Add Items</h1>
        <p>Select multiple items and proceed to your list.</p>
        <input
          type="text"
          placeholder="Van No."
          value={formData.vanNo}
          onChange={(e) => setFormData({ ...formData, vanNo: e.target.value })}
          name="vanNo"
          className="van-no-input"
        />
        <br />
        {formData.items.map((item, index) => (
          <div key={item.itemId}>
            <input
              type="text"
              placeholder="Item"
              value={item.value}
              onChange={(e) => handleChange(e, index)} // Handle change for each item
              name="items"
              className="item-input"
            />
          </div>
        ))}
        <br />
        <span onClick={handleAddInputs} className="add-new-icon">+</span>
        <br />
        <button className="add-to-list" type="submit">Add items</button>
      </form>
    </>
  );
}