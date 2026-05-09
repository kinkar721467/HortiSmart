import { 
  LayoutDashboard, IndianRupee, ShoppingBag, 
  MapPin, PackagePlus, Bell, Settings, LogOut,
  TrendingUp, Database, ArrowUpRight, Users
} from 'lucide-react';

export const sidebarData = {
  user: {
    name: 'Guest User',
    role: 'Farmer',
    initials: 'DU'
  },
  menuItems: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Crop Prices', icon: IndianRupee, path: '/prices' },
    { name: 'Marketplace', icon: ShoppingBag, path: '/marketplace' },
    { name: 'Storage Finder', icon: MapPin, path: '/storage-finder' },
    { name: 'Value Addition', icon: PackagePlus, path: '/value-addition' },
    { name: 'Notifications', icon: Bell, badge: 2, path: '/notifications' },
  ],
  bottomItems: [
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Logout', icon: LogOut, path: '/' },
  ]
};

export const buyerMenuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/buyer-dashboard' },
  { name: 'Browse Crops', icon: ShoppingBag, path: '/buyer/marketplace' },
  { name: 'My Orders', icon: PackagePlus, path: '/buyer/orders' },
  { name: 'Saved Farmers', icon: Users, path: '/buyer/farmers' },
  { name: 'Market Trends', icon: TrendingUp, path: '/buyer/trends' },
];

export const adminMenuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin-dashboard' },
  { name: 'User Management', icon: Users, path: '/admin/users' },
  { name: 'Transactions', icon: IndianRupee, path: '/admin/transactions' },
  { name: 'System Logs', icon: Database, path: '/admin/logs' },
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
];

export const buyerStats = [
  {
    title: "Active Orders",
    value: "14",
    subtitle: "In transit",
    trend: "↑ 2",
    trendLabel: "from yesterday",
    icon: PackagePlus,
    iconBgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    title: "Total Spent",
    value: "₹4.2L",
    subtitle: "This month",
    trend: "↓ 5%",
    trendLabel: "vs last month",
    icon: IndianRupee,
    iconBgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    title: "Saved Farmers",
    value: "28",
    subtitle: "Verified contacts",
    trend: "↑ 4",
    trendLabel: "new this week",
    icon: Users,
    iconBgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    title: "Market Deals",
    value: "12",
    subtitle: "Price drops today",
    trendLabel: "View deals",
    icon: TrendingUp,
    iconBgColor: "bg-orange-50",
    iconColor: "text-orange-500"
  }
];

export const adminStats = [
  {
    title: "Total Users",
    value: "12,450",
    subtitle: "Active accounts",
    trend: "↑ 12%",
    trendLabel: "this month",
    icon: Users,
    iconBgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    title: "Platform Revenue",
    value: "₹8.5L",
    subtitle: "This month",
    trend: "↑ 18%",
    trendLabel: "vs last month",
    icon: IndianRupee,
    iconBgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    title: "Total Transactions",
    value: "3,240",
    subtitle: "Successful trades",
    trend: "↑ 5%",
    trendLabel: "this week",
    icon: ShoppingBag,
    iconBgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    title: "System Health",
    value: "99.9%",
    subtitle: "Uptime",
    trendLabel: "All systems operational",
    icon: Database,
    iconBgColor: "bg-gray-50",
    iconColor: "text-gray-600"
  }
];

export const dashboardStats = [
  {
    title: "Today's Best Price",
    value: "₹38/kg",
    subtitle: "Tomato - Delhi",
    trend: "↑ 12%",
    trendLabel: "from last week",
    icon: TrendingUp,
    iconBgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    title: "Active Listings",
    value: "8",
    subtitle: "Products",
    trend: "124 views",
    trendLabel: "this week",
    icon: ShoppingBag,
    iconBgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    title: "Buyer Inquiries",
    value: "12",
    subtitle: "New requests",
    trend: "↑ 3",
    trendLabel: "new today",
    icon: ArrowUpRight,
    iconBgColor: "bg-orange-50",
    iconColor: "text-orange-500"
  },
  {
    title: "Storage Available",
    value: "75%",
    subtitle: "Priority facilities",
    trendLabel: "View storages",
    icon: Database,
    iconBgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  }
];

export const cropPricesData = [
  { name: 'Tomato', location: 'Delhi', price: '₹38/kg', trend: '+12%', isUp: true },
  { name: 'Potato', location: 'Mumbai', price: '₹22/kg', trend: '-2%', isUp: false },
  { name: 'Onion', location: 'Pune', price: '₹28/kg', trend: '+5%', isUp: true },
  { name: 'Cabbage', location: 'Bangalore', price: '₹15/kg', trend: '-1%', isUp: false },
];

export const buyerInquiriesData = [
  { name: 'Reliance Fresh', details: 'Tomatoes - 500 kg', time: '2 hours ago', avatar: 'R', color: 'bg-green-100 text-green-700' },
  { name: 'BigBasket', details: 'Potatoes - 1000 kg', time: '5 hours ago', avatar: 'B', color: 'bg-blue-100 text-blue-700' },
  { name: 'Metro Cash', details: 'Onions - 250 kg', time: '1 day ago', avatar: 'M', color: 'bg-purple-100 text-purple-700' },
];

export const weatherData = {
  temp: "28°C",
  condition: "Partly Cloudy",
  humidity: "65%",
  windSpeed: "12 km/h",
  rainfall: "10%"
};

export const allMarketPrices = [
  { crop: 'Tomato', market: 'Delhi - Azadpur Mandi', state: 'Delhi', minPrice: '₹32', maxPrice: '₹42', avgPrice: '₹38', trend: '+12%', isUp: true },
  { crop: 'Potato', market: 'Mumbai - Vashi APMC', state: 'Maharashtra', minPrice: '₹15', maxPrice: '₹25', avgPrice: '₹22', trend: '-5%', isUp: false },
  { crop: 'Onion', market: 'Pune - Marketyard', state: 'Maharashtra', minPrice: '₹21', maxPrice: '₹31', avgPrice: '₹28', trend: '+8%', isUp: true },
  { crop: 'Cabbage', market: 'Bangalore - KR Market', state: 'Karnataka', minPrice: '₹14', maxPrice: '₹22', avgPrice: '₹18', trend: '+3%', isUp: true },
  { crop: 'Carrot', market: 'Chandigarh - Sector 26', state: 'Chandigarh', minPrice: '₹20', maxPrice: '₹30', avgPrice: '₹25', trend: '+6%', isUp: true },
  { crop: 'Cauliflower', market: 'Jaipur - Muhana Mandi', state: 'Rajasthan', minPrice: '₹15', maxPrice: '₹25', avgPrice: '₹20', trend: '-2%', isUp: false },
  { crop: 'Spinach', market: 'Lucknow - Dubagga', state: 'Uttar Pradesh', minPrice: '₹12', maxPrice: '₹18', avgPrice: '₹15', trend: '+4%', isUp: true },
  { crop: 'Cucumber', market: 'Hyderabad - Bowenpally', state: 'Telangana', minPrice: '₹15', maxPrice: '₹25', avgPrice: '₹20', trend: '+7%', isUp: true },
];

export const storageFacilities = [
  { name: 'Green Valley Cold Storage', location: 'Sector 12, Noida, Uttar Pradesh • 5 km', rating: 4.8, reviews: 104, capacity: '1000 MT', available: '750 MT', price: '₹25/MT/day', tags: ['Temperature Control', 'Humidity Control', '24/7 Security', '+1 more'], availability: 'High Availability', availColor: 'text-green-600 bg-green-50 border-green-200' },
  { name: 'FreshKeep Storage Solutions', location: 'Khanna, Punjab • 12 km', rating: 4.5, reviews: 89, capacity: '1500 MT', available: '200 MT', price: '₹22/MT/day', tags: ['Multi-Chamber', 'Loading Bay', 'Insurance Available', '+1 more'], availability: 'Low Availability', availColor: 'text-red-600 bg-red-50 border-red-200' },
  { name: 'Agri-Cool Storage', location: 'Faridabad, Haryana • 15 km', rating: 4.9, reviews: 201, capacity: '800 MT', available: '400 MT', price: '₹30/MT/day', tags: ['Eco-Friendly', 'Quick Unload', 'Pest Control', '+1 more'], availability: 'High Availability', availColor: 'text-green-600 bg-green-50 border-green-200' },
  { name: 'Polar Storage Pvt Ltd', location: 'Gurugram, HR • 22 km', rating: 4.7, reviews: 145, capacity: '2000 MT', available: '1000 MT', price: '₹28/MT/day', tags: ['Bulk Storage', 'Cold Chain', 'Transport', '+2 more'], availability: 'Medium Availability', availColor: 'text-orange-600 bg-orange-50 border-orange-200' }
];

export const marketplaceProducts = [
  { name: 'Fresh Tomatoes', desc: 'Premium quality red tomatoes, freshly harvested', seller: 'Rajesh Kumar • Punjab', rating: 4.8, category: 'Vegetables', price: '₹35', unit: '/kg', available: '500 kg available', icon: '🍅' },
  { name: 'Organic Potatoes', desc: 'Organic certified potatoes, perfect for all cooking', seller: 'Priya Patel • Gujarat', rating: 4.9, category: 'Vegetables', price: '₹22', unit: '/kg', available: '1000 kg available', icon: '🥔' },
  { name: 'Fresh Onions', desc: 'High-quality onions with good shelf life', seller: 'Suresh Reddy • Telangana', rating: 4.7, category: 'Vegetables', price: '₹28', unit: '/kg', available: '750 kg available', icon: '🧅' },
  { name: 'Green Cabbage', desc: 'Fresh green cabbage, no outer leaves and cooking', seller: 'Amit Singh • Haryana', rating: 4.5, category: 'Vegetables', price: '₹18', unit: '/kg', available: '300 kg available', icon: '🥬' },
];

export const valueAdditionCrops = [
  { name: 'Tomato', count: '5 products', icon: '🍅' },
  { name: 'Mango', count: '4 products', icon: '🥭' },
  { name: 'Potato', count: '6 products', icon: '🥔' },
  { name: 'Onion', count: '3 products', icon: '🧅' },
  { name: 'Spinach', count: '2 products', icon: '🥬' },
];

