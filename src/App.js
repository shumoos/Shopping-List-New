import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // إضافة عنصر
  const addItem = () => {
    if (!name || !price) {
      alert("Please enter an item name and price");
      return;
    }

    // منع التكرار
    if (items.some((item) => item.name === name)) {
      alert("The item already exists!");
      return;
    }

    setItems([...items, { name, price: parseFloat(price) }]);
    setName("");
    setPrice("");
  };

  // حذف عنصر
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // حذف الكل
  const clearAll = () => {
    setItems([]);
  };

  // المجموع
  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-black p-6">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md text-center text-white">
        <h1 className="text-2xl font-bold mb-6">🛒 Shopping List</h1>

        {/* الفورم */}
        <div className="flex flex-col space-y-4 w-full">
          <input
            type="text"
            placeholder="Name Item"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg w-full text-black"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-3 rounded-lg w-full text-black"
          />

          <button
            onClick={addItem}
            className="bg-green-600 text-white py-3 rounded-lg w-full hover:bg-green-700 transition"
          >
            Add ➕
          </button>

          <button
            onClick={clearAll}
            className="bg-red-600 text-white py-3 rounded-lg w-full hover:bg-red-700 transition"
          >
            Delete All 🗑
          </button>
        </div>

        {/* كاردات الإحصائيات */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white/20 p-4 rounded-xl shadow text-white">
            <h2 className="text-lg font-semibold">Total Items</h2>
            <p className="text-2xl">{totalItems}</p>
          </div>

          <div className="bg-white/20 p-4 rounded-xl shadow text-white">
            <h2 className="text-lg font-semibold">Total Price</h2>
            <p className="text-2xl">{totalPrice}$</p>
          </div>
        </div>

        {/* الكاردات للعناصر */}
        <div className="mt-6 space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white/20 p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm">{item.price}$</p>
              </div>

              <div className="flex gap-2">
                {/* زر Edit */}
                <button
                  onClick={() => {
                    const newName = prompt("Edit name:", item.name);
                    const newPrice = prompt("Edit price:", item.price);
                    if (newName && newPrice) {
                      const updated = [...items];
                      updated[index] = {
                        name: newName,
                        price: parseFloat(newPrice),
                      };
                      setItems(updated);
                    }
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-sm"
                >
                  ✏️ Edit
                </button>

                {/* زر Delete */}
                <button
                  onClick={() => removeItem(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-sm"
                >
                  🗑️Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
