import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ darkMode }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || [],
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const updateQuantity = (id, change) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item,
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div
      className={`min-h-screen w-full px-6 py-12 ${
        darkMode ? "bg-stone-950 text-white" : "bg-white text-stone-800"
      }`}
    >
      <div className="mx-auto max-w-5xl">
        {" "}
        <h1 className="mb-8 text-3xl font-bold">My Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="py-10 text-center">
            <p
              className={`mb-5 text-lg ${darkMode ? "text-stone-400" : "text-stone-500"}`}
            >
              Your cart is empty.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="rounded-full bg-rose-600 px-8 py-3 font-semibold text-white hover:bg-rose-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-5 rounded-xl border p-4 ${
                  darkMode
                    ? "border-stone-700 bg-stone-900"
                    : "border-stone-200 bg-white"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />

                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className={darkMode ? "text-stone-400" : "text-stone-500"}>
                    {item.brand}
                  </p>{" "}
                  <p>Rs. {item.price.toLocaleString("en-IN")}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className={`rounded border px-3 py-1 ${
                        darkMode
                          ? "border-stone-600 bg-stone-800 text-white"
                          : "border-stone-300 bg-white text-stone-800"
                      }`}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className={`rounded border px-3 py-1 ${
                        darkMode
                          ? "border-stone-600 bg-stone-800 text-white"
                          : "border-stone-300 bg-white text-stone-800"
                      }`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-3 text-sm font-medium text-rose-600 hover:text-rose-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div
            className={`mt-8 border-t pt-6 text-right ${
              darkMode ? "border-stone-700" : "border-stone-200"
            }`}
          >
            {" "}
            <p className="text-xl font-bold">
              Subtotal: Rs. {subtotal.toLocaleString("en-IN")}
            </p>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-5 rounded-full bg-rose-600 px-8 py-3 font-semibold text-white hover:bg-rose-700"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      /
    </div>
  );
}

export default Cart;
