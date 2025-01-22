import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { MenuItem } from '../App';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: { [key: string]: number };
  menuItems: MenuItem[];
  setItems: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

function Cart({ isOpen, onClose, items, menuItems, setItems }: CartProps) {
  const updateQuantity = (itemId: string, delta: number) => {
    setItems(prev => {
      const newQuantity = (prev[itemId] || 0) + delta;
      if (newQuantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prev => {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    });
  };

  const total = Object.entries(items).reduce((sum, [itemId, quantity]) => {
    const item = menuItems.find(i => i.id === itemId);
    return sum + (item?.price || 0) * quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#261500] shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[#4d2a00] p-4">
            <h2 className="text-xl font-bold text-white">Your Cart</h2>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {Object.entries(items).map(([itemId, quantity]) => {
              const item = menuItems.find(i => i.id === itemId);
              if (!item) return null;

              return (
                <div key={itemId} className="mb-4 rounded-lg bg-[#3d2200] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <button
                      onClick={() => removeItem(itemId)}
                      className="text-white/80 hover:text-white"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-white/80 text-sm mb-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(itemId, -1)}
                        className="text-white/80 hover:text-white"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                      <span className="text-white min-w-[2rem] text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(itemId, 1)}
                        className="text-white/80 hover:text-white"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                    <span className="text-white font-bold">
                      R {(item.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}

            {Object.keys(items).length === 0 && (
              <div className="text-center text-white/80 mt-8">
                Your cart is empty
              </div>
            )}
          </div>

          <div className="border-t border-[#4d2a00] p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-bold">Total</span>
              <span className="text-white font-bold">R {total.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-[#ff9500] hover:bg-[#ffaa33] text-white py-3 rounded-lg transition-colors"
              onClick={() => alert('Checkout functionality coming soon!')}
              disabled={Object.keys(items).length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;