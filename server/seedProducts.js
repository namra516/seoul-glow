
import mongoose from "mongoose";
import dotenv from "dotenv";
import { readFileSync } from "node:fs";
import Product from "./Product.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const data = JSON.parse(
      readFileSync(new URL("../db.json", import.meta.url), "utf8")
    );

    for (const product of data.products) {
      await Product.updateOne(
        { id: product.id },
        { $set: product },
        { upsert: true }
      );
    }

    console.log("All 20 products transferred successfully!");

    await mongoose.disconnect();
  } catch (error) {
    console.error("SEED ERROR:", error);
    await mongoose.disconnect();
    process.exitCode = 1;
  }
};

seedProducts();
