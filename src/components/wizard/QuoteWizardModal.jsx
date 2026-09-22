import React, { useState, useEffect } from 'react';
import { submitQuoteRequest } from '../../services/quoteService';
import { BUSINESS_INFO } from '../../data/businessData';

export default function QuoteWizardModal({ isOpen, onClose, initialCategory = null }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    seatingArea: initialCategory || 'Covered Outdoor Picnic Pavilion',
    partySize: '4 Guests',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '5:30 PM',
    occasion: 'Family Crab Feast',
    culinaryNotes: '',
    crabsWanted: true,
    chickenWanted: true,
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentStep(1);
      setSubmissionResult(null);
      setErrorMsg('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const seatingOptions = [
    {
      title: 'Covered Outdoor Picnic Pavilion',
      desc: 'Authentic wooden picnic tables beneath our open-air shelter with fresh butcher paper, mallets, and paper towels.',
      badge: 'Most Popular'
    },
    {
      title: 'Rustic Indoor Shack Dining',
      desc: 'Air-conditioned casual indoor dining area surrounded by Chesapeake Bay watermen memorabilia.',
      badge: 'Indoor AC'
    },
    {
      title: 'Carryout Steamed Bushel & Chicken Pickup',
      desc: 'Piping hot blue crabs steamed to order and packed in insulated bushels + fried chicken meals to take home.',
      badge: 'Carryout'
    },
    {
      title: 'Family & Group Feast (8+ Guests)',
      desc: 'Reserved multi-table picnic layout for family reunions, birthdays, and sports team celebrations.',
      badge: 'Large Groups'
    }
  ];

  const timeSlots = [
    '12:00 PM (Sat/Sun)', '1:00 PM (Sat/Sun)', '2:30 PM (Sat/Sun)', 
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
  ];

  const partySizes = [
    '2 Guests', '3–4 Guests', '5–6 Guests', '7–8 Guests', '9–12 Guests (Group)', '15+ Private Gathering'
  ];

  const occasions = [
    'Family Crab Feast', 'Birthday Celebration', 'Weekend Road Trip / Day Out', 'Fried Chicken Purists Outing', 'Work / Team Dinner', 'Casual Shack Dinner'
  ];

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 1 && !formData.seatingArea) {
      setErrorMsg('Please select your preferred seating or pickup style.');
      return;
    }
    if (currentStep === 2 && (!formData.date || !formData.timeSlot)) {
      setErrorMsg('Please select your date and preferred time slot.');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setErrorMsg('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please provide your name, email, and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitQuoteRequest({
        ...formData,
        serviceName: formData.seatingArea,
        vehicleDetails: `Party: ${formData.partySize} | Time: ${formData.timeSlot} | Crabs: ${formData.crabsWanted ? 'YES' : 'NO'} | Chicken: ${formData.chickenWanted ? 'YES' : 'NO'}`
      });
      setSubmissionResult(result);
      setCurrentStep(4);
    } catch (err) {
      setErrorMsg('Reservation request could not be processed. Please call (540) 338-2348.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-white border-2 border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Header */}
        <div className="bg-slate-50 px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full border-2 border-red-600 bg-red-50 flex items-center justify-center font-serif text-red-600 font-bold text-xs">
              LC
            </div>
            <div className="text-left">
              <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Lowry's Crab Shack Table & Bushel Booking
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-red-600 font-mono font-semibold">
                Hamilton, VA • (540) 338-2348
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100">
          <div 
            className="h-full bg-red-600 transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto bg-white">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-left">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: Seating Atmosphere */}
          {currentStep === 1 && (
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Select Seating or Carryout Style
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-light">
                  Choose where you'll be cracking crabs or if you're taking hot bushels to go.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seatingOptions.map((opt) => {
                  const isSelected = formData.seatingArea === opt.title;
                  return (
                    <div
                      key={opt.title}
                      onClick={() => setFormData(prev => ({ ...prev, seatingArea: opt.title }))}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 text-left ${
                        isSelected
                          ? 'border-red-600 bg-red-50/50 shadow-md -translate-y-0.5 ring-1 ring-red-500/30'
                          : 'border-slate-200 bg-white hover:border-red-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif font-bold text-sm sm:text-base text-slate-900">
                          {opt.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-mono font-bold">
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-light leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Date, Time & Party Size */}
          {currentStep === 2 && (
            <div className="space-y-5 text-left">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Party Size & Time Slot
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-light">
                  Open Wed–Fri 4–8 PM, Sat & Sun 12–8 PM (Closed Mon & Tue).
                </p>
              </div>

              {/* Party Size */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono font-bold text-slate-700 mb-2">
                  Party Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {partySizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, partySize: size }))}
                      className={`py-2 px-3 rounded-xl border-2 text-xs font-bold text-center transition ${
                        formData.partySize === size
                          ? 'bg-red-600 text-white border-red-600 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono font-bold text-slate-700 mb-1.5">
                    Dining / Pickup Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono font-bold text-slate-700 mb-1.5">
                    Preferred Time
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono font-bold text-slate-700 mb-1.5">
                  Occasion
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData(prev => ({ ...prev, occasion: e.target.value }))}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {occasions.map((occ) => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>

              {/* Feast Preferences */}
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.crabsWanted}
                    onChange={(e) => setFormData(prev => ({ ...prev, crabsWanted: e.target.checked }))}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-slate-300"
                  />
                  <span>Steamed Blue Crabs wanted</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.chickenWanted}
                    onChange={(e) => setFormData(prev => ({ ...prev, chickenWanted: e.target.checked }))}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-slate-300"
                  />
                  <span>Voted #1 Fried Chicken wanted</span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Contact & Notes */}
          {currentStep === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  Contact & Order Details
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 font-light">
                  We'll confirm table availability or hot bushel steam times via phone or email.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Miller"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-mono font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-mono font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(540) 555-0123"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono font-bold text-slate-700 mb-1">
                    Crab Size / Bushel Request or Dietary Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g. Want 1 bushel of large males + 16pc family chicken meal. Bringing friendly leashed dog to outdoor yard..."
                    value={formData.culinaryNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, culinaryNotes: e.target.value }))}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              {/* Reservation Overview Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Arrangement:</span>
                  <span className="text-red-600">{formData.seatingArea}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Date & Time:</span>
                  <span>{formData.date} at {formData.timeSlot}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Party:</span>
                  <span>{formData.partySize}</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 4: Success Confirmation */}
          {currentStep === 4 && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 border-2 border-red-500 text-red-600 mx-auto flex items-center justify-center text-2xl shadow-sm">
                🦀
              </div>

              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Reservation Request Received!
              </h4>

              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your request for <strong>{formData.partySize}</strong> on <strong>{formData.date} at {formData.timeSlot}</strong> has been sent to Lowry's Crab Shack.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-xs text-slate-800 space-y-1 text-left">
                <p><strong>Confirmation Ref:</strong> {submissionResult?.quoteId || 'RES-LOWRYS'}</p>
                <p><strong>Arrangement:</strong> {formData.seatingArea}</p>
                <p><strong>Direct Line:</strong> (540) 338-2348</p>
                <p><strong>Shack Address:</strong> 420 W Colonial Hwy, Hamilton, VA 20158</p>
              </div>

              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="rounded-full bg-red-600 text-white font-bold px-8 py-2.5 text-xs uppercase tracking-widest hover:bg-red-700 transition shadow"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {currentStep < 4 && (
          <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-5 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition active:scale-95"
              >
                ← Back
              </button>
            ) : <div />}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-full bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-2.5 text-xs uppercase tracking-wider transition active:scale-95 shadow-sm"
              >
                Continue →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-full bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-2.5 text-xs uppercase tracking-wider transition active:scale-95 shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Request'}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
