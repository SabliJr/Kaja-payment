CREATE DATABASE ecom_data;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(20) CHECK (role IN ('merchant', 'customer')),
    wallet_public_key VARCHAR(100) UNIQUE NOT NULL,  -- Merchant's XRP wallet
    wallet_private_key VARCHAR(255) NOT NULL,  -- Merchant's private key
    wallet_classic_address VARCHAR(100) UNIQUE NOT NULL,  -- Merchant's XRPL address
    wallet_seed VARCHAR(255) NOT NULL,  -- Merchant's XRPL seed
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    merchant_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,  -- Always stored in USD equivalent
    image_url TEXT,
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    buyer_wallet VARCHAR(100) NOT NULL,  -- Could be EVM, Solana, XRPL, etc.
    network VARCHAR(50) NOT NULL,  -- The source chain (Ethereum, Solana, XRPL, etc.)
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    amount_paid DECIMAL(10,2) NOT NULL,  -- The amount in stablecoins
    token VARCHAR(10) NOT NULL,  -- Example: "USDC", "USDT"
    issuer VARCHAR(100) NOT NULL,  -- The XRPL issuer of the stablecoin
    tx_hash VARCHAR(100) NOT NULL,  -- Transaction hash from any chain
    settlement_tx VARCHAR(100),  -- XRPL transaction hash once bridged
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- CREATE TABLE cross_bridge_transactions (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     eth_tx_hash VARCHAR(66) NOT NULL,
--     merchant_id UUID NOT NULL REFERENCES users(id),
--     usdt_amount DECIMAL NOT NULL,
--     xrp_amount DECIMAL,
--     status VARCHAR(20) CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
--     cex_transaction_id VARCHAR(255),
--     xrp_transaction_hash VARCHAR(255),
--     created_at TIMESTAMP DEFAULT NOW(),
--     completed_at TIMESTAMP,
--     CONSTRAINT unique_eth_tx UNIQUE (eth_tx_hash)
-- ); 