/**
 * Sample car data for demonstration purposes
 * In a production environment, this data would come from the backend API
 */

export const sampleCars = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    variant: 'XLE',
    year: 2023,
    price: 2500000, // Price in INR (₹25,00,000)
    bodyType: 'Sedan',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    seatingCapacity: 5,
    images: {
      thumbnail: '/images/carousel-4.png',
      gallery: [
        '/images/carousel-4.png',
        '/images/carousel-5.png',
        '/images/carousel-1.png'
      ]
    },
    engine: {
      cc: 2500,
      horsepower: 208,
      torque: 240,
      mileage: 22, // km/l
      topSpeed: 180 // km/h
    },
    dimensions: {
      length: 4885, // mm
      width: 1840, // mm
      height: 1445, // mm
      wheelbase: 2825, // mm
      groundClearance: 160, // mm
      bootSpace: 524 // liters
    },
    safety: {
      airbags: 8,
      abs: true,
      esp: true,
      hillAssist: true,
      tractionControl: true,
      ncapRating: 5 // out of 5
    },
    features: {
      sunroof: true,
      touchscreen: true,
      adas: true,
      cruiseControl: true,
      wirelessCharging: false,
      ventilatedSeats: false,
      panoramicSunroof: false
    }
  },
  {
    id: 2,
    brand: 'Honda',
    model: 'Civic',
    variant: 'Sport',
    year: 2023,
    price: 2200000, // Price in INR (₹22,00,000)
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seatingCapacity: 5,
    images: {
      thumbnail: '/images/carousel-5.png',
      gallery: [
        '/images/carousel-5.png',
        '/images/carousel-1.png',
        '/images/carousel-2.png'
      ]
    },
    engine: {
      cc: 1500,
      horsepower: 180,
      torque: 177,
      mileage: 18, // km/l
      topSpeed: 210 // km/h
    },
    dimensions: {
      length: 4674, // mm
      width: 1802, // mm
      height: 1415, // mm
      wheelbase: 2735, // mm
      groundClearance: 120, // mm
      bootSpace: 467 // liters
    },
    safety: {
      airbags: 6,
      abs: true,
      esp: true,
      hillAssist: true,
      tractionControl: true,
      ncapRating: 4 // out of 5
    },
    features: {
      sunroof: false,
      touchscreen: true,
      adas: true,
      cruiseControl: true,
      wirelessCharging: true,
      ventilatedSeats: false,
      panoramicSunroof: false
    }
  },
  {
    id: 3,
    brand: 'BMW',
    model: 'X5',
    variant: 'xDrive40i',
    year: 2023,
    price: 6500000, // Price in INR (₹65,00,000)
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seatingCapacity: 5,
    images: {
      thumbnail: '/images/carousel-1.png',
      gallery: [
        '/images/carousel-1.png',
        '/images/carousel-2.png',
        '/images/carousel-3.png'
      ]
    },
    engine: {
      cc: 3000,
      horsepower: 335,
      torque: 450,
      mileage: 12, // km/l
      topSpeed: 210 // km/h
    },
    dimensions: {
      length: 4922, // mm
      width: 2004, // mm
      height: 1775, // mm
      wheelbase: 2975, // mm
      groundClearance: 214, // mm
      bootSpace: 587 // liters
    },
    safety: {
      airbags: 6,
      abs: true,
      esp: true,
      hillAssist: true,
      tractionControl: true,
      ncapRating: 4 // out of 5
    },
    features: {
      sunroof: true,
      touchscreen: true,
      adas: true,
      cruiseControl: true,
      wirelessCharging: false,
      ventilatedSeats: true,
      panoramicSunroof: true
    }
  },
  {
    id: 4,
    brand: 'Mercedes-Benz',
    model: 'C-Class',
    variant: 'C 300',
    year: 2023,
    price: 4500000, // Price in INR (₹45,00,000)
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seatingCapacity: 5,
    images: {
      thumbnail: '/images/carousel-5.png',
      gallery: [
        '/images/carousel-5.png',
        '/images/carousel-1.png'
      ]
    },
    engine: {
      cc: 2000,
      horsepower: 255,
      torque: 370,
      mileage: 16, // km/l
      topSpeed: 240 // km/h
    }
  },
  {
    id: 5,
    brand: 'Audi',
    model: 'Q5',
    variant: 'Premium',
    year: 2023,
    price: 4800000, // Price in INR (₹48,00,000)
    bodyType: 'SUV',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seatingCapacity: 5,
    images: {
      thumbnail: '/images/carousel-2.png',
      gallery: [
        '/images/carousel-2.png',
        '/images/carousel-3.png'
      ]
    },
    engine: {
      cc: 2000,
      horsepower: 261,
      torque: 370,
      mileage: 14, // km/l
      topSpeed: 200 // km/h
    }
  },
  {
    id: 6,
    brand: 'Toyota',
    model: 'Prius',
    variant: 'XLE',
    year: 2023,
    price: 2700000, // Price in INR (₹27,00,000)
    bodyType: 'Hatchback',
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    seatingCapacity: 5,
    images: {
      thumbnail: '/images/carousel-2.png',
      gallery: [
        '/images/carousel-2.png',
        '/images/carousel-3.png'
      ]
    },
    engine: {
      cc: 1800,
      horsepower: 121,
      torque: 105,
      mileage: 28, // km/l
      topSpeed: 165 // km/h
    }
  },
  {
    id: 7,
    brand: 'Hyundai',
    model: 'Kona Electric',
    variant: 'Limited',
    year: 2023,
    price: 3800000, // Price in INR (₹38,00,000)
    bodyType: 'SUV',
    fuelType: 'Electric',
    transmission: 'Automatic',
    seatingCapacity: 5,
    images: {
      thumbnail: '/images/carousel-5.png',
      gallery: [
        '/images/carousel-5.png',
        '/images/carousel-1.png'
      ]
    },
    engine: {
      // Electric vehicle specifications
      horsepower: 201,
      torque: 291,
      mileage: 258, // km per charge (WLTP)
      topSpeed: 155 // km/h
    }
  },
  {
    id: 8,
    brand: 'Tata Motors',
    model: 'Nexon EV',
    variant: 'XZ+',
    year: 2023,
    price: 1600000, // Price in INR (₹16,00,000)
    bodyType: 'SUV',
    fuelType: 'Electric',
    transmission: 'Automatic',
    seatingCapacity: 5,
    images: {
      thumbnail: '/images/carousel-4.png',
      gallery: [
        '/images/carousel-4.png',
        '/images/carousel-5.png'
      ]
    },
    engine: {
      // Electric vehicle specifications
      horsepower: 127,
      torque: 245,
      mileage: 312, // km per charge (ARAI)
      topSpeed: 120 // km/h
    }
  }
];

export default sampleCars;