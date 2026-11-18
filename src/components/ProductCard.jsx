import { FiHeart, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductCard({ product, updateCartCount, darkMode }) {
  const navigate = useNavigate();
  return (
    <article className={`group ${darkMode ? "text-white" : "text-stone-800"}`}>
      <div
        className={`relative overflow-hidden rounded-2xl ${
          darkMode ? "bg-stone-800" : "bg-rose-50"
        }`}
      >
        {" "}
        <img
          onClick={() => navigate(`/product/${product.id}`)}
          src={product.image}
          alt={product.name}
          className="h-64 w-full cursor-pointer object-cover transition duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            darkMode ? "bg-stone-900 text-rose-300" : "bg-white text-rose-700"
          }`}
        >
          {" "}
          {product.label}
        </span>
        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className={`absolute right-3 top-3 rounded-full p-2 hover:text-rose-600 ${
            darkMode ? "bg-stone-900 text-white" : "bg-white text-stone-800"
          }`}
          onClick={() => alert("Wishlist feature coming soon!")}
        >
          <FiHeart />
        </button>
      </div>

      <div className="space-y-2 pt-4">
        <p
          className={`text-xs uppercase tracking-wide ${
            darkMode ? "text-stone-400" : "text-stone-500"
          }`}
        >
          {" "}
          {product.brand}
        </p>

        <h3
          onClick={() => navigate(`/product/${product.id}`)}
          className="cursor-pointer font-semibold hover:text-rose-600"
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-amber-600">
          <FiStar className="fill-current" />
          <span>{product.rating}</span>
        </div>

        <p className="font-semibold">
          Rs. {product.price.toLocaleString("en-IN")}
        </p>

        <button
          type="button"
          className="w-full rounded-full border border-rose-300 py-2.5 text-sm font-medium text-rose-700 transition hover:bg-rose-600 hover:text-white"
          onClick={() => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingProduct = cart.find((item) => item.id === product.id);

            if (existingProduct) {
              existingProduct.quantity += 1;
            } else {
              cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();

            toast.success("Product added to cart!");
          }}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
