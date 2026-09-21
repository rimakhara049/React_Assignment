import { useState } from 'react';
import './App.css';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';

const SAMPLE_PRODUCTS = [
  {
    id: 101,
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 26990,
    description: "Industry Leading Noise Canceling Wireless Headphones with 30hr battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
  },
  {
    id: 102,
    name: "Apple Watch Ultra 2",
    category: "Wearables",
    price: 89900,
    description: "Rugged titanium case with dual-frequency GPS, depth gauge, and cellular connectivity.",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80"
  },
  {
    id: 103,
    name: "Keychron K2 Mechanical Keyboard",
    category: "Peripherals",
    price: 8499,
    description: "Wireless mechanical keyboard with RGB backlighting and hot-swappable switches.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80"
  },
  {
    id: 104,
    name: "Logitech MX Master 3S",
    category: "Peripherals",
    price: 9995,
    description: "Quiet click ergonomic wireless mouse with 8K DPI any-surface laser sensor.",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80"
  },
  {
    id: 105,
    name: "Dell UltraSharp 27\" 4K",
    category: "Displays",
    price: 52490,
    description: "IPS Black Technology, 98% DCI-P3 color gamut, and 90W USB-C hub connectivity.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"
  },
  {
    id: 106,
    name: "Bose SoundLink Flex",
    category: "Audio",
    price: 15900,
    description: "Rugged waterproof outdoor Bluetooth speaker with PositionIQ deep resonance tech.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"
  }
];

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="store-container">
        <Navbar onToggleCart={() => setIsCartOpen(true)} />
        <main className="content-container">
          <ProductList products={SAMPLE_PRODUCTS} />
        </main>
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}