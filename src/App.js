import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // إضافة غرض جديد
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

  // حذف غرض واحد
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // حذف الكل
  const clearAll = () => {
    setItems([]);
  };

  // حساب عدد العناصر والمجموع الكلي
  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  // تلوين السعر
  const getPriceColor = (price) => {
    if (price < 20) return "text-green-600";
    if (price >= 10 && price <= 50) return "text-orange-500";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen flex flex-col items-center space-y-6 gap-6 p-6 bg-gradient-to-b from-purple-900 to-black text-white">
      
<h1 className="text-2xl md:text-4xl font-bold text-center">🛒Shopping List</h1>


      {/* النموذج */}
      <div className="flex flex-col md:flex-row gap-10 w-full  mb-6 space-x-3">
        <input
          type="text"
          placeholder="Name Item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded text-black"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 rounded text-black"
        />
        <button
          onClick={addItem}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-800"
        >
          Add➕
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-800"
        >
          Delete All🗑
        </button>
      </div>

      {/* الإحصائيات */}
      <div className="text-center mb-4 text-lg space-y-3">
        <p>totalItems: {totalItems}</p>
        <p>totalPrice: {totalPrice}$</p>
      </div>

      {/* القائمة */}
      <ul className="w-full max-w-md">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-3 mb-2 bg-white text-black rounded shadow"
          >
            <span>
              {item.name} -{" "}
              <span className={getPriceColor(item.price)}>{item.price}$</span>
            </span>
            <div className="flex gap-2">
              {/* زر تعديل (Bonus) */}
              <button
                onClick={() => {
                  const newName = prompt("تعديل الاسم:", item.name);
                  const newPrice = prompt("تعديل السعر:", item.price);
                  if (newName && newPrice) {
                    const updated = [...items];
                    updated[index] = {
                      name: newName,
                      price: parseFloat(newPrice),
                    };
                    setItems(updated);
                  }
                }}
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Edit✏️
              </button>

              {/* زر حذف */}
              <button
                onClick={() => removeItem(index)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
              >
                remove🗑
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;