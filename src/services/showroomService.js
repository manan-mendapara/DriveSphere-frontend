const showrooms = [
  { id: 'ahm-1', name: 'DriveSphere Premium Motors', city: 'Ahmedabad', address: 'SG Highway, Ahmedabad, Gujarat', distance: '2.5 km', contact: '+91 79 4000 1000', openNow: true },
  { id: 'ahm-2', name: 'City Auto Gallery', city: 'Ahmedabad', address: 'Prahlad Nagar, Ahmedabad, Gujarat', distance: '4.1 km', contact: '+91 79 4000 2000', openNow: true },
  { id: 'ahm-3', name: 'Westside Car Studio', city: 'Ahmedabad', address: 'Satellite, Ahmedabad, Gujarat', distance: '6.3 km', contact: '+91 79 4000 3000', openNow: false },
  { id: 'raj-1', name: 'Rajkot Auto Hub', city: 'Rajkot', address: 'Kalawad Road, Rajkot, Gujarat', distance: '3.2 km', contact: '+91 281 400 1000', openNow: true },
  { id: 'sur-1', name: 'Surat Motor Gallery', city: 'Surat', address: 'Dumas Road, Surat, Gujarat', distance: '3.8 km', contact: '+91 261 400 2000', openNow: true },
];
const showroomService = {
  searchShowrooms: async (params = {}) => {
    const query = String(params.location || params.city || '').trim().toLowerCase();
    return showrooms.filter((showroom) => !query || `${showroom.city} ${showroom.address} ${showroom.name}`.toLowerCase().includes(query));
  },
  getShowroomById: async (id) => showrooms.find((showroom) => String(showroom.id) === String(id)) ?? null,
  getAllShowrooms: async () => [...showrooms],
};
export default showroomService;
