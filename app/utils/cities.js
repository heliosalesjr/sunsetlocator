// utils/cities.js
// 128 cities covering all major timezones around the world
export const cities = [
    // UTC-12 to UTC-11 (Pacific)
    { name: "Baker Island", country: "USA", lat: 0.1939, lng: -176.4769, timezone: "UTC-12" },
    { name: "Honolulu", country: "USA", lat: 21.3099, lng: -157.8581, timezone: "UTC-10" },
    { name: "Anchorage", country: "USA", lat: 61.2181, lng: -149.9003, timezone: "UTC-9" },
    
    // UTC-9 to UTC-8 (Alaska/Pacific)
    { name: "Juneau", country: "USA", lat: 58.3019, lng: -134.4197, timezone: "UTC-8" },
    { name: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437, timezone: "UTC-8" },
    { name: "San Francisco", country: "USA", lat: 37.7749, lng: -122.4194, timezone: "UTC-8" },
    { name: "Seattle", country: "USA", lat: 47.6062, lng: -122.3321, timezone: "UTC-8" },
    { name: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207, timezone: "UTC-8" },
    
    // UTC-7 (Mountain Time)
    { name: "Denver", country: "USA", lat: 39.7392, lng: -104.9903, timezone: "UTC-7" },
    { name: "Phoenix", country: "USA", lat: 33.4484, lng: -112.0740, timezone: "UTC-7" },
    { name: "Calgary", country: "Canada", lat: 51.0447, lng: -114.0719, timezone: "UTC-7" },
    { name: "Salt Lake City", country: "USA", lat: 40.7608, lng: -111.8910, timezone: "UTC-7" },
    
    // UTC-6 (Central Time)
    { name: "Chicago", country: "USA", lat: 41.8781, lng: -87.6298, timezone: "UTC-6" },
    { name: "Dallas", country: "USA", lat: 32.7767, lng: -96.7970, timezone: "UTC-6" },
    { name: "Houston", country: "USA", lat: 29.7604, lng: -95.3698, timezone: "UTC-6" },
    { name: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332, timezone: "UTC-6" },
    { name: "Winnipeg", country: "Canada", lat: 49.8951, lng: -97.1384, timezone: "UTC-6" },
    { name: "Guatemala City", country: "Guatemala", lat: 14.6349, lng: -90.5069, timezone: "UTC-6" },
    
    // UTC-5 (Eastern Time)
    { name: "New York", country: "USA", lat: 40.7128, lng: -74.0060, timezone: "UTC-5" },
    { name: "Miami", country: "USA", lat: 25.7617, lng: -80.1918, timezone: "UTC-5" },
    { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832, timezone: "UTC-5" },
    { name: "Bogota", country: "Colombia", lat: 4.7110, lng: -74.0721, timezone: "UTC-5" },
    { name: "Lima", country: "Peru", lat: -12.0464, lng: -77.0428, timezone: "UTC-5" },
    { name: "Havana", country: "Cuba", lat: 23.1136, lng: -82.3666, timezone: "UTC-5" },
    
    // UTC-4 (Atlantic Time)
    { name: "Caracas", country: "Venezuela", lat: 10.4806, lng: -66.9036, timezone: "UTC-4" },
    { name: "La Paz", country: "Bolivia", lat: -16.5000, lng: -68.1193, timezone: "UTC-4" },
    { name: "Halifax", country: "Canada", lat: 44.6488, lng: -63.5752, timezone: "UTC-4" },
    { name: "Santiago", country: "Chile", lat: -33.4489, lng: -70.6693, timezone: "UTC-4" },
    { name: "Manaus", country: "Brazil", lat: -3.1190, lng: -60.0217, timezone: "UTC-4" },
    
    // UTC-3 (South America)
    { name: "São Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333, timezone: "UTC-3" },
    { name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729, timezone: "UTC-3" },
    { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816, timezone: "UTC-3" },
    { name: "Montevideo", country: "Uruguay", lat: -34.9011, lng: -56.1645, timezone: "UTC-3" },
    { name: "Asunción", country: "Paraguay", lat: -25.2637, lng: -57.5759, timezone: "UTC-3" },
    
    // UTC-2 (Mid-Atlantic)
    { name: "Noronha", country: "Brazil", lat: -3.8536, lng: -32.4297, timezone: "UTC-2" },
    { name: "South Georgia", country: "UK Territory", lat: -54.2817, lng: -36.5081, timezone: "UTC-2" },
    
    // UTC-1 (Azores)
    { name: "Azores", country: "Portugal", lat: 37.7412, lng: -25.6756, timezone: "UTC-1" },
    { name: "Cape Verde", country: "Cape Verde", lat: 14.9177, lng: -23.5092, timezone: "UTC-1" },
    
    // UTC+0 (GMT/UTC)
    { name: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278, timezone: "UTC+0" },
    { name: "Dublin", country: "Ireland", lat: 53.3498, lng: -6.2603, timezone: "UTC+0" },
    { name: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393, timezone: "UTC+0" },
    { name: "Casablanca", country: "Morocco", lat: 33.5731, lng: -7.5898, timezone: "UTC+0" },
    { name: "Dakar", country: "Senegal", lat: 14.6928, lng: -17.4467, timezone: "UTC+0" },
    { name: "Reykjavik", country: "Iceland", lat: 64.1466, lng: -21.9426, timezone: "UTC+0" },
    
    // UTC+1 (Central Europe)
    { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522, timezone: "UTC+1" },
    { name: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050, timezone: "UTC+1" },
    { name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964, timezone: "UTC+1" },
    { name: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038, timezone: "UTC+1" },
    { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041, timezone: "UTC+1" },
    { name: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686, timezone: "UTC+1" },
    { name: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522, timezone: "UTC+1" },
    { name: "Copenhagen", country: "Denmark", lat: 55.6761, lng: 12.5683, timezone: "UTC+1" },
    { name: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738, timezone: "UTC+1" },
    { name: "Prague", country: "Czech Republic", lat: 50.0755, lng: 14.4378, timezone: "UTC+1" },
    { name: "Warsaw", country: "Poland", lat: 52.2297, lng: 21.0122, timezone: "UTC+1" },
    { name: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792, timezone: "UTC+1" },
    
    // UTC+2 (Eastern Europe/Africa)
    { name: "Helsinki", country: "Finland", lat: 60.1699, lng: 24.9384, timezone: "UTC+2" },
    { name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357, timezone: "UTC+2" },
    { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784, timezone: "UTC+2" },
    { name: "Athens", country: "Greece", lat: 37.9838, lng: 23.7275, timezone: "UTC+2" },
    { name: "Bucharest", country: "Romania", lat: 44.4268, lng: 26.1025, timezone: "UTC+2" },
    { name: "Kiev", country: "Ukraine", lat: 50.4501, lng: 30.5234, timezone: "UTC+2" },
    { name: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241, timezone: "UTC+2" },
    { name: "Johannesburg", country: "South Africa", lat: -26.2041, lng: 28.0473, timezone: "UTC+2" },
    
    // UTC+3 (East Africa/Russia)
    { name: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6176, timezone: "UTC+3" },
    { name: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219, timezone: "UTC+3" },
    { name: "Addis Ababa", country: "Ethiopia", lat: 9.1450, lng: 40.4897, timezone: "UTC+3" },
    { name: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753, timezone: "UTC+3" },
    { name: "Baghdad", country: "Iraq", lat: 33.3152, lng: 44.3661, timezone: "UTC+3" },
    { name: "Kuwait City", country: "Kuwait", lat: 29.3759, lng: 47.9774, timezone: "UTC+3" },
    
    // UTC+4 (Gulf/Caucasus)
    { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, timezone: "UTC+4" },
    { name: "Abu Dhabi", country: "UAE", lat: 24.4539, lng: 54.3773, timezone: "UTC+4" },
    { name: "Baku", country: "Azerbaijan", lat: 40.4093, lng: 49.8671, timezone: "UTC+4" },
    { name: "Tbilisi", country: "Georgia", lat: 41.7151, lng: 44.8271, timezone: "UTC+4" },
    { name: "Yerevan", country: "Armenia", lat: 40.1792, lng: 44.4991, timezone: "UTC+4" },
    
    // UTC+5 (Central Asia)
    { name: "Tashkent", country: "Uzbekistan", lat: 41.2995, lng: 69.2401, timezone: "UTC+5" },
    { name: "Almaty", country: "Kazakhstan", lat: 43.2220, lng: 76.8512, timezone: "UTC+5" },
    { name: "Karachi", country: "Pakistan", lat: 24.8607, lng: 67.0011, timezone: "UTC+5" },
    { name: "Islamabad", country: "Pakistan", lat: 33.7294, lng: 73.0931, timezone: "UTC+5" },
    
    // UTC+5:30 (India/Sri Lanka)
    { name: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777, timezone: "UTC+5:30" },
    { name: "Delhi", country: "India", lat: 28.7041, lng: 77.1025, timezone: "UTC+5:30" },
    { name: "Bangalore", country: "India", lat: 12.9716, lng: 77.5946, timezone: "UTC+5:30" },
    { name: "Chennai", country: "India", lat: 13.0827, lng: 80.2707, timezone: "UTC+5:30" },
    { name: "Kolkata", country: "India", lat: 22.5726, lng: 88.3639, timezone: "UTC+5:30" },
    { name: "Colombo", country: "Sri Lanka", lat: 6.9271, lng: 79.8612, timezone: "UTC+5:30" },
    
    // UTC+6 (Central Asia)
    { name: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125, timezone: "UTC+6" },
    { name: "Astana", country: "Kazakhstan", lat: 51.1694, lng: 71.4491, timezone: "UTC+6" },
    { name: "Bishkek", country: "Kyrgyzstan", lat: 42.8746, lng: 74.5698, timezone: "UTC+6" },
    
    // UTC+7 (Southeast Asia)
    { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018, timezone: "UTC+7" },
    { name: "Ho Chi Minh City", country: "Vietnam", lat: 10.8231, lng: 106.6297, timezone: "UTC+7" },
    { name: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456, timezone: "UTC+7" },
    { name: "Hanoi", country: "Vietnam", lat: 21.0285, lng: 105.8542, timezone: "UTC+7" },
    { name: "Phnom Penh", country: "Cambodia", lat: 11.5564, lng: 104.9282, timezone: "UTC+7" },
    
    // UTC+8 (East Asia)
    { name: "Beijing", country: "China", lat: 39.9042, lng: 116.4074, timezone: "UTC+8" },
    { name: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737, timezone: "UTC+8" },
    { name: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694, timezone: "UTC+8" },
    { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, timezone: "UTC+8" },
    { name: "Kuala Lumpur", country: "Malaysia", lat: 3.1390, lng: 101.6869, timezone: "UTC+8" },
    { name: "Manila", country: "Philippines", lat: 14.5995, lng: 120.9842, timezone: "UTC+8" },
    { name: "Taipei", country: "Taiwan", lat: 25.0330, lng: 121.5654, timezone: "UTC+8" },
    { name: "Macau", country: "China", lat: 22.1987, lng: 113.5439, timezone: "UTC+8" },
    { name: "Perth", country: "Australia", lat: -31.9505, lng: 115.8605, timezone: "UTC+8" },
    
    // UTC+9 (Japan/Korea)
    { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, timezone: "UTC+9" },
    { name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.9780, timezone: "UTC+9" },
    { name: "Osaka", country: "Japan", lat: 34.6937, lng: 135.5023, timezone: "UTC+9" },
    { name: "Pyongyang", country: "North Korea", lat: 39.0392, lng: 125.7625, timezone: "UTC+9" },
    
    // UTC+10 (Australia East)
    { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, timezone: "UTC+10" },
    { name: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631, timezone: "UTC+10" },
    { name: "Brisbane", country: "Australia", lat: -27.4698, lng: 153.0251, timezone: "UTC+10" },
    { name: "Canberra", country: "Australia", lat: -35.2809, lng: 149.1300, timezone: "UTC+10" },
    { name: "Port Moresby", country: "Papua New Guinea", lat: -9.4438, lng: 147.1803, timezone: "UTC+10" },
    
    // UTC+11 (Pacific)
    { name: "Noumea", country: "New Caledonia", lat: -22.2758, lng: 166.4581, timezone: "UTC+11" },
    { name: "Solomon Islands", country: "Solomon Islands", lat: -9.6457, lng: 160.1562, timezone: "UTC+11" },
    
    // UTC+12 (New Zealand/Pacific)
    { name: "Auckland", country: "New Zealand", lat: -36.8485, lng: 174.7633, timezone: "UTC+12" },
    { name: "Wellington", country: "New Zealand", lat: -41.2865, lng: 174.7762, timezone: "UTC+12" },
    { name: "Suva", country: "Fiji", lat: -18.1248, lng: 178.4501, timezone: "UTC+12" },
    
    // UTC+13/+14 (Pacific Islands)
    { name: "Nuku'alofa", country: "Tonga", lat: -21.1789, lng: -175.1982, timezone: "UTC+13" },
    { name: "Apia", country: "Samoa", lat: -13.8333, lng: -171.7500, timezone: "UTC+13" },
    { name: "Pago Pago", country: "American Samoa", lat: -14.2781, lng: -170.7025, timezone: "UTC-11" },
    { name: "Niue", country: "Niue", lat: -19.0544, lng: -169.8672, timezone: "UTC-11" },
    
    // UTC-9 (apenas 1 cidade na lista original)
    { name: "Fairbanks", country: "USA", lat: 64.8378, lng: -147.7164, timezone: "UTC-9" },
    { name: "Sitka", country: "USA", lat: 57.0531, lng: -135.3300, timezone: "UTC-9" },
    
    // UTC-2 (apenas 2 cidades na lista original)
    { name: "Grytviken", country: "South Georgia", lat: -54.2806, lng: -36.5078, timezone: "UTC-2" },
    { name: "Stanley", country: "Falkland Islands", lat: -51.6938, lng: -57.8597, timezone: "UTC-2" },
    
    // UTC-1 (apenas 2 cidades na lista original)
    { name: "Praia", country: "Cape Verde", lat: 14.9177, lng: -23.5092, timezone: "UTC-1" },
    { name: "Scoresbysund", country: "Greenland", lat: 70.4842, lng: -21.9756, timezone: "UTC-1" },
    
    // UTC+4 (apenas 5 cidades na lista original)
    { name: "Doha", country: "Qatar", lat: 25.2854, lng: 51.5310, timezone: "UTC+4" },
    { name: "Muscat", country: "Oman", lat: 23.5859, lng: 58.4059, timezone: "UTC+4" },
    { name: "Port Louis", country: "Mauritius", lat: -20.1619, lng: 57.5012, timezone: "UTC+4" },
    
    // UTC+5 (apenas 4 cidades na lista original)
    { name: "Dushanbe", country: "Tajikistan", lat: 38.5598, lng: 68.7870, timezone: "UTC+5" },
    { name: "Ashgabat", country: "Turkmenistan", lat: 37.9601, lng: 58.3261, timezone: "UTC+5" },
    { name: "Samarkand", country: "Uzbekistan", lat: 39.6270, lng: 66.9750, timezone: "UTC+5" },
    
    // UTC+6 (apenas 3 cidades na lista original)
    { name: "Thimphu", country: "Bhutan", lat: 27.4728, lng: 89.6390, timezone: "UTC+6" },
    { name: "Almaty", country: "Kazakhstan", lat: 43.2220, lng: 76.8512, timezone: "UTC+6" },
    { name: "Omsk", country: "Russia", lat: 54.9924, lng: 73.3686, timezone: "UTC+6" },
    
    // UTC+7 (apenas 5 cidades na lista original)
    { name: "Vientiane", country: "Laos", lat: 17.9757, lng: 102.6331, timezone: "UTC+7" },
    { name: "Yangon", country: "Myanmar", lat: 16.8661, lng: 96.1951, timezone: "UTC+7" },
    { name: "Novosibirsk", country: "Russia", lat: 55.0084, lng: 82.9357, timezone: "UTC+7" },
    
    // UTC+11 (apenas 2 cidades na lista original)
    { name: "Vladivostok", country: "Russia", lat: 43.1056, lng: 131.8735, timezone: "UTC+11" },
    { name: "Magadan", country: "Russia", lat: 59.5684, lng: 150.8048, timezone: "UTC+11" },
    { name: "Vanuatu", country: "Vanuatu", lat: -17.7334, lng: 168.3273, timezone: "UTC+11" },
    
    // UTC+13 (apenas 2 cidades na lista original)
    { name: "Kiritimati", country: "Kiribati", lat: 1.9721, lng: -157.4778, timezone: "UTC+13" },
    { name: "Chatham Islands", country: "New Zealand", lat: -43.9500, lng: -176.5500, timezone: "UTC+12:45" } // Fuso único
  ];