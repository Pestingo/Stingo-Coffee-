import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Coffee, IceCream, Cookie, Merge as Hamburger, MapPin, Clock, Phone, Instagram, Facebook, Mail, ShoppingCart } from 'lucide-react';
import Scene from './components/Scene';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

export type MenuItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
};

const menuItems: MenuItem[] = [
  // Coffee
  { id: 'coffee1', title: 'Espresso', description: 'Rich, bold espresso shot', price: 25, category: 'coffee' },
  { id: 'coffee2', title: 'Cappuccino', description: 'Espresso with steamed milk foam', price: 35, category: 'coffee' },
  { id: 'coffee3', title: 'Café Latte', description: 'Espresso with steamed milk', price: 35, category: 'coffee' },
  { id: 'coffee4', title: 'Americano', description: 'Espresso with hot water', price: 28, category: 'coffee' },
  
  // Ice Cream
  { id: 'ice1', title: 'Vanilla Bean', description: 'Classic Madagascar vanilla', price: 30, category: 'icecream' },
  { id: 'ice2', title: 'Dark Chocolate', description: 'Rich Belgian chocolate', price: 35, category: 'icecream' },
  { id: 'ice3', title: 'Strawberry', description: 'Fresh strawberry gelato', price: 32, category: 'icecream' },
  
  // Burgers
  { id: 'burger1', title: 'Classic Beef', description: '200g beef patty with fresh toppings', price: 85, category: 'burger' },
  { id: 'burger2', title: 'Chicken Deluxe', description: 'Grilled chicken with avocado', price: 75, category: 'burger' },
  { id: 'burger3', title: 'Veggie', description: 'Plant-based patty with grilled vegetables', price: 70, category: 'burger' },
  
  // Cookies
  { id: 'cookie1', title: 'Chocolate Chip', description: 'Classic chocolate chip cookie', price: 15, category: 'cookie' },
  { id: 'cookie2', title: 'Double Chocolate', description: 'Rich double chocolate cookie', price: 18, category: 'cookie' },
  { id: 'cookie3', title: 'Oatmeal Raisin', description: 'Healthy oatmeal cookie with raisins', price: 15, category: 'cookie' },
];

function App() {
  const [cartItems, setCartItems] = useState<{[key: string]: number}>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (itemId: string) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full min-h-screen bg-[#1a0f00]">
      <Navbar cartCount={totalItems} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section with 3D Scene */}
      <div className="h-screen relative">
        <Canvas className="absolute inset-0">
          <PerspectiveCamera makeDefault position={[0, 2, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
        
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="bg-black/50 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="text-6xl font-bold text-white mb-4">Stingo Coffee</h1>
            <p className="text-xl text-white/80">Experience the finest coffee in Tzaneen</p>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4 bg-[#261500]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Menu</h2>
          
          {/* Coffee Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Coffee className="w-6 h-6" /> Coffee
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.filter(item => item.category === 'coffee').map(item => (
                <MenuCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  onAddToCart={() => addToCart(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Ice Cream Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <IceCream className="w-6 h-6" /> Ice Cream
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.filter(item => item.category === 'icecream').map(item => (
                <MenuCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  onAddToCart={() => addToCart(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Burgers Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Hamburger className="w-6 h-6" /> Burgers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.filter(item => item.category === 'burger').map(item => (
                <MenuCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  onAddToCart={() => addToCart(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Cookies Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Cookie className="w-6 h-6" /> Cookies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.filter(item => item.category === 'cookie').map(item => (
                <MenuCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  onAddToCart={() => addToCart(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-[#1a0f00]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">About Stingo Coffee</h2>
              <p className="text-white/80 mb-4">
                Located in the heart of Tzaneen, Stingo Coffee is more than just a coffee shop. We're a community hub where great coffee meets delicious food and warm hospitality.
              </p>
              <p className="text-white/80 mb-4">
                Our expert baristas craft the perfect cup using locally sourced beans, while our kitchen team prepares fresh burgers, artisanal ice cream, and homemade cookies daily.
              </p>
              <p className="text-white/80">
                Whether you're starting your day with our signature coffee, enjoying a gourmet burger for lunch, or treating yourself to our handcrafted ice cream, we're here to make every visit special.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Coffee beans" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="contact" className="py-20 px-4 bg-[#261500]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Visit Us</h2>
              <div className="space-y-6 text-white/80">
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6" />
                  <p>123 Main Street, Tzaneen, Limpopo</p>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6" />
                  <p>Mon-Sun: 7:00 AM - 9:00 PM</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6" />
                  <p>064 633 8520</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6" />
                  <p>pesterpestingo@gmail.com</p>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <a href="https://www.instagram.com/pestingo" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/pestingo" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Stingo Coffee Shop" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        menuItems={menuItems}
        setItems={setCartItems}
      />
    </div>
  );
}

function MenuCard({ 
  title, 
  description, 
  price,
  onAddToCart 
}: { 
  title: string;
  description: string;
  price: number;
  onAddToCart: () => void;
}) {
  return (
    <div className="bg-[#3d2200] p-6 rounded-lg hover:bg-[#4d2a00] transition-colors">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/80 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-white font-bold">R {price.toFixed(2)}</span>
        <button
          onClick={onAddToCart}
          className="bg-[#ff9500] hover:bg-[#ffaa33] text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default App;