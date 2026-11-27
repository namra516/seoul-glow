import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://seoul-glow-1.onrender.com";

function AdminDashboard() {
  const { user, logout } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    rating: "",
    category: "",
    image: "",
    label: "",
  });

  // Handle form inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditId(product.id);

    setForm({
      name: product.name,
      description: product.description,
      brand: product.brand,
      price: product.price,
      rating: product.rating,
      category: product.category,
      image: product.image,
      label: product.label || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add product

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        editId
          ? `${API_URL}/api/products/${editId}`
          : `${API_URL}/api/products`,
        {
          method: editId ? "PUT" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
            rating: Number(form.rating) || 0,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save product");
      }

      alert(
        editId
          ? "Product updated successfully!"
          : "Product added successfully!",
      );

      setEditId(null);

      setForm({
        name: "",
        description: "",
        brand: "",
        price: "",
        rating: "",
        category: "",
        image: "",
        label: "",
      });

      fetchProducts();
    } catch (error) {
      alert(error.message);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold text-stone-800">Admin Dashboard</h1>

        <p className="text-stone-600 mt-3">Welcome, {user.name}!</p>

        <p className="mt-2 text-pink-600 font-semibold">Role: {user.role}</p>

        <button
          onClick={logout}
          className="mt-6 bg-stone-900 text-white px-6 py-3 rounded-lg"
        >
          Logout
        </button>

        <hr className="my-8" />

        {/* Add Product Form */}
        <h2 className="text-2xl font-bold text-stone-800 mb-5">
          Add New Product
        </h2>

        <form
          onSubmit={handleAddProduct}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating (0–5)"
            className="border p-3 rounded-lg"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category (e.g. Serums)"
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="label"
            value={form.label}
            onChange={handleChange}
            placeholder="Label (optional)"
            className="border p-3 rounded-lg"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Product Description"
            required
            className="border p-3 rounded-lg md:col-span-2"
          />

          <button
            type="submit"
            className="bg-pink-600 text-white p-3 rounded-lg font-semibold md:col-span-2"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* Product List */}
        <h2 className="text-2xl font-bold text-stone-800 mb-5">
          Manage Products ({products.length})
        </h2>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 border rounded-xl p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-stone-800">
                    {product.name}
                  </h3>

                  <p className="text-stone-500">
                    {product.brand} · Rs. {product.price}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
