import React, { useEffect, useState } from "react";
import "./home.css"

import { Link } from "@tanstack/react-router";

import HeroImg from "../../Assets/pngwing.com.png";

interface iProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  monthlyPrice: string;
  financingMonths: number;
  rating: number;
  reviews: number;
  stock: number;
  colors: string[];
  image: string;
}

// interface CartState {
//   cart: iProduct[];
// }

const HeadphoneStore = () => {
  const [cart, setCart] = useState<iProduct[]>([]);
  const [products, setProducts] = useState<iProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCart = (product: iProduct) => {
    setCart((prevCart) => {
      // Check if the product already exists in the cart
      const exists = prevCart.some((item) => item.id === product.id);
      // If it exists, return the current state; otherwise, add the new product
      if (exists) return prevCart;
      return [...prevCart, product];
    });
  };

  // console.log(products);

  return (
    <div className='shopcart-app'>
      {/* Header */}
      <header className='header'>
        <div className='top-bar'>
          <div className='contact'>
            <span className='phone'>📞 +00123456789</span>
          </div>
          <div className='promo'>
            Get 50% Off on Selected Items |{" "}
            <span className='shop-now-link'>Shop Now</span>
          </div>
          <div className='lang-location'>
            <span className='lang'>Eng ▼</span>
            <span className='location'>Location ▼</span>
          </div>
        </div>
        <div className='main-nav'>
          <div className='logo'>
            <span className='cart-icon'>🛒</span>
            <span className='brand-name'>Shopcart</span>
          </div>
          <nav className='nav-links'>
            <span className='nav-item'>Categories ▼</span>
            <span className='nav-item'>Deals</span>
            <span className='nav-item'>What's New</span>
            <span className='nav-item'>Delivery</span>
          </nav>
          <div className='search-bar'>
            <input type='text' placeholder='Search Product' />
            <button className='search-btn'>🔍</button>
          </div>
          <Link to='/cart' state={{ cart } as any}>
            <div className='user-actions'>
              <span className='account-btn'>👤 Account</span>
              <span className='cart-btn'>🛒 Cart ({cart.length})</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className='hero-banner'>
        <div className='hero-content'>
          <h1 className='hero-title'>
            Grab Upto 50% Off On Selected Headphone
          </h1>
          <button className='buy-now-btn'>Buy Now</button>
        </div>
        <div className='hero-image'>
          <img src={HeroImg} alt='HeroImg' className='HeroImg' />
        </div>
      </section>

      {/* Filters */}
      <section className='filters'>
        <div className='filter-item'>
          <span>Headphone Type ▼</span>
        </div>
        <div className='filter-item'>
          <span>Price ▼</span>
        </div>
        <div className='filter-item'>
          <span>Review ▼</span>
        </div>
        <div className='filter-item'>
          <span>Color ▼</span>
        </div>
        <div className='filter-item'>
          <span>Material ▼</span>
        </div>
        <div className='filter-item'>
          <span>Offer ▼</span>
        </div>
        <div className='filter-item all-filters'>
          <span>All Filters ≡</span>
        </div>
        <div className='sort-by'>
          <span>Sort by ▼</span>
        </div>
      </section>

      {/* Products Section */}
      <section className='products-section'>
        <h2 className='section-title'>Headphones For You!</h2>
        <div className='product-grid'>
          {products.map((product) => (
            <div key={product.id} className='product-card'>
              <div className='product-image'>
                <img src={product.image} alt={product.name} />
                <button className='wishlist-btn'>♡</button>
              </div>

              <div className='product-info'>
                <span className=''>
                  <h3 className='product-name'>{product.name}</h3>
                  <p className='product-description'>{product.description}</p>
                </span>
                <div className='product-rating title_price-span'>
                  <span className='product-price'>
                    ${product.price.toFixed(2)}
                  </span>
                  {"★".repeat(product.rating)}
                  {"☆".repeat(5 - product.rating)} ({product.reviews})
                </div>
                <div className='product-price-cart'>
                  <button
                    className='add-to-cart-btn'
                    onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer indicators */}
      {/* <div className='pagination-dots'>
        <span className='dot active'></span>
        <span className='dot'></span>
        <span className='dot'></span>
      </div> */}
    </div>
  );
};

export default HeadphoneStore;
