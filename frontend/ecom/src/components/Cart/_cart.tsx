import React, { useState, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { Client, xrpToDrops, dropsToXrp } from "xrpl";

import "./_checkout.css";

interface CartState {
  cart: any[]; // Change any[] to iProduct[] if you have that type
}

interface CrossmarkWallet {
  getPublicKey: (options: { network: string }) => Promise<{ address: string }>;
  signAndSubmit: (
    txJson: unknown,
    options: { network: string }
  ) => Promise<any>;
  methods: {
    signInAndWait: () => Promise<void>;
  };
  session: {
    address: string;
  };
}

declare global {
  interface Window {
    crossmark?: CrossmarkWallet;
  }
}

const CheckoutPage: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@gmail.com");
  const [name, setName] = useState("Wade Warren");
  const [address, setAddress] = useState(
    "4140 Parker Rd, Allentown, New Mexico 31134"
  );
  const [city, setCity] = useState("Austin");
  const [zipCode, setZipCode] = useState("85486");
  const [mobile, setMobile] = useState("+447700960054");

  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [wallet, setWallet] = useState<any>();
  const [client] = useState(new Client("wss://s.altnet.rippletest.net:51233"));

  // Local state for card payment fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  let [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const state = location.state as unknown as CartState | null;
  const cart = state?.cart ?? [];

  const calculateCartTotal = (cart: { price: number }[]): number => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const calculateFee = (cart: { price: number }[]): number => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    return total * 0.02;
  };

  async function connectCrossmark() {
    if (!window.crossmark || !window.crossmark.methods) {
      throw new Error("Crossmark wallet is not installed or not ready.");
    }

    try {
      // Sign in
      await window.crossmark.methods.signInAndWait();

      // Get connected wallet address
      const address = window.crossmark.session.address;
      console.log("Connected wallet address:", address);

      setUserAddress(address);
      return address;
    } catch (err) {
      console.error("Wallet connection error:", err);
      throw err;
    }
  }

  const convertCartTotalToXrp = (
    cartTotal: number,
    coinPrice: number = 2.1
  ): number => {
    return cartTotal / coinPrice;
  };

  // Usage example:
  const cartTotalUsd = calculateCartTotal(cart) + calculateFee(cart);
  const xrpAmount = convertCartTotalToXrp(cartTotalUsd) / 10;

  useEffect(() => {
    console.log("start connection");
    client?.connect().then(() => {
      client.fundWallet().then((fund_result: any) => {
        setWallet(fund_result.wallet);
      });
    });
  }, []);

  async function _sendPayments() {
    setIsLoading(true);
    console.log("Creating a payment transaction");
    const tx = {
      TransactionType: "Payment",
      Account: wallet.address,
      Amount: xrpToDrops(xrpAmount.toFixed(2)),
      Destination: "rQnQeT5SLgf3FzVCmdYZrzpJHL8sCUd6wr",
    };

    // Submit the transaction
    console.log("Submitting the transaction (Takes 3-5 seconds)");
    const submitted_tx = await client.submitAndWait(tx, {
      autofill: true,
      wallet: wallet,
    });

    // Check transaction results
    console.log("Transaction result:", submitted_tx.result);

    // Look up the new account balances
    const account_info = await client.request({
      command: "account_info",
      account: wallet.address,
    });

    const balance = account_info.result.account_data.Balance;
    console.log(`New account balance: ${balance} drops`);
    setIsLoading(false);
    alert("The payment went through, thanks for shopping with us :)");
    setPaymentStatus("done");
  }

  const handleCardPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, description, price } = cart[0];
    console.log(name, description, price);
    try {
      const response = await fetch("http://localhost:8080/on-ramp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {paymentStatus === "done" ? (
        <p className="_done">{paymentStatus} ✅</p>
      ) : (
        <div className="checkout-container">
          <div className="checkout-wrapper">
            <div className="left-section">
              <div className="review-item">
                <h2 className="_review_text">Review Item And Shipping</h2>
                <div className="item-details">
                  {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
                    cart.map((item: any) => (
                      <div key={item.id} className="_item_div">
                        <div className="_img_div">
                          <img
                            src={item.image}
                            alt="product-img"
                            className="item-image"
                          />
                        </div>
                        <span className="_item_info_span">
                          <h3 className="_item_name">{item.name}</h3>
                          <p className="_item_price">${item.price}</p>
                          <p>Quantity: 01</p>
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Delivery Information */}
              <div className="delivery-info">
                <h2 className="delivery_info">Delivery Information</h2>
                <label>
                  <strong>Name:</strong>{" "}
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                  />
                </label>
                <label>
                  <strong>Address:</strong>{" "}
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-field"
                  />
                </label>
                <label>
                  <strong>City:</strong>{" "}
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-field"
                  />
                </label>
                <label>
                  <strong>Zip Code:</strong>{" "}
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="input-field"
                  />
                </label>
                <label>
                  <strong>Mobile:</strong>{" "}
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="input-field"
                  />
                </label>

                <button className="edit-btn">Edit Information</button>
              </div>
            </div>

            {/* Right Section: Order Summary */}
            <div className="right-section">
              {/* Payment Details */}
              <div className="checkout-container">
                <div className="order-summary">
                  <h2 className="company-name">
                    <span className="company-logo">K</span>
                    Kaja payment
                  </h2>
                </div>
                <div>
                  <h3 className="section-title">
                    <span className="section-number">1</span>
                    Personal information
                  </h3>
                  <div className="info-box">
                    <label>
                      <strong>Full name:</strong>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </label>
                    <label>
                      <strong>Email address:</strong>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="section-title">
                    <span className="section-number">2</span>
                    Payment method
                  </h3>
                  <div className="payment-section">
                    <div className="payment-options">
                      {[
                        {
                          id: "card",
                          label: "Card payment",
                          icons: ["💳", "💳", "💳"],
                        },
                        {
                          id: "wallet",
                          label: "Wallet payment",
                          icons: ["🦊", "🌈", "🌊"],
                        },
                        {
                          id: "qr",
                          label: "Scan QR",
                          icons: ["🟣", "⬛", "🟡"],
                        },
                      ].map((method) => (
                        <React.Fragment key={method.id}>
                          <div
                            className={`payment-method ${
                              selectedPayment === method.id ? "selected" : ""
                            }`}
                            onClick={() => setSelectedPayment(method.id)}
                          >
                            <input
                              type="radio"
                              name="payment"
                              checked={selectedPayment === method.id}
                              readOnly
                            />
                            <span className="payment-label">
                              {method.label}
                            </span>
                            <span className="payment-icons">
                              {method.icons.map((icon, index) => (
                                <span key={index}>{icon}</span>
                              ))}
                            </span>
                          </div>

                          {method.id === "card" &&
                            selectedPayment === "card" && (
                              <form onSubmit={handleCardPayment}>
                                <div className="card-payment-form">
                                  <h3 className="card-form-title">
                                    Enter Card Details
                                  </h3>
                                  <div className="card-input-group">
                                    <label className="card-label">
                                      Card Number:
                                    </label>
                                    <input
                                      type="text"
                                      className="card-input"
                                      value={cardNumber}
                                      onChange={(e) =>
                                        setCardNumber(e.target.value)
                                      }
                                      placeholder="1234 5678 9012 3456"
                                    />
                                  </div>
                                  <div className="card-input-group">
                                    <label className="card-label">
                                      Expiry Date:
                                    </label>
                                    <input
                                      type="text"
                                      className="card-input"
                                      value={expiry}
                                      onChange={(e) =>
                                        setExpiry(e.target.value)
                                      }
                                      placeholder="MM/YY"
                                    />
                                  </div>
                                  <div className="card-input-group">
                                    <label className="card-label">CVV:</label>
                                    <input
                                      type="text"
                                      className="card-input"
                                      value={cvv}
                                      onChange={(e) => setCvv(e.target.value)}
                                      placeholder="123"
                                    />
                                  </div>
                                  <div className="card-input-group">
                                    <label className="card-label">
                                      Card Holder Name:
                                    </label>
                                    <input
                                      type="text"
                                      className="card-input"
                                      value={cardHolder}
                                      onChange={(e) =>
                                        setCardHolder(e.target.value)
                                      }
                                      placeholder="John Doe"
                                    />
                                  </div>
                                  <button className="card-submit-btn">
                                    Submit Payment
                                  </button>
                                </div>
                              </form>
                            )}
                        </React.Fragment>
                      ))}
                    </div>

                    {selectedPayment === "wallet" &&
                      (!userAddress ? (
                        <button
                          onClick={connectCrossmark}
                          className="_connect_btn"
                        >
                          Connect Wallet
                        </button>
                      ) : (
                        <div className="_sub_div">
                          <span className="checkout_prices_span">
                            <p>Subtotal ${calculateCartTotal(cart)}</p>
                            <p>Shipping: Free</p>
                            <p>Fee: ${calculateFee(cart)}</p>
                            <p className="_total">
                              Total: $
                              {calculateCartTotal(cart) + calculateFee(cart)}
                            </p>
                          </span>
                          <p>Connected Wallet: {userAddress}</p>
                          <button
                            onClick={_sendPayments}
                            className="_checkout_btn"
                          >
                            Checkout
                          </button>
                          {paymentStatus && <p>{paymentStatus}</p>}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
