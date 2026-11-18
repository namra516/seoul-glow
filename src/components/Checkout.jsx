import { useState } from "react";
import { toast } from "react-toastify";

function Checkout({ darkMode }) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <div
      className={`min-h-screen px-6 py-12 ${
        darkMode ? "bg-stone-950 text-white" : "bg-white text-stone-800"
      }`}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div
          className={`mb-8 rounded-xl border p-5 ${
            darkMode
              ? "border-stone-700 bg-stone-900"
              : "border-stone-200 bg-white"
          }`}
        >
          {" "}
          <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="mb-3 flex justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                Rs. {(item.price * item.quantity).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
          <div
            className={`mt-4 border-t pt-4 text-right ${
              darkMode ? "border-stone-700" : "border-stone-200"
            }`}
          >
            {" "}
            <p className="text-xl font-bold">
              Total: Rs. {total.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (cart.length === 0) {
              alert("Your cart is empty!");
              window.location.href = "/cart";
              return;
            }

            localStorage.removeItem("cart");
            toast.success("Order placed successfully!");
            setTimeout(() => {
              window.location.href = "/";
            }, 2500);
          }}
          className="space-y-5"
        >
          <div>
            <label>Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className={`mt-2 w-full rounded-lg border p-3 outline-none ${
                darkMode
                  ? "border-stone-700 bg-stone-800 text-white placeholder:text-stone-400"
                  : "border-stone-300 bg-white text-stone-800"
              }`}
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className={`mt-2 w-full rounded-lg border p-3 outline-none ${
                darkMode
                  ? "border-stone-700 bg-stone-800 text-white placeholder:text-stone-400"
                  : "border-stone-300 bg-white text-stone-800"
              }`}
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
              required
            />
          </div>

          <div>
            <label>Delivery Address</label>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              className={`mt-2 w-full rounded-lg border p-3 outline-none ${
                darkMode
                  ? "border-stone-700 bg-stone-800 text-white placeholder:text-stone-400"
                  : "border-stone-300 bg-white text-stone-800"
              }`}
              rows="4"
            />
          </div>
          <div>
            <label>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              className={`mt-2 w-full rounded-lg border p-3 outline-none ${
                darkMode
                  ? "border-stone-700 bg-stone-800 text-white"
                  : "border-stone-300 bg-white text-stone-800"
              }`}
            >
              <option value="">Select Payment Method</option>
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit / Debit Card (Dummy)</option>
            </select>
          </div>

          {paymentMethod === "card" && (
            <>
              <div>
                <label>Card Number (Dummy)</label>
                <input
                  required
                  pattern="[0-9 ]{16,19}"
                  title="Enter a valid dummy card number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className={`mt-2 w-full rounded-lg border p-3 outline-none ${
                    darkMode
                      ? "border-stone-700 bg-stone-800 text-white placeholder:text-stone-400"
                      : "border-stone-300 bg-white text-stone-800"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Expiry Date</label>
                  <input
                    required
                    pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                    title="Use MM/YY format"
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    className={`mt-2 w-full rounded-lg border p-3 outline-none ${
                      darkMode
                        ? "border-stone-700 bg-stone-800 text-white placeholder:text-stone-400"
                        : "border-stone-300 bg-white text-stone-800"
                    }`}
                  />
                </div>

                <div>
                  <label>CVV</label>
                  <input
                    required
                    pattern="[0-9]{3}"
                    title="Enter a valid 3-digit CVV"
                    type="password"
                    placeholder="123"
                    maxLength="3"
                    className={`mt-2 w-full rounded-lg border p-3 outline-none ${
                      darkMode
                        ? "border-stone-700 bg-stone-800 text-white placeholder:text-stone-400"
                        : "border-stone-300 bg-white text-stone-800"
                    }`}
                  />
                </div>
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-rose-600 py-3 font-semibold text-white hover:bg-rose-700"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
