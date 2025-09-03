{/* Items List */}
<div className="mt-6 space-y-3">
  {items.map((item, index) => (
    <div
      key={index}
      className="bg-white/20 p-4 rounded-xl shadow flex justify-between items-center text-white"
    >
      {/* الاسم والسعر */}
      <div>
        <h2 className="font-semibold">{item.name}</h2>
        <p className="text-sm">{item.price}$</p>
      </div>

      {/* الأزرار */}
      <div className="flex gap-2">
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
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => removeItem(index)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
        >
         🗑️  Delete
        </button>
      </div>
    </div>
  ))}
</div>
