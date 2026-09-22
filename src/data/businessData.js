export const BUSINESS_INFO = {
  name: "Lowry's Crab Shack",
  legalName: "Lowry's Crab Shack LLC",
  tagline: "Fresh Chesapeake Bay Steamed Blue Crabs, Oysters & 4x Voted #1 Fried Chicken",
  locationName: "Hamilton Historic Route",
  address: {
    street: "420 W Colonial Highway",
    suite: "Ste A",
    city: "Hamilton",
    state: "VA",
    zip: "20158",
    country: "United States",
    formatted: "420 W Colonial Hwy, Hamilton, VA 20158",
  },
  phone: "(540) 338-2348",
  secondaryPhone: "(540) 338-2348",
  conciergePhone: "(540) 338-2348",
  website: "https://www.lowryscrabshack.com",
  email: "lowryscrabshack@verizon.net",
  onlineOrderingUrl: "https://microsite.talech.com/ordering/Lowry-s-Crab-Shack-Hamilton-VA/566610",
  googleMapsLink: "https://maps.google.com/?q=Lowry's+Crab+Shack+420+W+Colonial+Hwy+Hamilton+VA+20158",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3088.7554902148967!2d-77.67479292358897!3d39.13659987167575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b617b07c244799%3A0xe54d2e5a40a5a4fa!2sLowry&#39;s%20Crab%20Shack!5e0!3m2!1sen!2sus!4v1716382918291!5m2!1sen!2sus",
  
  hours: [
    { day: "Monday", open: "Closed", close: "Closed", note: "Family Rest & Fresh Fleet Sourcing" },
    { day: "Tuesday", open: "Closed", close: "Closed", note: "Prep & Fresh Catch Sourcing" },
    { day: "Wednesday", open: "4:00 PM", close: "8:00 PM", note: "Dinner & Steamed Crab Feast" },
    { day: "Thursday", open: "4:00 PM", close: "8:00 PM", note: "Dinner, Crabs & Fried Chicken" },
    { day: "Friday", open: "4:00 PM", close: "8:00 PM", note: "Weekend Kickoff & Steamer Baskets" },
    { day: "Saturday", open: "12:00 PM", close: "8:00 PM", note: "All-Day Crab Feasts & Outdoor Patio" },
    { day: "Sunday", open: "12:00 PM", close: "8:00 PM", note: "Family Seafood Sunday & Smith Island Cakes" },
  ],

  history: [
    {
      year: "1970s",
      title: "Rudy Williams' Seafood Truck",
      description: "Leslie's father Rudy Williams, a double amputee with boundless heart, sold fresh seafood and farm vegetables in Hamilton right from his truck."
    },
    {
      year: "1998",
      title: "Lowry's Farm Market",
      description: "Leslie left her 17-year legal court career to start the farm market. In March 1999, Rudy joined her to sell fresh seafood, flowers, and produce together."
    },
    {
      year: "2007",
      title: "Lowry's Crab Shack Is Born",
      description: "On September 22, 2007, Donald and Leslie founded the permanent Crab Shack to create fulfilling employment for their special-needs son Marshall and keep Rudy's legacy alive."
    },
    {
      year: "Today",
      title: "Loudoun County's #1 Seafood & Chicken Icon",
      description: "Voted #1 Fried Chicken 4 years in a row (2021-2024) by Loudoun Times-Mirror, celebrated for live Chesapeake Bay blue crabs, homemade sides, and family hospitality."
    }
  ],

  executiveChef: {
    name: "Donald & Leslie Lowry",
    role: "Founders & Pitmasters",
    quote: "We carry on my dad Rudy's legacy with every bushel of crabs we steam and every piece of chicken we fry. From our special needs son Marshall welcoming folks to our dog-friendly picnic tables, Lowry's is more than a seafood shack—it's a family home where everyone is welcome.",
    credentials: "Founders Since 2007 • 4-Year #1 Fried Chicken Champion • Loudoun County Culinary Heritage"
  },

  reviews: [
    {
      author: "Robert T.",
      location: "Purcellville, VA",
      source: "Verified Google Review",
      rating: 5,
      date: "2 weeks ago",
      comment: "Hands down the best steamed blue crabs anywhere in Northern Virginia. Heavily seasoned, hot, sweet, and meaty. Don't sleep on the fried chicken either—it won #1 in Loudoun for a reason. Super friendly owners and great outdoor picnic vibes!"
    },
    {
      author: "Sarah M.",
      location: "Leesburg, VA",
      source: "Loudoun Times-Mirror Reader",
      rating: 5,
      date: "1 month ago",
      comment: "Donald & Leslie treat you like family the second you step up. The fried chicken is crispy perfection with zero grease, the hush puppies with honey butter are addictive, and their Smith Island Cake is straight from Maryland heaven. A true Virginia treasure."
    },
    {
      author: "David K.",
      location: "Washington, DC",
      source: "Verified Trip Customer",
      rating: 5,
      date: "3 weeks ago",
      comment: "Drove out from DC specifically for Chesapeake blue crabs and was blown away. Fresh, piping hot, and full of flavor. The outdoor seating with pet water bowls and motorcycle parking was fantastic on a sunny Saturday afternoon."
    },
    {
      author: "Jennifer P.",
      location: "Hamilton, VA",
      source: "Local Regular",
      rating: 5,
      date: "Recent Review",
      comment: "We've been coming here since 2007. Marshall and the whole Lowry family are staples of our town. The jumbo lump crab cakes and spiced shrimp baskets are consistently top-notch. Call ahead for carryout or enjoy a beer on the patio!"
    }
  ]
};

export const isOpenNow = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const time = hour + minutes / 60;

  // Monday (1) & Tuesday (2) Closed
  if (day === 1 || day === 2) {
    return false;
  }
  // Wednesday, Thursday, Friday: 16:00 - 20:00 (4 PM - 8 PM)
  if (day >= 3 && day <= 5) {
    return time >= 16 && time < 20;
  }
  // Saturday (6) & Sunday (0): 12:00 - 20:00 (12 PM - 8 PM)
  return time >= 12 && time < 20;
};
