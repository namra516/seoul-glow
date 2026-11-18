import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProductDetails({ updateCartCount, darkMode }) {
  const { id } = useParams();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setFeaturedProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    toast.success("Product added to cart!");
  };

  const product = featuredProducts.find((item) => String(item.id) === id);
  if (featuredProducts.length === 0) {
    return <p>Loading product...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }
  const similarProducts = featuredProducts.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );

  return (
    <div
      className={`mx-auto min-h-screen max-w-6xl px-6 py-16 ${
        darkMode ? "bg-stone-950 text-white" : "bg-white text-stone-800"
      }`}
    >
      {" "}
      <div className="grid gap-10 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl object-cover"
        />

        <div className="space-y-4">
          <p
            className={`text-sm uppercase ${
              darkMode ? "text-stone-400" : "text-stone-500"
            }`}
          >
            {product.brand}
          </p>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-amber-600">⭐ {product.rating}</p>

          <p className="text-2xl font-semibold">
            Rs. {product.price.toLocaleString("en-IN")}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className={`rounded-lg border px-4 py-2 ${
                darkMode
                  ? "border-stone-700 bg-stone-800 text-white"
                  : "border-stone-300 bg-white text-stone-800"
              }`}
            >
              -
            </button>

            <span className="font-semibold">{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className={`rounded-lg border px-4 py-2 ${
                darkMode
                  ? "border-stone-700 bg-stone-800 text-white"
                  : "border-stone-300 bg-white text-stone-800"
              }`}
            >
              +
            </button>
          </div>

          <p className="text-lg font-semibold">
            Total: Rs. {(product.price * quantity).toLocaleString("en-IN")}
          </p>

          <button
            onClick={addToCart}
            className="w-full rounded-full bg-rose-600 py-3 font-semibold text-white hover:bg-rose-700"
          >
            Add to Cart
          </button>
          <p
            className={`leading-relaxed ${
              darkMode ? "text-stone-300" : "text-stone-600"
            }`}
          >
            {product.description}
          </p>
        </div>
      </div>
      <section className="mt-20">
        <h2
          className={`mb-8 text-2xl font-bold ${
            darkMode ? "text-white" : "text-stone-800"
          }`}
        >
          Similar Items
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {similarProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => (window.location.href = `/product/${item.id}`)}
              className="cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-56 w-full rounded-xl object-cover"
              />
              <p
                className={`mt-3 text-sm ${
                  darkMode ? "text-stone-400" : "text-stone-500"
                }`}
              >
                {item.brand}
              </p>{" "}
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-1 font-semibold">
                Rs. {item.price.toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
