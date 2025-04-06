import { query, pool } from "./db.js";
import xrplService from "../services/xrpl.service.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createTables() {
  const sqlFile = fs.readFileSync(
    path.join(__dirname, "../../../db/ecom_sc.sql"),
    "utf8"
  );
  const sqlCommands = sqlFile
    .split(";")
    .filter((cmd) => cmd.trim())
    .map((cmd) => cmd.trim() + ";");

  for (const cmd of sqlCommands) {
    if (!cmd.toLowerCase().includes("create database")) {
      await query(cmd, []);
    }
  }
}

const seed = async () => {
  try {
    console.log("Starting database seeding...");

    const users = [
      {
        email: "merchant@example.com",
        role: "merchant",
        wallet: await xrplService.createWallet(),
      },
      {
        email: "customer@example.com",
        role: "customer",
        wallet: await xrplService.createWallet(),
      },
    ];

    console.log("Dropping tables...");
    await query("DROP TABLE IF EXISTS users CASCADE", []);
    await query("DROP TABLE IF EXISTS products CASCADE", []);
    await query("DROP TABLE IF EXISTS orders CASCADE", []);

    console.log("Creating tables...");
    await createTables();

    console.log("Inserting users...");
    for (const user of users) {
      await query(
        "INSERT INTO users (email, role, wallet_public_key, wallet_private_key, wallet_classic_address, wallet_seed) VALUES ($1, $2, $3, $4, $5, $6)",
        [
          user.email,
          user.role,
          user.wallet.wallet.publicKey,
          user.wallet.wallet.privateKey,
          user.wallet.wallet.classicAddress,
          user.wallet.wallet.seed,
        ]
      );
    }

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  } finally {
    // Ferme la connexion à la base de données
    await pool.end();
    console.log("Database connection closed.");
  }
};

// Exécute le script et gère les erreurs
seed()
  .then(() => {
    console.log("Seed script finished.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed script failed:", error);
    process.exit(1);
  });
