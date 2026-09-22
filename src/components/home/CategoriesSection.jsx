import React, { useState } from 'react';
import { ArrowRightIcon } from '../common/Icons';

const CATEGORY_ITEMS = [
  {
    name: 'Blue Crabs & Boils',
    tagline: 'Fresh live Chesapeake blue crabs steamed with cider vinegar, beer & Old Bay',
    hours: 'Steamed Fresh To Order Daily',
    image: '/images/blue-crabs-steamed.jpg',
    leadPlate: 'Steamed Chesapeake Blue Crabs (Dozen / Half-Dozen)',
    description: 'Caught fresh and steamed on-site with cider vinegar, beer, and generous Old Bay. Spread across butcher paper with wooden mallets.',
    dishes: [
      { name: 'Chesapeake Hard Shell Blue Crabs', price: 'Market Price', desc: 'Small, Medium, Large & Jumbo steamed hot with Old Bay' },
      { name: 'Cajun Bayou Low Country Boil', price: '$38.99', desc: 'Crawfish, Gulf shrimp, andouille, sweet corn & red potatoes' },
      { name: 'Steamed Snow Crab Clusters', price: '$26.99 / lb', desc: 'Sweet, tender snow crab served with hot drawn butter' }
    ]
  },
  {
    name: '#1 Fried Chicken',
    tagline: '4x Voted Best Fried Chicken in Loudoun County (2021-2024)',
    hours: 'Fresh Hand-Breaded Golden Crisp',
    image: '/images/award-winning-fried-chicken.png',
    leadPlate: '4x Voted #1 Fried Chicken Platter',
    description: 'Fresh chicken hand-breaded in Donald’s signature seasoned flour and fried crispy golden to order. Juicy on the inside, crunchy on the outside.',
    dishes: [
      { name: '4-Piece Fried Chicken Dinner', price: '$16.99', desc: 'Breast, thigh, wing, leg with hushpuppies and 2 sides' },
      { name: '8-Piece Family Box', price: '$23.99', desc: 'Full box with 4 golden hushpuppies & homemade slaw' },
      { name: 'Fried Chicken & Sweet Corn Fritters', price: '$15.99', desc: 'Golden chicken paired with honey-buttered corn fritters' }
    ]
  },
  {
    name: 'Crab Cakes & Oysters',
    tagline: 'Jumbo lump Maryland crab cakes, fried oysters & Gulf shrimp',
    hours: 'Hand-Picked Seafood Specialties',
    image: '/images/dish-lump-crabcake-platter.jpg',
    leadPlate: 'Jumbo Lump Crab Cake & Fried Oyster Platter',
    description: 'Pure jumbo lump Chesapeake crab meat with zero filler, paired with freshly shucked oysters and Donald’s house remoulade.',
    dishes: [
      { name: 'Jumbo Lump Maryland Crab Cake Platter', price: '$27.99', desc: 'Pan-seared lump crab cake, fries, slaw & tartar sauce' },
      { name: 'Crispy Fried Virginia Oysters', price: '$22.99', desc: 'Fresh shucked oysters lightly dusted and fried to golden perfection' },
      { name: 'Wild Gulf Steamed / Fried Shrimp Basket', price: '$18.99', desc: 'Half-pound of plump sweet shrimp with cocktail sauce & hushpuppies' }
    ]
  },
  {
    name: 'Po\'boys & Shack Sides',
    tagline: 'Donald\'s 1 lb Big Fish sandwich, soft shell crabs & sweet corn fritters',
    hours: 'Served on French Sub Rolls with House Slaw',
    image: '/images/dish-donald-big-fish-poboy.jpg',
    leadPlate: 'Donald’s Colossal 1 lb Big Fish Po’boy',
    description: 'A full pound of crispy fried white fish overflowing on an artisan sub roll with lettuce, sliced tomato, and house-blended tartar sauce.',
    dishes: [
      { name: 'Donald’s 1 lb Big Fish Po’boy', price: '$16.99', desc: 'Colossal crispy fish filet with lettuce, tomato, tartar & fries' },
      { name: 'Crispy Soft Shell Crab Sandwich', price: 'Market Price', desc: 'Fresh whole soft shell crab fried crisp with lemon remoulade' },
      { name: 'Sweet Corn Fritters with Powdered Sugar', price: '$6.99', desc: 'Hot golden fritters dusted with powdered sugar & honey butter' }
    ]
  }
];

export default function CategoriesSection({ onOpenMenu }) {
  const [activeCategory, setActiveCategory] = useState(CATEGORY_ITEMS[0]);

  return (
    <section id="categories" className="py-24 bg-cream-100 dark:bg-midnight-pure border-y border-restaurant-brown/10 dark:border-midnight-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-restaurant-gold/20 text-restaurant-brown dark:text-restaurant-gold text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <span>// 03 THE OFFICIAL CRAB SHACK MENU</span>
          </div>

          <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-restaurant-brown dark:text-cream-50 tracking-tight leading-tight">
            WHAT ARE YOU <br className="hidden sm:block" />
            <span className="italic font-light text-restaurant-red">CRAVING TODAY?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-restaurant-ink/70 dark:text-cream-200/70 font-sans">
            From hot steamed blue crabs and Low Country boils to Loudoun's #1 fried chicken and Smith Island cakes.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORY_ITEMS.map((cat) => {
            const isSelected = activeCategory.name === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-restaurant-red text-cream-50 shadow-thick-red scale-105'
                    : 'bg-cream-50 dark:bg-midnight-card text-restaurant-brown dark:text-cream-200 hover:bg-cream-300 dark:hover:bg-midnight-border border border-restaurant-brown/10 dark:border-midnight-border'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Dynamic Category Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-cream-50 dark:bg-midnight-card rounded-3xl p-6 sm:p-10 lg:p-12 shadow-thick border-2 border-restaurant-brown/10 dark:border-midnight-border">
          
          {/* Featured Image */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] group">
            <img 
              src={activeCategory.image} 
              alt={activeCategory.leadPlate} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-cream-50">
              <span className="text-xs font-mono uppercase tracking-wider text-restaurant-gold mb-1">
                {activeCategory.hours}
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-cream-50">
                {activeCategory.leadPlate}
              </h3>
            </div>
          </div>

          {/* Description & Menu Items */}
          <div className="lg:col-span-6 space-y-6 lg:pl-4">
            <div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-restaurant-brown dark:text-cream-50">
                {activeCategory.name}
              </h3>
              <p className="mt-2 text-restaurant-ink/80 dark:text-cream-200/80 font-sans text-sm sm:text-base leading-relaxed">
                {activeCategory.description}
              </p>
            </div>

            {/* Dish Rows */}
            <div className="space-y-3 pt-2">
              {activeCategory.dishes.map((dish, i) => (
                <div 
                  key={i} 
                  className="p-4 rounded-xl bg-cream-100 dark:bg-midnight border border-restaurant-brown/10 dark:border-midnight-border flex items-center justify-between gap-4 hover:border-restaurant-red/40 transition-colors"
                >
                  <div>
                    <h4 className="font-serif font-bold text-base text-restaurant-brown dark:text-cream-100">
                      {dish.name}
                    </h4>
                    <p className="text-xs text-restaurant-ink/60 dark:text-cream-300 font-sans mt-0.5">
                      {dish.desc}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-base text-restaurant-red shrink-0">
                    {dish.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button 
                onClick={onOpenMenu}
                className="inline-flex items-center gap-2 text-sm font-bold text-restaurant-red hover:text-restaurant-redHover tracking-wider uppercase group"
              >
                <span>EXPLORE ALL {activeCategory.name.toUpperCase()}</span>
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
