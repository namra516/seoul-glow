import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiMenu, FiArrowRight } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

const categories = [
  "All Products",
  "Cleansers",
  "Toners",
  "Serums",
  "Moisturizers",
  "Sunscreen",
  "Makeup",
];

function App() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cartCount, setCartCount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    return cart.reduce((total, item) => total + item.quantity, 0);
  });

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => setFeaturedProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  };

  const products = featuredProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Products" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase());

    const matchesBrand =
      selectedBrand === "All Brands" || product.brand === selectedBrand;

    const matchesMinPrice =
      minPrice === "" || product.price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" || product.price <= Number(maxPrice);

    return (
      matchesCategory &&
      matchesSearch &&
      matchesBrand &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "lowToHigh") return a.price - b.price;

    if (sortOption === "highToLow") return b.price - a.price;

    if (sortOption === "popularity") return b.rating - a.rating;

    return 0;
  });

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />

      <Routes>
        <Route
          path="/"
          element={
            <div
              className={`min-h-screen ${
                darkMode ? "bg-stone-950 text-white" : "bg-white text-stone-800"
              }`}
            >
              {/* Announcement bar */}
              <div className="bg-rose-100 px-4 py-2 text-center text-xs font-medium text-rose-900 sm:text-sm">
                A little Korean glow, delivered to your door ✨
              </div>

              {/* Navbar */}
              <header
                className={`sticky top-0 z-50 border-b ${
                  darkMode
                    ? "border-stone-800 bg-stone-900"
                    : "border-stone-100 bg-white"
                }`}
              >
                <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                  <a
                    href="#"
                    className={`text-xl font-bold tracking-widest sm:text-2xl ${
                      darkMode ? "text-rose-400" : "text-rose-700"
                    }`}
                  >
                    SEOUL GLOW<span className="text-rose-400">.</span>
                  </a>

                  <div
                    className={`hidden items-center gap-7 text-sm font-medium md:flex ${
                      darkMode ? "text-white" : "text-stone-800"
                    }`}
                  >
                    <a href="#" className="hover:text-rose-600">
                      Home
                    </a>
                    <a href="#products" className="hover:text-rose-600">
                      Shop
                    </a>
                    <a href="#categories" className="hover:text-rose-600">
                      Categories
                    </a>
                    <a href="#about" className="hover:text-rose-600">
                      About
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <label
                      className={`hidden items-center gap-2 rounded-full px-3 py-2 sm:flex ${
                        darkMode
                          ? "bg-stone-800 text-white"
                          : "bg-stone-100 text-stone-800"
                      }`}
                    >
                      <FiSearch />
                      <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search beauty..."
                        className="w-32 bg-transparent text-sm outline-none lg:w-40"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setDarkMode(!darkMode)}
                      className="rounded-full p-2 hover:bg-rose-50"
                    >
                      {darkMode ? "☀️" : "🌙"}
                    </button>

                    <button
                      type="button"
                      aria-label="Shopping cart"
                      className="rounded-full p-2 hover:bg-rose-50"
                      onClick={() => navigate("/cart")}
                    >
                      <span className="relative">
                        <FiShoppingBag />

                        {cartCount > 0 && (
                          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-xs font-bold text-white">
                            {cartCount}
                          </span>
                        )}
                      </span>
                    </button>

                    <button
                      type="button"
                      aria-label="Toggle navigation menu"
                      className="rounded-full p-2 hover:bg-rose-50 md:hidden"
                      onClick={() => setMenuOpen(!menuOpen)}
                    >
                      <FiMenu size={22} />
                    </button>
                  </div>
                </nav>

                {menuOpen && (
                  <div className="space-y-3 border-t border-stone-100 bg-white px-6 py-4 md:hidden">
                    <a
                      href="#"
                      onClick={() => setMenuOpen(false)}
                      className="block"
                    >
                      Home
                    </a>
                    <a
                      href="#products"
                      onClick={() => setMenuOpen(false)}
                      className="block"
                    >
                      Shop
                    </a>
                    <a
                      href="#categories"
                      onClick={() => setMenuOpen(false)}
                      className="block"
                    >
                      Categories
                    </a>
                    <a
                      href="#about"
                      onClick={() => setMenuOpen(false)}
                      className="block"
                    >
                      About
                    </a>
                    <input
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search beauty..."
                      className="w-full rounded-lg border border-stone-200 px-3 py-2 outline-rose-400"
                    />
                  </div>
                )}
              </header>

              <main>
                {/* Hero section */}
                <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:px-8 lg:py-20">
                  <div className="space-y-6">
                    <p className="text-sm font-semibold uppercase tracking-widest text-rose-600">
                      Your K-beauty destination
                    </p>

                    <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                      Your skin,
                      <br />
                      your glow,
                      <br />
                      <span className="text-rose-600">your Seoul story.</span>
                    </h1>

                    <p className="max-w-lg leading-7 text-stone-600">
                      Discover the beauty of Korean skincare with gentle
                      essentials, glowing serums, and everyday favorites for
                      your skincare journey.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="#products"
                        className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 font-medium text-white transition hover:bg-rose-700"
                      >
                        Shop collection <FiArrowRight />
                      </a>

                      <a
                        href="#categories"
                        className="rounded-full border border-stone-300 px-6 py-3 font-medium transition hover:bg-rose-50"
                      >
                        Explore categories
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-6 pt-3 text-sm text-stone-600">
                      <span>♡ Skin-loving essentials</span>
                      <span>✧ Your daily glow ritual</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -inset-3 rounded-[2rem] bg-rose-100"></div>

                    <img
                      src="https://cdn.shopify.com/s/files/1/0567/0299/2418/files/korean-skincare-routine-for-sun-damage-and-protection-normal-skin.jpg?v=1772257780"
                      alt="Skincare products for a glowing beauty routine"
                      className="relative h-80 w-full rounded-[1.5rem] object-cover sm:h-96 lg:h-[480px]"
                    />

                    <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 p-4 shadow-lg">
                      <p className="text-xs text-stone-500">
                        YOUR SKINCARE RITUAL
                      </p>
                      <p className="mt-1 font-semibold">Glow starts here ♡</p>
                    </div>
                  </div>
                </section>

                {/* Categories */}
                <section
                  id="categories"
                  className={`py-16 ${
                    darkMode ? "bg-stone-900" : "bg-rose-50"
                  }`}
                >
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-7 text-center">
                      <p className="text-sm font-medium uppercase tracking-widest text-rose-600">
                        Find your favorites
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                        Shop by category
                      </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                      {categories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(category);
                            document
                              .getElementById("products")
                              ?.scrollIntoView({
                                behavior: "smooth",
                              });
                          }}
                          className={`rounded-full border px-5 py-3 text-sm font-medium transition ${
                            selectedCategory === category
                              ? "border-rose-600 bg-rose-600 text-white"
                              : "border-rose-200 bg-white text-stone-700 hover:border-rose-500"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Featured products */}
                <section
                  id="products"
                  className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
                >
                  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-widest text-rose-600">
                        A little self-care
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                        Your glow essentials
                      </h2>
                      <p className="mt-2 text-sm text-stone-500">
                        Korean beauty favorites to add to your routine.
                      </p>
                    </div>

                    <span className="text-sm text-stone-500">
                      {products.length} products
                    </span>
                  </div>

                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <h3
                      className={`text-lg font-semibold ${
                        darkMode ? "text-white" : "text-stone-800"
                      }`}
                    >
                      Filter by Brand
                    </h3>

                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className={`rounded-full border px-4 py-2 text-sm outline-none ${
                        darkMode
                          ? "border-stone-700 bg-stone-800 text-white"
                          : "border-rose-200 bg-white text-stone-800"
                      }`}
                    >
                      <option value="All Brands">All Brands</option>
                      <option value="COSRX">COSRX</option>
                      <option value="Beauty of Joseon">Beauty of Joseon</option>
                      <option value="SKIN1004">SKIN1004</option>
                      <option value="ANUA">ANUA</option>
                      <option value="Dr.Althea">Dr.Althea</option>
                      <option value="AXIS-Y">AXIS-Y</option>
                      <option value="I'm From">I'm From</option>
                      <option value="PURITO SEOUL">PURITO SEOUL</option>
                      <option value="Celimax">Celimax</option>
                    </select>

                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="number"
                        placeholder="Min price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className={`w-32 rounded-full border px-4 py-2 text-sm outline-none ${
                          darkMode
                            ? "border-stone-700 bg-stone-800 text-white placeholder:text-stone-400"
                            : "border-rose-200 bg-white text-stone-800"
                        }`}
                      />

                      <input
                        type="number"
                        placeholder="Max price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className={`w-32 rounded-full border px-4 py-2 text-sm outline-none ${
                          darkMode
                            ? "border-stone-700 bg-stone-800 text-white placeholder:text-stone-400"
                            : "border-rose-200 bg-white text-stone-800"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex justify-end">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className={`rounded-full border px-4 py-2 text-sm outline-none ${
                        darkMode
                          ? "border-stone-700 bg-stone-800 text-white"
                          : "border-rose-200 bg-white text-stone-800"
                      }`}
                    >
                      <option value="default">Sort products</option>
                      <option value="lowToHigh">Price: Low to High</option>
                      <option value="highToLow">Price: High to Low</option>
                      <option value="popularity">
                        Popularity: Highest Rated
                      </option>
                    </select>
                  </div>

                  {products.length === 0 ? (
                    <p className="rounded-xl bg-rose-50 p-8 text-center text-stone-600">
                      No products found. Try another search or category.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {sortedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          updateCartCount={updateCartCount}
                          darkMode={darkMode}
                        />
                      ))}
                    </div>
                  )}
                </section>

                {/* About section */}
                <section
                  id="about"
                  className={`py-16 text-center ${
                    darkMode ? "bg-stone-900" : "bg-stone-50"
                  }`}
                >
                  <p className="text-sm font-semibold uppercase tracking-widest text-rose-600">
                    Annyeong, beauty lover ♡
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                    A little love for your skin
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl leading-7 text-stone-600">
                    Explore Korean beauty essentials and create a skincare
                    routine that feels like self-care, every single day.
                  </p>
                </section>
              </main>

              {/* Footer */}
              <footer className="bg-stone-900 px-4 py-8 text-center text-sm text-white sm:px-6">
                <p className="font-semibold tracking-widest">SEOUL GLOW</p>
                <p className="mt-2 text-stone-400">
                  Your Korean beauty journey starts here.
                </p>
                <p className="mt-4 text-stone-500">
                  © {new Date().getFullYear()} SEOUL GLOW.
                </p>
              </footer>
            </div>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              updateCartCount={updateCartCount}
              darkMode={darkMode}
            />
          }
        />
        <Route path="/cart" element={<Cart darkMode={darkMode} />} />{" "}
        <Route
          path="/checkout"
          element={<Checkout darkMode={darkMode} />}
        />{" "}
      </Routes>
    </>
  );
}

export default App;
