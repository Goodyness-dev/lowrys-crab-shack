import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function ItemCustomizerModal() {
  const { isCustomizerOpen, closeCustomizer, customizingItem, addToCart } = useCart();

  if (!isCustomizerOpen || !customizingItem) return null;

  const item = customizingItem;
  const isCrab = item.name.toLowerCase().includes('crab') || (item.category && item.category.includes('crab'));
  const isChicken = item.name.toLowerCase().includes('chicken');
  const isShrimpOrSeafood = item.name.toLowerCase().includes('shrimp') || item.name.toLowerCase().includes('oyster') || item.name.toLowerCase().includes('seafood');
  const isSide = item.name.toLowerCase().includes('chips') || item.name.toLowerCase().includes('salad') || item.name.toLowerCase().includes('hushpuppies') || item.name.toLowerCase().includes('macaroni') || item.name.toLowerCase().includes('fries') || item.name.toLowerCase().includes('beans') || item.name.toLowerCase().includes('potatoes');
  const isCake = item.name.toLowerCase().includes('cake') || item.name.toLowerCase().includes('cheesecake');

  // Portion/Size Configuration
  const [selectedPortion, setSelectedPortion] = useState(() => {
    if (isCrab && (item.name.toLowerCase().includes('dozen') || item.name.toLowerCase().includes('bushel'))) {
      return { name: '1 Dozen Steamed Crabs', price: 42.00 };
    }
    if (isChicken && item.name.toLowerCase().includes('family')) {
      return { name: '8-Piece Family Meal w/ Large Side', price: 27.99 };
    }
    if (isShrimpOrSeafood && item.name.toLowerCase().includes('shrimp')) {
      return { name: '1 lb Steamed Spiced Shrimp', price: 16.99 };
    }
    if (isSide) {
      return { name: 'Single Portion', price: 4.99 };
    }
    if (isCake) {
      return { name: 'Single Generous Slice', price: 7.50 };
    }
    const num = parseFloat((item.price || '').replace(/[^0-9.]/g, '')) || 15.99;
    return { name: 'Regular Portion', price: num };
  });

  // Crab Specific Options
  const [crabGender, setCrabGender] = useState('Mixed Males & Females');
  const [crabSpice, setCrabSpice] = useState('Classic Old Bay (Standard)');
  const [drawnButterCups, setDrawnButterCups] = useState(1);
  const [extraMallets, setExtraMallets] = useState(0);

  // Chicken Specific Options
  const [chickenCut, setChickenCut] = useState('Mixed Cuts (Breasts, Thighs, Legs, Wings)');
  const [primarySide, setPrimarySide] = useState('Southern Baked Mac & Cheese');
  const [secondarySide, setSecondarySide] = useState('Sweet Sweet Hushpuppies (8)');

  // Shrimp & Seafood Options
  const [seafoodPrep, setSeafoodPrep] = useState('Steamed with Sweet Onions, Cider Vinegar & Old Bay');
  const [cocktailSauces, setCocktailSauces] = useState(1);

  // Cake Specific
  const [cakeFlavor, setCakeFlavor] = useState('Traditional 8-Layer Chocolate Fudge');

  // Common
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate live total
  let baseUnitCost = selectedPortion.price;
  if (isCrab && crabGender.includes('Males Only')) {
    baseUnitCost += 5.00;
  }
  if (isChicken && chickenCut.includes('All White')) {
    baseUnitCost += 3.50;
  }
  let extrasCost = 0;
  if (isCrab) {
    extrasCost += (drawnButterCups > 0 ? (drawnButterCups - 1) * 0.75 : 0);
    extrasCost += (extraMallets * 1.50);
  }
  if (isShrimpOrSeafood) {
    extrasCost += (cocktailSauces > 1 ? (cocktailSauces - 1) * 0.50 : 0);
  }

  const finalUnitPrice = baseUnitCost + extrasCost;
  const lineTotal = finalUnitPrice * quantity;

  const handleAdd = () => {
    const selectedOptions = [];
    if (isCrab) {
      selectedOptions.push(`Portion: ${selectedPortion.name}`);
      selectedOptions.push(`Crab: ${crabGender}`);
      selectedOptions.push(`Spice: ${crabSpice}`);
      if (drawnButterCups > 0) selectedOptions.push(`${drawnButterCups} Drawn Butter Cup(s)`);
      if (extraMallets > 0) selectedOptions.push(`${extraMallets} Crab Mallet(s)`);
    } else if (isChicken) {
      selectedOptions.push(`Meal: ${selectedPortion.name}`);
      selectedOptions.push(`Cut: ${chickenCut}`);
      if (selectedPortion.name.includes('Side')) {
        selectedOptions.push(`Side 1: ${primarySide}`);
        if (selectedPortion.name.includes('2 Large Sides') || selectedPortion.name.includes('2 Sides')) {
          selectedOptions.push(`Side 2: ${secondarySide}`);
        }
      }
    } else if (isShrimpOrSeafood) {
      selectedOptions.push(`Size: ${selectedPortion.name}`);
      selectedOptions.push(`Style: ${seafoodPrep}`);
      if (cocktailSauces > 0) selectedOptions.push(`${cocktailSauces} Cocktail Sauce(s)`);
    } else if (isCake) {
      selectedOptions.push(`Flavor: ${cakeFlavor}`);
      selectedOptions.push(`Size: ${selectedPortion.name}`);
    } else if (isSide) {
      selectedOptions.push(`Size: ${selectedPortion.name}`);
    }

    if (specialInstructions.trim()) {
      selectedOptions.push(`Notes: ${specialInstructions.trim()}`);
    }

    addToCart({
      name: item.name,
      price: finalUnitPrice,
      quantity,
      image: item.image,
      optionsKey: selectedOptions.join('|'),
      selectedOptions,
      specialInstructions: specialInstructions.trim()
    });

    closeCustomizer();
  };

  const sideOptionsList = [
    'Southern Baked Mac & Cheese',
    'Broccoli & Cauliflower Bacon Salad',
    'House-Made Old Bay Crab Chips',
    'Golden Sweet Hushpuppies (Basket)',
    'Fresh Shredded Coleslaw',
    'Country Ham Green Beans',
    'Mashed Potatoes & Brown Gravy',
    'Shoestring Seasoned Fries'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white border-2 border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 text-left"
        role="dialog"
      >
        
        {/* Top Header with Image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={closeCustomizer}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition border border-white/20 cursor-pointer z-10"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Dish Title in Header */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-800/60 inline-block mb-1.5">
              Custom Order
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
              {item.name}
            </h3>
            <p className="text-xs text-slate-300 font-light line-clamp-2 mt-1">
              {item.desc || item.shortDescription || 'Fresh Chesapeake steamed seafood & scratch cooking.'}
            </p>
          </div>
        </div>

        {/* Customization Options Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[60vh] overflow-y-auto bg-white text-slate-900">
          
          {/* 1. PORTION / SIZE SELECTION */}
          {isCrab && (item.name.toLowerCase().includes('dozen') || item.name.toLowerCase().includes('bushel')) && (
            <div className="space-y-2.5">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                1. Select Portion / Quantity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: '1 Dozen Steamed Crabs', price: 42.00, badge: 'Popular' },
                  { name: '2 Dozen Steamed Crabs', price: 80.00, badge: 'Save $4' },
                  { name: 'Half Bushel (~3 Dozen)', price: 115.00, badge: 'Family Feast' },
                  { name: 'Full Bushel (~6-7 Dozen)', price: 210.00, badge: 'Party Bushel' },
                ].map(opt => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setSelectedPortion(opt)}
                    className={`p-3 rounded-2xl border-2 text-left transition flex items-center justify-between cursor-pointer ${
                      selectedPortion.name === opt.name
                        ? 'border-red-600 bg-red-50/60 text-slate-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs">{opt.name}</div>
                      <span className="text-[10px] text-red-600 font-mono">{opt.badge}</span>
                    </div>
                    <span className="text-xs font-mono font-bold">${opt.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CHICKEN MEAL PORTION SELECTION */}
          {isChicken && (
            <div className="space-y-2.5">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                1. Select Fried Chicken Meal Size
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: '8-Piece Family Meal w/ Large Side', price: 27.99, badge: 'Voted #1' },
                  { name: '16-Piece Colossal Meal w/ 2 Large Sides', price: 55.99, badge: 'Big Group' },
                  { name: '8-Piece Chicken Only (No Sides)', price: 17.99, badge: 'Crispy' },
                  { name: '3-Piece Chicken Dinner w/ 2 Sides', price: 12.99, badge: 'Dinner' },
                  { name: '2-Piece Chicken Dinner w/ 2 Sides', price: 10.99, badge: 'Lunch' },
                  { name: 'Hand-Breaded Tenders Basket w/ Fries', price: 11.99, badge: 'Tenders' },
                ].map(opt => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setSelectedPortion(opt)}
                    className={`p-2.5 rounded-xl border-2 text-left transition flex items-center justify-between cursor-pointer ${
                      selectedPortion.name === opt.name
                        ? 'border-red-600 bg-red-50/60 text-slate-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs">{opt.name}</div>
                      <span className="text-[10px] text-red-600 font-mono">{opt.badge}</span>
                    </div>
                    <span className="text-xs font-mono font-bold">${opt.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SHRIMP PORTION SELECTION */}
          {isShrimpOrSeafood && item.name.toLowerCase().includes('shrimp') && (
            <div className="space-y-2.5">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                1. Select Steamed Shrimp Weight
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { name: '1/2 lb Steamed Spiced Shrimp', price: 9.99 },
                  { name: '1 lb Steamed Spiced Shrimp', price: 16.99 },
                  { name: '2 lbs Steamed Spiced Shrimp', price: 31.99 },
                ].map(opt => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setSelectedPortion(opt)}
                    className={`p-2.5 rounded-xl border-2 text-center transition cursor-pointer ${
                      selectedPortion.name === opt.name
                        ? 'border-red-600 bg-red-50 text-slate-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-medium">{opt.name.split(' ')[0]} {opt.name.split(' ')[1]}</div>
                    <div className="text-xs font-mono font-bold text-red-600">${opt.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SIDES PORTION SELECTION */}
          {isSide && (
            <div className="space-y-2.5">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Select Side Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Single Portion', price: 4.99 },
                  { name: '32oz Family Shareable Tub', price: 11.99 },
                ].map(opt => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setSelectedPortion(opt)}
                    className={`p-3 rounded-xl border-2 text-center transition cursor-pointer ${
                      selectedPortion.name === opt.name
                        ? 'border-red-600 bg-red-50 text-slate-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-medium">{opt.name}</div>
                    <div className="text-xs font-mono font-bold text-red-600">${opt.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CRAB GENDER / SORTING */}
          {isCrab && (
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Crab Sorting Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { label: 'Mixed Males & Females', extra: null },
                  { label: '#1 Heavy Males Only', extra: '+$5.00' },
                  { label: 'Sweet Females Only', extra: null },
                ].map(g => (
                  <button
                    key={g.label}
                    type="button"
                    onClick={() => setCrabGender(g.label)}
                    className={`p-2.5 rounded-xl border-2 text-center text-xs transition cursor-pointer ${
                      crabGender === g.label
                        ? 'border-red-600 bg-red-50 text-slate-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>{g.label}</div>
                    {g.extra && <span className="text-[10px] text-red-600 font-mono font-bold">{g.extra}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CRAB SPICE LEVEL */}
          {isCrab && (
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Steamer Seasoning Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Classic Old Bay (Standard)',
                  'Heavy Old Bay (Shack Style)',
                  'Extra Spicy Fire Seasoning',
                  'Light Old Bay',
                  'Plain Steamed (No Spice)'
                ].map(spice => (
                  <button
                    key={spice}
                    type="button"
                    onClick={() => setCrabSpice(spice)}
                    className={`p-2 rounded-xl border-2 text-center text-xs transition cursor-pointer ${
                      crabSpice === spice
                        ? 'border-red-600 bg-red-50 text-slate-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {spice}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CHICKEN CUT SELECTION */}
          {isChicken && (
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Chicken Cut Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { label: 'Mixed Cuts (Breasts, Thighs, Legs, Wings)', extra: null },
                  { label: 'All White Meat (Breasts & Wings)', extra: '+$3.50' },
                  { label: 'All Dark Meat (Thighs & Legs)', extra: null }
                ].map(cut => (
                  <button
                    key={cut.label}
                    type="button"
                    onClick={() => setChickenCut(cut.label)}
                    className={`p-2.5 rounded-xl border-2 text-center text-xs transition cursor-pointer ${
                      chickenCut === cut.label
                        ? 'border-red-600 bg-red-50 text-slate-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>{cut.label}</div>
                    {cut.extra && <span className="text-[10px] text-red-600 font-mono font-bold">{cut.extra}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CHICKEN SIDES SELECTION */}
          {isChicken && selectedPortion.name.includes('Side') && (
            <div className="space-y-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Choose Primary Side:
                </label>
                <select
                  value={primarySide}
                  onChange={(e) => setPrimarySide(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800"
                >
                  {sideOptionsList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {(selectedPortion.name.includes('2 Large Sides') || selectedPortion.name.includes('2 Sides')) && (
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Choose Secondary Side:
                  </label>
                  <select
                    value={secondarySide}
                    onChange={(e) => setSecondarySide(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-800"
                  >
                    {sideOptionsList.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* SMITH ISLAND CAKE FLAVOR */}
          {isCake && (
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Select Cake Flavor
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Traditional 8-Layer Chocolate Fudge',
                  'Authentic Caramel Glaze Layer Cake',
                  'Southern Red Velvet Smith Island Cake',
                  'Sweet Coconut Multi-Layer Cake',
                  'New York Style Strawberry Cheesecake'
                ].map(flavor => (
                  <button
                    key={flavor}
                    type="button"
                    onClick={() => setCakeFlavor(flavor)}
                    className={`p-2.5 rounded-xl border-2 text-left text-xs transition cursor-pointer ${
                      cakeFlavor === flavor
                        ? 'border-red-600 bg-red-50 text-slate-900 font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CRAB EXTRAS */}
          {isCrab && (
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <span className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                Crab Shack Essentials
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-bold block">Warm Melted Drawn Butter</span>
                    <span className="text-[11px] text-slate-500 font-mono">1st cup included, +$0.75 extra</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setDrawnButterCups(prev => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs"
                    >-</button>
                    <span className="text-xs font-mono font-bold w-4 text-center">{drawnButterCups}</span>
                    <button
                      type="button"
                      onClick={() => setDrawnButterCups(prev => prev + 1)}
                      className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs"
                    >+</button>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-bold block">Wooden Crab Mallets</span>
                    <span className="text-[11px] text-slate-500 font-mono">+$1.50 each to keep</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setExtraMallets(prev => Math.max(0, prev - 1))}
                      className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs"
                    >-</button>
                    <span className="text-xs font-mono font-bold w-4 text-center">{extraMallets}</span>
                    <button
                      type="button"
                      onClick={() => setExtraMallets(prev => prev + 1)}
                      className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SPECIAL INSTRUCTIONS */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
              Special Instructions / Dietary Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="E.g. Extra lemon wedges, sauce on the side, allergies..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

        </div>

        {/* Modal Bottom Bar with Quantity & Add Button */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 bg-white border border-slate-300 rounded-full px-3 py-1.5">
            <button
              type="button"
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="text-slate-600 hover:text-slate-900 font-bold text-sm px-1 cursor-pointer"
            >
              –
            </button>
            <span className="font-mono font-bold text-sm w-6 text-center text-slate-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(prev => prev + 1)}
              className="text-slate-600 hover:text-slate-900 font-bold text-sm px-1 cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3.5 px-5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md active:scale-95 flex items-center justify-between cursor-pointer"
          >
            <span>Add to Shack Order</span>
            <span className="font-mono text-sm">${lineTotal.toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
