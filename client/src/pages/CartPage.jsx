import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, CreditCard } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const CartPage = () => {
  const { showToast } = useToast();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  }, []);

  const removeItem = (index) => {
    const item = cartItems[index];
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    showToast(`${item.name} removed from cart.`, 'warning');
  };

  const handleCheckout = () => {
    showToast('Proceeding to checkout! This feature will be implemented soon.', 'info');
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Very basic mock calculation: stripping non-numeric characters from price strings
      const priceVal = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return total + (isNaN(priceVal) ? 0 : priceVal);
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <ShoppingCart className="w-6 h-6 mr-2 text-green-600" />
          My Cart
        </h1>
        <p className="text-gray-500 mt-1">Review your selected products and checkout.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-gray-100 shadow-sm text-center">
          <ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-600 mb-2">Your cart is empty</h2>
          <p className="text-gray-400">Head over to the Marketplace to find fresh produce!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {cartItems.map((item, index) => (
              <div key={index} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center text-3xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.seller}</p>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">Qty: 1 {item.unit.replace('/', '')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 sm:justify-end w-full sm:w-auto">
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-lg">{item.price}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(index)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-gray-800">₹{calculateTotal().toFixed(2)}</p>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm"
            >
              <CreditCard className="w-5 h-5" />
              <span>Checkout Now</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
