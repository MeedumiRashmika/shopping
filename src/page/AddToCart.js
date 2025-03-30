// ShoppingCart.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const initialCartItems = [
  {
    id: 1,
    name: 'Digestives',
    color: 'Grey',
    price: 120,
    quantity: 4,
    image: '/images/biscuts.png',
  },
  {
    id: 2,
    name: 'Lays Classic',
    color: 'Yellow',
    price: 320,
    quantity: 2,
    image: '/images/Chips.jpg',
  },
  {
    id: 3,
    name: 'Coca-Cola',
    color: 'Red',
    price: 200,
    quantity: 1,
    image: '/images/cocacola.png',
  },
  {
    id: 4,
    name: 'KitKat',
    color: 'Brown',
    price: 320,
    quantity: 2,
    image: '/images/Kitkat.png',
  },
  {
    id: 5,
    name: 'Nutella',
    color: 'Brown',
    price: 500,
    quantity: 2,
    image: '/images/nutella.png',
  },
  {
    id: 6,
    name: 'Strawberry',
    color: 'Brown',
    price: 500,
    quantity: 2,
    image: '/images/Strawberry.jpg',
  },
];

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const updateQuantity = (id, type) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === 'increase'
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  const removeItem = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const filteredCartItems = cartItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const subtotal = filteredCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = filteredCartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal - discount;

  const handleCheckout = () => {
    localStorage.setItem('cartTotal', JSON.stringify({ total, totalItems }));
    navigate('/payment');
  };

  const bannerImages = [
    '/images/b3.jpg',
    '/images/b2.png',
    '/images/br1.png',
    '/images/b4.jpg',
    '/images/b5.jpg',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h2 className="mb-2 text-3xl font-semibold text-center">Shopping Cart</h2>
      <p className="mb-6 text-center text-gray-500">Home / Shopping Cart</p>

      {/* 🎯 Rotating Banner */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-4xl overflow-hidden shadow rounded-xl">
          <Slider {...settings}>
            {bannerImages.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Banner ${index + 1}`}
                  className="object-cover w-full h-[500px] rounded-xl"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search product by name..."
          className="w-1/2 p-2 text-gray-700 placeholder-gray-400 border border-blue-400 rounded-md bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* 🛒 Cart Items */}
        <div className="w-full p-4 bg-white shadow lg:w-2/3 rounded-xl">
          <div className="grid grid-cols-4 py-2 font-semibold text-center border-b">
            <div className="text-left">Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
          </div>

          {filteredCartItems.length > 0 ? (
            filteredCartItems.map(item => (
              <div
                key={item.id}
                className="grid items-center grid-cols-4 py-4 text-center border-b"
              >
                <div className="flex items-center gap-4 text-left">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                  <img src={item.image} alt={item.name} className="w-12 h-12" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">Color : {item.color}</p>
                  </div>
                </div>
                <div>Rs {item.price.toFixed(2)}</div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, 'decrease')}
                    className="px-2 border rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 'increase')}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>
                <div>Rs {(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-gray-500">No products found.</p>
          )}

          <div className="flex flex-col items-center justify-between mt-4 lg:flex-row">
            <div className="flex gap-2 mb-4 lg:mb-0">
              <input
                type="text"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                placeholder="Coupon Code"
                className="p-2 border rounded-md"
              />
              <button className="px-4 py-2 text-white rounded-md bg-blue2 hover:bg-blue3">
                Apply Coupon
              </button>
            </div>
            <button
              onClick={clearCart}
              className="text-blue3 hover:underline"
            >
              Clear Shopping Cart
            </button>
          </div>
        </div>

        {/* 📦 Order Summary */}
        <div className="w-full p-6 bg-white shadow lg:w-1/3 rounded-xl">
          <h3 className="mb-4 text-xl font-semibold">Order Summary</h3>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span>Sub Total:</span>
              <span>Rs{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Coupon Discount:</span>
              <span>-Rs{discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-4 text-lg font-bold border-t">
              <span>Total:</span>
              <span>Rs{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 mt-6 text-white rounded-lg bg-blue2 hover:bg-blue3"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
