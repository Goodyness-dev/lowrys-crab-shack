import React from 'react';
import { StarIcon, CoffeeIcon, SpoonForkIcon } from '../common/Icons';
import { BUSINESS_INFO } from '../../data/businessData';

export default function PeopleStorySection() {
  return (
    <section className="py-24 sm:py-32 bg-cream-200 dark:bg-midnight transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-restaurant-red/10 border border-restaurant-red/20 text-restaurant-red text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <SpoonForkIcon className="w-4 h-4" />
            <span>// 07 MEET OUR FOUNDERS & KITCHEN CREW</span>
          </div>

          <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-restaurant-brown dark:text-cream-50 tracking-tight leading-tight">
            FAMILY ROOTS & <br />
            <span className="italic font-light text-restaurant-red">CHESAPEAKE PRIDE.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-restaurant-ink/75 dark:text-cream-200/75 font-sans leading-relaxed">
            The heart of Lowry’s Crab Shack has always been Donald and Leslie Lowry, along with their dedicated kitchen crew steaming fresh seafood daily.
          </p>
        </div>

        {/* Feature Split: REAL Owners & Staff Photo & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-thick border-4 border-cream-50 dark:border-midnight-border group">
              <img 
                src="/images/founders-donald-leslie.jpg" 
                alt="Donald and Leslie Lowry, Founders of Lowry's Crab Shack" 
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div>
                  <span className="text-xs font-mono text-restaurant-gold uppercase tracking-wider font-bold">
                    Donald & Leslie Lowry • Founders
                  </span>
                  <p className="text-cream-50 font-serif font-bold text-lg sm:text-2xl mt-1">
                    "We built this shack so families could pull up a chair, crack crabs, and feel right at home."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-cream-50 dark:bg-midnight-card border-2 border-restaurant-brown/10 dark:border-midnight-border shadow-thick">
              <h3 className="font-serif font-bold text-2xl text-restaurant-brown dark:text-cream-50">
                Nearly 20 Years in Hamilton
              </h3>
              <p className="mt-3 text-sm sm:text-base text-restaurant-ink/80 dark:text-cream-200/80 font-sans leading-relaxed">
                What began as Donald selling fresh seafood out of a truck evolved into one of Loudoun County's most beloved crab shacks. We treat every customer like an old friend, whether you're ordering a half-bushel of jumbos or bringing the whole family for Sunday fried chicken.
              </p>
              <div className="mt-6 pt-6 border-t border-restaurant-brown/10 dark:border-midnight-border flex items-center justify-between text-xs font-mono">
                <span className="text-restaurant-red font-bold">420 W COLONIAL HWY</span>
                <span className="text-restaurant-brown/60 dark:text-cream-400">Hamilton, Virginia</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-cream-100 dark:bg-midnight border border-restaurant-brown/10 dark:border-midnight-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-restaurant-gold/20 flex items-center justify-center shrink-0">
                <StarIcon className="w-6 h-6 text-restaurant-gold" fill="currentColor" />
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-restaurant-brown dark:text-cream-50">
                  4.8 ★ Crab Shack Rating
                </div>
                <div className="text-xs text-restaurant-ink/60 dark:text-cream-300 font-sans">
                  Over 1,200 verified 5-star reviews from Loudoun & DMV seafood lovers
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Real Customer Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BUSINESS_INFO.reviews.slice(0, 3).map((rev, idx) => (
            <div 
              key={idx}
              className="card-thick p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-restaurant-gold mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4" fill="currentColor" />
                  ))}
                </div>
                <p className="font-sans text-sm text-restaurant-ink/80 dark:text-cream-200/80 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-restaurant-brown/10 dark:border-midnight-border flex items-center justify-between">
                <div>
                  <div className="font-serif font-bold text-sm text-restaurant-brown dark:text-cream-50">
                    {rev.author}
                  </div>
                  <div className="text-[11px] font-mono text-restaurant-ink/50 dark:text-cream-400">
                    {rev.location}
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-cream-200 dark:bg-midnight-card text-restaurant-red font-semibold">
                  {rev.source}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
