import React from 'react';

export const dummyData1 = [
  // Services
  {
    id: '1',
    username: 'premiumRides',
    title: 'Luxury Chauffeur Service',
    description: 'Experience unparalleled comfort and professionalism with our luxury chauffeur service. Perfect for business meetings, weddings, or any special occasion. Our fleet includes top-of-the-line vehicles and professional drivers who prioritize safety and punctuality.',
    option2: require('../../assets/services/luxury_driver/Personal-driver-2.jpg'),
    video: require('../../assets/services/luxury_driver/about-chauffeur.jpg'),
    option1: require('../../assets/services/luxury_driver/chauffeurservice.png'),
    likes: '999',
    comments: '1.8K',
    shares: '1.2K',
    userImage: require('../../assets/services/luxury_driver/chauffeurservice.png'),
    serviceType: 'VIP',
    car: 'Tesla Model S',
    price: 25000.0,
    rating: 4.9,
    trips: '3.5K trips',
    type: 'intangible',
    isPosted: true,
    availability: "Available", 
    selling_price: {
      options: [
        {
          type: 'basic',
          duration: '1 hour',
          price: 25000,
          features: [
            'One-on-one consultation',
            'Basic service package',
            'Email support'
          ]
        },
        {
          type: 'premium',
          duration: '5 hours',
          price: 100000,
          savings: '20%',
          features: [
            'Priority consultation',
            'Advanced service package',
            '24/7 phone support',
            'Progress tracking'
          ]
        },
        {
          type: 'enterprise',
          duration: 'custom',
          price: 200000,
          savings: '35%',
          features: [
            'VIP consultation',
            'Complete service suite',
            'Dedicated account manager',
            'Custom solutions',
            'Monthly review sessions'
          ]
        }
      ],
      threshold: {
        duration: '10 hours',
        message: 'For extended service requirements, we offer customized enterprise packages tailored to your needs.'
      }
    },
    locations: [
      {
        id: '1',
        name: 'Yaoundé',
        address: 'Centre commercial, Quartier Central',
        coordinates: {
          latitude: 3.8667,
          longitude: 11.5167
        },
        openHours: '8:00 AM - 8:00 PM',
        contact: '+237 123456789',
        features: [
          'Large Parking Space',
          'Air Conditioned',
          'Security Service 24/7'
        ]
      },
    ],
    generalInfo: {
      title: 'Our Retail Locations',
      subtitle: 'Find the nearest store to you',
      description: 'Visit any of our locations to experience our products firsthand. Our trained staff is ready to assist you.',
      note: 'All locations offer product testing and return services'
    },
    sellingPoints: ['SP1', 'SP2'],
    deliveryOptions: ['DO1', 'DO2']
  },
  {
    id: '2',
    username: 'techZone',
    title: 'Smartphone: Galaxy S22',
    description: 'The Galaxy S22 combines cutting-edge technology with sleek design. Featuring a powerful processor, stunning display, and an advanced camera system, it’s perfect for both work and play.',
    video: require('../../assets/products/samsung1/samsung.jpeg'),
    option1: require('../../assets/products/samsung1/samsung-galaxy-s22-5g.jpg'),
    option2: require('../../assets/products/samsung1/samsung-galaxy.jpg'),
    likes: '1999999',
    comments: '1.3K',
    shares: '870',
    userImage: require('../../assets/products/samsung2/hq720.jpg'),
    price: 899.99,
    quantity: 200,
    rating: 4.8,
    trips: 'All colors',
    type: 'tangible',
    isPosted: true,
    stock: '150',
    delivery_options: {
      locations: [
        {
          type: 'pickup',
          name: 'Collect at selling point',
          cost: 0,
          currency: 'FCFA',
          negotiable: false,
          address: 'Shop location address',
          available_hours: '8:00 AM - 6:00 PM',
          notes: 'Bring a valid ID for collection'
        },
        {
          type: 'in_town',
          name: 'In town delivery',
          cost: 2000,
          currency: 'FCFA',
          negotiable: true,
          available_towns: ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam'],
          estimated_time: '1-2 days',
          notes: 'Price may vary based on specific location within the town'
        },
        {
          type: 'out_of_town',
          name: 'Out of town delivery',
          cost: 5000,
          currency: 'FCFA',
          negotiable: true,
          estimated_time: '2-5 days',
          notes: 'Additional fees may apply based on distance'
        },
        {
          type: 'custom',
          name: 'Other locations',
          negotiable: true,
          contact_info: {
            phone: '+237 123456789',
            whatsapp: '+237 123456789',
            email: 'merchant@email.com'
          },
          notes: 'Contact merchant for custom delivery arrangements'
        }
      ],
      default_currency: 'FCFA',
      general_notes: 'All deliveries are insured. Tracking number will be provided after shipping.'
    },
    selling_price: {
      options: [
        {
          type: 'detail',
          quantity_range: '1-5',
          unit: 'pieces',
          price_per_unit: 15000,
          features: ['Standard shipping', 'Basic warranty'],
          minimum_order: 1,
          maximum_order: 5
        },
        {
          type: 'semi_Whole',
          quantity_range: '6-20',
          unit: 'pieces',
          price_per_unit: 12000,
          discount: 20,
          features: ['Free shipping', 'Extended warranty'],
          minimum_order: 6,
          maximum_order: 20
        },
        {
          type: 'Wholesale',
          quantity_range: '21+',
          unit: 'pieces',
          price_per_unit: 9000,
          discount: 40,
          features: ['Priority shipping', 'Premium support', 'Wholesale packaging'],
          minimum_order: 21, 
          maximum_order: 50
        }
      ],
      threshold: {
        quantity: 50,
        unit: 'pieces',
        message: 'For orders above 50 pieces, contact us for special enterprise pricing and customized shipping options.'
      }
    },
    locations: [
      {
        id: '1',
        name: 'Yaoundé',
        address: 'Centre commercial, Quartier Central',
        coordinates: {
          latitude: 3.8667,
          longitude: 11.5167
        },
        openHours: '8:00 AM - 8:00 PM',
        contact: '+237 123456789',
        features: [
          'Large Parking Space',
          'Air Conditioned',
          'Security Service 24/7'
        ]
      },
      {
        id: '2',
        name: 'Obala',
        address: 'Mimbo Market Area, Main Street',
        coordinates: {
          latitude: 4.1667,
          longitude: 11.5333
        },
        openHours: '7:00 AM - 6:00 PM',
        contact: '+237 987654321',
        features: [
          'Local Products Section',
          'Fresh Food Market',
          'Easy Access'
        ]
      },
      {
        id: '3',
        name: 'Marché Central',
        address: 'Central Market District',
        coordinates: {
          latitude: 3.8580,
          longitude: 11.5236
        },
        openHours: '6:00 AM - 7:00 PM',
        contact: '+237 456789123',
        features: [
          'Wholesale Options',
          'Traditional Market',
          'Public Transport Hub'
        ]
      }
    ],
    generalInfo: {
      title: 'Our Retail Locations',
      subtitle: 'Find the nearest store to you',
      description: 'Visit any of our locations to experience our products firsthand. Our trained staff is ready to assist you.',
      note: 'All locations offer product testing and return services'
    },
    sellingPoints: ['SP8', 'SP9'],
    deliveryOptions: ['DO8', 'DO9']
  },

  {
    id: '3',
    username: 'cityTourExperts',
    title: 'City Walking Tours',
    description: 'Join our guided city walking tours to explore the history, culture, and vibrant life of the city. Our knowledgeable guides will take you to iconic landmarks, hidden gems, and bustling markets.',
    video: require('../../assets/services/city_walking/Milo-rotated.jpg'),
    option1: require('../../assets/services/city_walking/Curiocity_Joburg.jpeg'),
    option2: require('../../assets/services/city_walking/Cape-Town-free.jpg'),
    likes: '35200',
    comments: '980',
    shares: '450',
    userImage: require('../../assets/services/city_walking/Milo-rotated.jpg'),
    serviceType: 'Classic',
    price: 40.0,
    rating: 4.8,
    trips: '2.3K trips',
    type: 'intangible',
    isPosted: true,
    availability: "Available", 
    selling_price: {
      options: [
        {
          type: 'basic',
          duration: '1 hour',
          price: 25000,
          features: [
            'One-on-one consultation',
            'Basic service package',
            'Email support'
          ]
        },
        {
          type: 'premium',
          duration: '5 hours',
          price: 100000,
          savings: '20%',
          features: [
            'Priority consultation',
            'Advanced service package',
            '24/7 phone support',
            'Progress tracking'
          ]
        },
        {
          type: 'enterprise',
          duration: 'custom',
          price: 200000,
          savings: '35%',
          features: [
            'VIP consultation',
            'Complete service suite',
            'Dedicated account manager',
            'Custom solutions',
            'Monthly review sessions'
          ]
        }
      ],
      threshold: {
        duration: '10 hours',
        message: 'For extended service requirements, we offer customized enterprise packages tailored to your needs.'
      }
    },
    locations: [
      {
        id: '1',
        name: 'Obala',
        address: 'Mimbo Market Area, Main Street',
        coordinates: {
          latitude: 4.1667,
          longitude: 11.5333
        },
        openHours: '7:00 AM - 6:00 PM',
        contact: '+237 987654321',
        features: [
          'Local Products Section',
          'Fresh Food Market',
          'Easy Access'
        ]
      },
      {
        id: '2',
        name: 'Marché Central',
        address: 'Central Market District',
        coordinates: {
          latitude: 3.8580,
          longitude: 11.5236
        },
        openHours: '6:00 AM - 7:00 PM',
        contact: '+237 456789123',
        features: [
          'Wholesale Options',
          'Traditional Market',
          'Public Transport Hub'
        ]
      }
    ],
    generalInfo: {
      title: 'Our Retail Locations',
      subtitle: 'Find the nearest store to you',
      description: 'Visit any of our locations to experience our products firsthand. Our trained staff is ready to assist you.',
      note: 'All locations offer product testing and return services'
    },
    sellingPoints: ['SP4', 'SP5'],
    deliveryOptions: ['DO4', 'DO5']
  },
  {
    id: '4',
    username: 'fashionHub',
    title: 'Leather Jacket',
    description: 'Stylish and durable, this leather jacket adds a touch of sophistication to your wardrobe. Perfect for casual or formal occasions.',
    video: require('../../assets/products/jacket/1.jpg'),
    option1: require('../../assets/products/jacket/2.jpg'),
    option2: require('../../assets/products/jacket/3.jpg'),
    likes: '60',
    comments: '1.0K',
    shares: '600',
    userImage: require('../../assets/products/jacket/3.jpg'),
    price: 250.0,
    quantity: 70,
    rating: 4.8,
    trips: 'All sizes',
    size: 'Medium',
    type: 'tangible',
    isPosted: false,
    stock: '200',
    delivery_options: {
      locations: [
        {
          type: 'pickup',
          name: 'Collect at selling point',
          cost: 0,
          currency: 'FCFA',
          negotiable: false,
          address: 'Shop location address',
          available_hours: '8:00 AM - 6:00 PM',
          notes: 'Bring a valid ID for collection'
        },
        {
          type: 'in_town',
          name: 'In town delivery',
          cost: 2000,
          currency: 'FCFA',
          negotiable: true,
          available_towns: ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam'],
          estimated_time: '1-2 days',
          notes: 'Price may vary based on specific location within the town'
        },
        {
          type: 'out_of_town',
          name: 'Out of town delivery',
          cost: 5000,
          currency: 'FCFA',
          negotiable: true,
          estimated_time: '2-5 days',
          notes: 'Additional fees may apply based on distance'
        },
        {
          type: 'custom',
          name: 'Other locations',
          negotiable: true,
          contact_info: {
            phone: '+237 123456789',
            whatsapp: '+237 123456789',
            email: 'merchant@email.com'
          },
          notes: 'Contact merchant for custom delivery arrangements'
        }
      ],
      default_currency: 'FCFA',
      general_notes: 'All deliveries are insured. Tracking number will be provided after shipping.'
    },
    selling_price: {
      options: [
        {
          type: 'detail',
          quantity_range: '1-5',
          unit: 'pieces',
          price_per_unit: 15000,
          features: ['Standard shipping', 'Basic warranty'],
          minimum_order: 1,
          maximum_order: 5
        },
        {
          type: 'semi_Whole',
          quantity_range: '6-20',
          unit: 'pieces',
          price_per_unit: 12000,
          discount: 20,
          features: ['Free shipping', 'Extended warranty'],
          minimum_order: 6,
          maximum_order: 20
        },
        {
          type: 'Wholesale',
          quantity_range: '21+',
          unit: 'pieces',
          price_per_unit: 9000,
          discount: 40,
          features: ['Priority shipping', 'Premium support', 'Wholesale packaging'],
          minimum_order: 21,
          maximum_order: 50
        }
      ],
      threshold: {
        quantity: 50,
        unit: 'pieces',
        message: 'For orders above 50 pieces, contact us for special enterprise pricing and customized shipping options.'
      }
    },
    locations: [
      {
        id: '1',
        name: 'Yaoundé',
        address: 'Centre commercial, Quartier Central',
        coordinates: {
          latitude: 3.8667,
          longitude: 11.5167
        },
        openHours: '8:00 AM - 8:00 PM',
        contact: '+237 123456789',
        features: [
          'Large Parking Space',
          'Air Conditioned',
          'Security Service 24/7'
        ]
      },
      {
        id: '2',
        name: 'Obala',
        address: 'Mimbo Market Area, Main Street',
        coordinates: {
          latitude: 4.1667,
          longitude: 11.5333
        },
        openHours: '7:00 AM - 6:00 PM',
        contact: '+237 987654321',
        features: [
          'Local Products Section',
          'Fresh Food Market',
          'Easy Access'
        ]
      },
      {
        id: '3',
        name: 'Marché Central',
        address: 'Central Market District',
        coordinates: {
          latitude: 3.8580,
          longitude: 11.5236
        },
        openHours: '6:00 AM - 7:00 PM',
        contact: '+237 456789123',
        features: [
          'Wholesale Options',
          'Traditional Market',
          'Public Transport Hub'
        ]
      }
    ],
    generalInfo: {
      title: 'Our Retail Locations',
      subtitle: 'Find the nearest store to you',
      description: 'Visit any of our locations to experience our products firsthand. Our trained staff is ready to assist you.',
      note: 'All locations offer product testing and return services'
    },
    sellingPoints: ['SP11'],
    deliveryOptions: ['DO11']
  },
  
  {
    id: '5',
    username: 'petCarePros',
    title: 'Pet Sitting Services',
    description: 'Our trusted pet sitting services ensure your furry friends are well cared for while you’re away. From feeding and walking to playtime and medication administration, we cater to all your pet’s needs.',
    video: require('../../assets/services/pet_sitting/South.jpg'),
    option1: require('../../assets/services/pet_sitting/african-american.jpeg'),
    option2: require('../../assets/services/pet_sitting/pet-sit.jpg'),
    likes: '3000',
    comments: '500',
    shares: '310',
    userImage: require('../../assets/services/pet_sitting/african-american.jpeg'),
    serviceType: 'Specialized',
    price: 30.0,
    rating: 4.8,
    trips: '500 trips',
    type: 'intangible',
    isPosted: false,
    availability: "Not Available",
    selling_price: {
      options: [
        {
          type: 'basic',
          duration: '1 hour',
          price: 25000,
          features: [
            'One-on-one consultation',
            'Basic service package',
            'Email support'
          ]
        },
        {
          type: 'premium',
          duration: '5 hours',
          price: 100000,
          savings: '20%',
          features: [
            'Priority consultation',
            'Advanced service package',
            '24/7 phone support',
            'Progress tracking'
          ]
        },
        {
          type: 'enterprise',
          duration: 'custom',
          price: 200000,
          savings: '35%',
          features: [
            'VIP consultation',
            'Complete service suite',
            'Dedicated account manager',
            'Custom solutions',
            'Monthly review sessions'
          ]
        }
      ],
      threshold: {
        duration: '10 hours',
        message: 'For extended service requirements, we offer customized enterprise packages tailored to your needs.'
      }
    },
    locations: [
      {
        id: '1',
        name: 'Yaoundé',
        address: 'Centre commercial, Quartier Central',
        coordinates: {
          latitude: 3.8667,
          longitude: 11.5167
        },
        openHours: '8:00 AM - 8:00 PM',
        contact: '+237 123456789',
        features: [
          'Large Parking Space',
          'Air Conditioned',
          'Security Service 24/7'
        ]
      },
      {
        id: '2',
        name: 'Obala',
        address: 'Mimbo Market Area, Main Street',
        coordinates: {
          latitude: 4.1667,
          longitude: 11.5333
        },
        openHours: '7:00 AM - 6:00 PM',
        contact: '+237 987654321',
        features: [
          'Local Products Section',
          'Fresh Food Market',
          'Easy Access'
        ]
      },
      {
        id: '3',
        name: 'Marché Central',
        address: 'Central Market District',
        coordinates: {
          latitude: 3.8580,
          longitude: 11.5236
        },
        openHours: '6:00 AM - 7:00 PM',
        contact: '+237 456789123',
        features: [
          'Wholesale Options',
          'Traditional Market',
          'Public Transport Hub'
        ]
      }
    ],
    generalInfo: {
      title: 'Services Location',
      subtitle: 'Find the nearest service point to you',
      description: 'Visit any of our locations to experience our products firsthand. Our trained staff is ready to assist you.',
      note: 'All locations offer product testing and return services'
    },
    sellingPoints: ['SP7'],
    deliveryOptions: ['DO7']
  },

  // Products
  {
    id: '6',
    username: 'fitnessCoach360',
    title: 'Personal Fitness Training',
    description: 'Achieve your fitness goals with personalized training programs. Whether you’re looking to lose weight, build muscle, or improve your overall health, our certified trainers are here to guide and motivate you every step of the way.',
    video: require('../../assets/services/fitness/360_F_61.jpg'),
    option1: require('../../assets/services/fitness/african.jpg'),
    option2: require('../../assets/services/fitness/middle.jpg'),
    likes: '39200',
    comments: '1.1K',
    shares: '750',
    userImage: require('../../assets/services/fitness/african.jpg'),
    serviceType: 'Health',
    price: 50.0,
    rating: 4.9,
    trips: '1.0K trips',
    type: 'intangible',
    isPosted: true,
    availability: "Available", 
    selling_price: {
      options: [
        {
          type: 'basic',
          duration: '1 hour',
          price: 25000,
          features: [
            'One-on-one consultation',
            'Basic service package',
            'Email support'
          ]
        },
        {
          type: 'premium',
          duration: '5 hours',
          price: 100000,
          savings: '20%',
          features: [
            'Priority consultation',
            'Advanced service package',
            '24/7 phone support',
            'Progress tracking'
          ]
        },
        {
          type: 'enterprise',
          duration: 'custom',
          price: 200000,
          savings: '35%',
          features: [
            'VIP consultation',
            'Complete service suite',
            'Dedicated account manager',
            'Custom solutions',
            'Monthly review sessions'
          ]
        }
      ],
      threshold: {
        duration: '10 hours',
        message: 'For extended service requirements, we offer customized enterprise packages tailored to your needs.'
      }
    },
    locations: [
      {
        id: '1',
        name: 'Yaoundé',
        address: 'Centre commercial, Quartier Central',
        coordinates: {
          latitude: 3.8667,
          longitude: 11.5167
        },
        openHours: '8:00 AM - 8:00 PM',
        contact: '+237 123456789',
        features: [
          'Large Parking Space',
          'Air Conditioned',
          'Security Service 24/7'
        ]
      },
      {
        id: '2',
        name: 'Obala',
        address: 'Mimbo Market Area, Main Street',
        coordinates: {
          latitude: 4.1667,
          longitude: 11.5333
        },
        openHours: '7:00 AM - 6:00 PM',
        contact: '+237 987654321',
        features: [
          'Local Products Section',
          'Fresh Food Market',
          'Easy Access'
        ]
      }
    ],
    generalInfo: {
      title: 'Our Retail Locations',
      subtitle: 'Find the nearest store to you',
      description: 'Visit any of our locations to experience our products firsthand. Our trained staff is ready to assist you.',
      note: 'All locations offer product testing and return services'
    },
    sellingPoints: ['SP3'],
    deliveryOptions: ['DO3']
  },
  
  {
    id: '7',
    username: 'outdoorGear',
    title: '4-Person Camping Tent',
    description: 'Durable and weatherproof, this 4-person tent is ideal for family camping trips or outdoor adventures. Easy to set up, with plenty of ventilation and storage pockets.',
    video: require('../../assets/products/tent/kiwicamping.jpg'),
    option1: require('../../assets/products/tent/61qaa.jpg'),
    option2: require('../../assets/products/tent/359849_30050_XL.jpg'),
    likes: '6000',
    comments: '730',
    shares: '460',
    userImage: require('../../assets/products/tent/61qaa.jpg'),
    price: 120.0,
    quantity: 50,
    rating: 4.8,
    trips: 'All sizes',
    size: 'Large',
    type: 'tangible',
    isPosted: true,
    stock: '50',
    delivery_options: {
      locations: [
        {
          type: 'pickup',
          name: 'Collect at selling point',
          cost: 0,
          currency: 'FCFA',
          negotiable: false,
          address: 'Shop location address',
          available_hours: '8:00 AM - 6:00 PM',
          notes: 'Bring a valid ID for collection'
        },
        {
          type: 'in_town',
          name: 'In town delivery',
          cost: 2000,
          currency: 'FCFA',
          negotiable: true,
          available_towns: ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam'],
          estimated_time: '1-2 days',
          notes: 'Price may vary based on specific location within the town'
        },
        {
          type: 'out_of_town',
          name: 'Out of town delivery',
          cost: 5000,
          currency: 'FCFA',
          negotiable: true,
          estimated_time: '2-5 days',
          notes: 'Additional fees may apply based on distance'
        },
        {
          type: 'custom',
          name: 'Other locations',
          negotiable: true,
          contact_info: {
            phone: '+237 123456789',
            whatsapp: '+237 123456789',
            email: 'merchant@email.com'
          },
          notes: 'Contact merchant for custom delivery arrangements'
        }
      ],
      default_currency: 'FCFA',
      general_notes: 'All deliveries are insured. Tracking number will be provided after shipping.'
    },
    selling_price: {
      options: [
        {
          type: 'detail',
          quantity_range: '3-5',
          unit: 'pieces',
          price_per_unit: 25000,
          features: ['Standard shipping', 'Basic warranty'],
          minimum_order: 1,
          maximum_order: 5
        },
        {
          type: 'semi_Whole',
          quantity_range: '6-20',
          unit: 'pieces',
          price_per_unit: 12000,
          discount: 10,
          features: ['Free shipping', 'Extended warranty'],
          minimum_order: 6,
          maximum_order: 20
        },
        {
          type: 'Wholesale',
          quantity_range: '21+',
          unit: 'pieces',
          price_per_unit: 9500,
          discount: 40,
          features: ['Priority shipping', 'Premium support', 'Wholesale packaging'],
          minimum_order: 21,
          maximum_order: 100
        }
      ],
      threshold: {
        quantity: 100,
        unit: 'pieces',
        message: 'For orders above 50 pieces, contact us for special enterprise pricing and customized shipping options.'
      }
    },
    locations: [
      {
        id: '1',
        name: 'Yaoundé',
        address: 'Centre commercial, Quartier Central',
        coordinates: {
          latitude: 3.8667,
          longitude: 11.5167
        },
        openHours: '8:00 AM - 8:00 PM',
        contact: '+237 123456789',
        features: [
          'Large Parking Space',
          'Air Conditioned',
          'Security Service 24/7'
        ]
      },
      {
        id: '2',
        name: 'Obala',
        address: 'Mimbo Market Area, Main Street',
        coordinates: {
          latitude: 4.1667,
          longitude: 11.5333
        },
        openHours: '7:00 AM - 6:00 PM',
        contact: '+237 987654321',
        features: [
          'Local Products Section',
          'Fresh Food Market',
          'Easy Access'
        ]
      },
      {
        id: '3',
        name: 'Marché Central',
        address: 'Central Market District',
        coordinates: {
          latitude: 3.8580,
          longitude: 11.5236
        },
        openHours: '6:00 AM - 7:00 PM',
        contact: '+237 456789123',
        features: [
          'Wholesale Options',
          'Traditional Market',
          'Public Transport Hub'
        ]
      }
    ],
    generalInfo: {
      title: 'Our Retail Locations',
      subtitle: 'Find the nearest store to you',
      description: 'Visit any of our locations to experience our products firsthand. Our trained staff is ready to assist you.',
      note: 'All locations offer product testing and return services'
    },
    sellingPoints: ['SP10'],
    deliveryOptions: ['DO10']
  },
  {
    id: '8',
    username: 'moveMaster',
    title: 'Professional Moving Services',
    description: 'Our professional moving service is here to take the stress out of relocating. We offer packaging, loading, and unloading services tailored to your specific needs. Trust us to handle your belongings with care.',
    option2: require('../../assets/services/moving/team-owners.jpg'),
    option1: require('../../assets/services/moving/ai-generated.jpeg'),
    video: require('../../assets/services/moving/Screen.png'),
    likes: '20500',
    comments: '620',
    shares: '340',
    userImage: require('../../assets/services/moving/ai-generated.jpeg'),
    serviceType: 'Professional',
    car: 'Ford Transit Van',
    price: 75.0,
    rating: 4.6,
    trips: '900 trips',
    type: 'intangible',
    isPosted: true,
    availability: "Available", 
    selling_price: {
      options: [
        {
          type: 'basic',
          duration: '1 hour',
          price: 25000,
          features: [
            'One-on-one consultation',
            'Basic service package',
            'Email support'
          ]
        },
        {
          type: 'premium',
          duration: '5 hours',
          price: 100000,
          savings: '20%',
          features: [
            'Priority consultation',
            'Advanced service package',
            '24/7 phone support',
            'Progress tracking'
          ]
        },
        {
          type: 'enterprise',
          duration: 'custom',
          price: 200000,
          savings: '35%',
          features: [
            'VIP consultation',
            'Complete service suite',
            'Dedicated account manager',
            'Custom solutions',
            'Monthly review sessions'
          ]
        }
      ],
      threshold: {
        duration: '10 hours',
        message: 'For extended service requirements, we offer customized enterprise packages tailored to your needs.'
      }
    },
    locations: [
      {
        id: '1',
        name: 'Marché Central',
        address: 'Central Market District',
        coordinates: {
          latitude: 3.8580,
          longitude: 11.5236
        },
        openHours: '6:00 AM - 7:00 PM',
        contact: '+237 456789123',
        features: [
          'Wholesale Options',
          'Traditional Market',
          'Public Transport Hub'
        ]
      }
    ],
    generalInfo: {
      title: 'Our Retail Locations',
      subtitle: 'Find the nearest service point to you',
      description: 'Visit any of our locations to experience our products firsthand. Our trained staff is ready to assist you.',
      note: 'All locations offer product testing and return services'
    },
    sellingPoints: ['SP6'],
    deliveryOptions: ['DO6']
  },
  
  {
    id: '9',
    username: 'kitchenPro',
    title: 'Professional Chef Knife',
    description: 'Crafted from high-carbon stainless steel, this chef knife is a must-have for every kitchen. Its sharp edge and ergonomic handle make food prep a breeze.',
    video: require('../../assets/products/nife/SeriousEats.jpeg'),
    option1: require('../../assets/products/nife/71Pxz+8eqgS.jpg'),
    option2: require('../../assets/products/nife/71lVnAMlGYL.jpg'),
    likes: '5000',
    comments: '540',
    shares: '380',
    userImage: require('../../assets/products/nife/71Pxz+8eqgS.jpg'),
    price: 75.0,
    quantity: 150,
    rating: 4.8,
    trips: 'All shapes',
    size: 'Standard',
    type: 'tangible',
    isPosted: true,
    stock: '1000',
    delivery_options: {
      locations: [
        {
          type: 'pickup',
          name: 'Collect at selling point',
          cost: 0,
          currency: 'FCFA',
          negotiable: false,
          address: 'Shop location address',
          available_hours: '8:00 AM - 6:00 PM',
          notes: 'Bring a valid ID for collection'
        },
        {
          type: 'in_town',
          name: 'In town delivery',
          cost: 2000,
          currency: 'FCFA',
          negotiable: true,
          available_towns: ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam'],
          estimated_time: '1-2 days',
          notes: 'Price may vary based on specific location within the town'
        },
        {
          type: 'out_of_town',
          name: 'Out of town delivery',
          cost: 5000,
          currency: 'FCFA',
          negotiable: true,
          estimated_time: '2-5 days',
          notes: 'Additional fees may apply based on distance'
        },
        {
          type: 'custom',
          name: 'Other locations',
          negotiable: true,
          contact_info: {
            phone: '+237 123456789',
            whatsapp: '+237 123456789',
            email: 'merchant@email.com'
          },
          notes: 'Contact merchant for custom delivery arrangements'
        }
      ],
      default_currency: 'FCFA',
      general_notes: 'All deliveries are insured. Tracking number will be provided after shipping.'
    },
    selling_price: {
      options: [
        {
          type: 'detail',
          quantity_range: '1-5',
          unit: 'pieces',
          price_per_unit: 15000,
          features: ['Standard shipping', 'Basic warranty'],
          minimum_order: 1,
          maximum_order: 5
        },
        {
          type: 'semi_Whole',
          quantity_range: '6-20',
          unit: 'pieces',
          price_per_unit: 12000,
          discount: 20,
          features: ['Free shipping', 'Extended warranty'],
          minimum_order: 6,
          maximum_order: 20
        },
        {
          type: 'Wholesale',
          quantity_range: '21+',
          unit: 'pieces',
          price_per_unit: 9000,
          discount: 40,
          features: ['Priority shipping', 'Premium support', 'Wholesale packaging'],
          minimum_order: 21,
          maximum_order: 50
        }
      ],
      threshold: {
        quantity: 50,
        unit: 'pieces',
        message: 'For orders above 50 pieces, contact us for special enterprise pricing and customized shipping options.'
      }
    },
    locations: [
      {
        id: "1",
        name: "Bafoussam",
        address: "Tamdja Commercial Zone",
        coordinates: {
          latitude: 5.4778,
          longitude: 10.4176
        },
        openHours: "8:30 AM - 7:30 PM",
        contact: "+237 654321987",
        features: [
          "Family-Friendly Area",
          "Playground for Kids",
          "Bilingual Staff"
        ]
      }
    ],
    generalInfo: {
      title: 'Our Retail Locations',
      subtitle: 'Find the nearest store to you',
      description: 'Visit any of our locations to experience our products firsthand. Our trained staff is ready to assist you.',
      note: 'All locations offer product testing and return services'
    },
    sellingPoints: ['SP12'],
    deliveryOptions: ['DO12']
  },
  {
    id: '10',
    username: 'bookNook',
    title: 'Historical Fiction Novel',
    description: 'A gripping tale set in medieval Europe, this historical fiction novel combines intrigue, romance, and adventure in an unforgettable story.',
    video: require('../../assets/products/novel/marissa-.jpg'),
    option1: require('../../assets/products/novel/glenna.jpg'),
    option2: require('../../assets/products/novel/glenna.jpg'),
    likes: '4000',
    comments: '620',
    shares: '430',
    userImage: require('../../assets/products/novel/cyber.jpg'),
    price: 20.0,
    quantity: 300,
    rating: 4.8,
    trips: 'All types',
    size: 'Standard',
    type: 'tangible',
    isPosted: true,
    stock: '258',
    delivery_options: {
      locations: [
        {
          type: 'pickup',
          name: 'Collect at selling point',
          cost: 0,
          currency: 'FCFA',
          negotiable: false,
          address: 'Shop location address',
          available_hours: '8:00 AM - 6:00 PM',
          notes: 'Bring a valid ID for collection'
        },
        {
          type: 'in_town',
          name: 'In town delivery',
          cost: 2000,
          currency: 'FCFA',
          negotiable: true,
          available_towns: ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam'],
          estimated_time: '1-2 days',
          notes: 'Price may vary based on specific location within the town'
        },
        {
          type: 'out_of_town',
          name: 'Out of town delivery',
          cost: 5000,
          currency: 'FCFA',
          negotiable: true,
          estimated_time: '2-5 days',
          notes: 'Additional fees may apply based on distance'
        },
        {
          type: 'custom',
          name: 'Other locations',
          negotiable: true,
          contact_info: {
            phone: '+237 123456789',
            whatsapp: '+237 123456789',
            email: 'merchant@email.com'
          },
          notes: 'Contact merchant for custom delivery arrangements'
        }
      ],
      default_currency: 'FCFA',
      general_notes: 'All deliveries are insured. Tracking number will be provided after shipping.'
    },
    selling_price: {
      options: [
        {
          type: 'detail',
          quantity_range: '1-5',
          unit: 'pieces',
          price_per_unit: 15000,
          features: ['Standard shipping', 'Basic warranty'],
          minimum_order: 1,
          maximum_order: 5
        },
        {
          type: 'semi_Whole',
          quantity_range: '6-20',
          unit: 'pieces',
          price_per_unit: 12000,
          discount: 20,
          features: ['Free shipping', 'Extended warranty'],
          minimum_order: 6,
          maximum_order: 20
        },
        {
          type: 'Wholesale',
          quantity_range: '21+',
          unit: 'pieces',
          price_per_unit: 9000,
          discount: 40,
          features: ['Priority shipping', 'Premium support', 'Wholesale packaging'],
          minimum_order: 21,
          maximum_order: 50
        }
      ],
      threshold: {
        quantity: 50,
        unit: 'pieces',
        message: 'For orders above 50 pieces, contact us for special enterprise pricing and customized shipping options.'
      }
    },
    sellingPoints: ['SP13'],
    deliveryOptions: ['DO13']
  },
  {
    id: '11',
    username: 'luxuryWear',
    title: 'Premium Wool Coat',
    description: 'Stay warm and stylish with this premium wool coat. Perfect for cold weather, it features a tailored fit and a timeless design that works for both formal and casual occasions.',
    video: require('../../assets/products/coat/1.jpg'),
    option1: require('../../assets/products/coat/2.jpg'),
    option2: require('../../assets/products/coat/3.jpg'),
    likes: '999',
    comments: '1.5K',
    shares: '980',
    userImage: require('../../assets/products/coat/3.jpg'),
    price: 250.0,
    quantity: 80,
    rating: 4.8,
    trips: 'All sizes',
    size: 'Large',
    type: 'tangible',
    isPosted: true,
    stock: '365',
    delivery_options: {
      locations: [
        {
          type: 'pickup',
          name: 'Collect at selling point',
          cost: 0,
          currency: 'FCFA',
          negotiable: false,
          address: 'Shop location address',
          available_hours: '8:00 AM - 6:00 PM',
          notes: 'Bring a valid ID for collection'
        },
        {
          type: 'in_town',
          name: 'In town delivery',
          cost: 2000,
          currency: 'FCFA',
          negotiable: true,
          available_towns: ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam'],
          estimated_time: '1-2 days',
          notes: 'Price may vary based on specific location within the town'
        },
        {
          type: 'out_of_town',
          name: 'Out of town delivery',
          cost: 5000,
          currency: 'FCFA',
          negotiable: true,
          estimated_time: '2-5 days',
          notes: 'Additional fees may apply based on distance'
        },
        {
          type: 'custom',
          name: 'Other locations',
          negotiable: true,
          contact_info: {
            phone: '+237 123456789',
            whatsapp: '+237 123456789',
            email: 'merchant@email.com'
          },
          notes: 'Contact merchant for custom delivery arrangements'
        }
      ],
      default_currency: 'FCFA',
      general_notes: 'All deliveries are insured. Tracking number will be provided after shipping.'
    },
    selling_price: {
      options: [
        {
          type: 'detail',
          quantity_range: '1-5',
          unit: 'pieces',
          price_per_unit: 15000,
          features: ['Standard shipping', 'Basic warranty'],
          minimum_order: 1,
          maximum_order: 5
        },
        {
          type: 'semi_Whole',
          quantity_range: '6-20',
          unit: 'pieces',
          price_per_unit: 12000,
          discount: 20,
          features: ['Free shipping', 'Extended warranty'],
          minimum_order: 6,
          maximum_order: 20
        },
        {
          type: 'Wholesale',
          quantity_range: '21+',
          unit: 'pieces',
          price_per_unit: 9000,
          discount: 40,
          features: ['Priority shipping', 'Premium support', 'Wholesale packaging'],
          minimum_order: 21,
          maximum_order: 50
        }
      ],
      threshold: {
        quantity: 50,
        unit: 'pieces',
        message: 'For orders above 50 pieces, contact us for special enterprise pricing and customized shipping options.'
      }
    }
  },
];

export const sellingPoints = {
  locations: [
    {
      id: '1',
      name: 'Yaoundé',
      address: 'Centre commercial, Quartier Central',
      coordinates: {
        latitude: 3.8667,
        longitude: 11.5167
      },
      openHours: '8:00 AM - 8:00 PM',
      contact: '+237 123456789',
      features: [
        'Large Parking Space',
        'Air Conditioned',
        'Security Service 24/7'
      ]
    },
    {
      id: '2',
      name: 'Obala',
      address: 'Mimbo Market Area, Main Street',
      coordinates: {
        latitude: 4.1667,
        longitude: 11.5333
      },
      openHours: '7:00 AM - 6:00 PM',
      contact: '+237 987654321',
      features: [
        'Local Products Section',
        'Fresh Food Market',
        'Easy Access'
      ]
    },
    {
      id: '3',
      name: 'Marché Central',
      address: 'Central Market District',
      coordinates: {
        latitude: 3.8580,
        longitude: 11.5236
      },
      openHours: '6:00 AM - 7:00 PM',
      contact: '+237 456789123',
      features: [
        'Wholesale Options',
        'Traditional Market',
        'Public Transport Hub'
      ]
    }
  ],
  generalInfo: {
    title: 'Our Retail Locations',
    subtitle: 'Find the nearest store to you',
    description: 'Visit any of our locations to experience our products firsthand. Our trained staff is ready to assist you.',
    note: 'All locations offer product testing and return services'
  }
}



export const dummyData2 = [
  {
    id: '1',
    username: 'homeCleanersPro',
    title: 'Residential Cleaning Services',
    description: 'Our residential cleaning services ensure your home is spotless and inviting. We use eco-friendly products and pay attention to every detail, from dusting hard-to-reach areas to mopping floors. Book us for weekly or one-time deep cleaning sessions.',
    video: require('../../assets/services/cleaning/pro-cleaning.png'),
    option1: require('../../assets/services/cleaning/deposit.jpg'),
    option2: require('../../assets/services/cleaning/Apartment-Cleaning.jpg'),
    likes: '7000',
    comments: '1.6K',
    shares: '1.1K',
    userImage: require('../../assets/services/cleaning/Apartment-Cleaning.jpg'),
    serviceType: 'Professional',
    price: 35.0,
    rating: 4.7,
    trips: '1.2K trips',
    type: 'intangible',
    isPosted: true,
    availability: "Available", 
    selling_price: {
      options: [
        {
          type: 'basic',
          duration: '1 hour',
          price: 25000,
          features: [
            'One-on-one consultation',
            'Basic service package',
            'Email support'
          ]
        },
        {
          type: 'premium',
          duration: '5 hours',
          price: 100000,
          savings: '20%',
          features: [
            'Priority consultation',
            'Advanced service package',
            '24/7 phone support',
            'Progress tracking'
          ]
        },
        {
          type: 'enterprise',
          duration: 'custom',
          price: 200000,
          savings: '35%',
          features: [
            'VIP consultation',
            'Complete service suite',
            'Dedicated account manager',
            'Custom solutions',
            'Monthly review sessions'
          ]
        }
      ],
      threshold: {
        duration: '10 hours',
        message: 'For extended service requirements, we offer customized enterprise packages tailored to your needs.'
      }
    },
    sellingPoints: ['SP15'],
    deliveryOptions: ['DO15']
  },
  {
    id: '2',
    username: 'adventureGuides',
    title: 'Hiking and Camping Tours',
    description: 'Embark on an adventure with our expert-guided hiking and camping tours. Whether you’re a beginner or an experienced hiker, we offer tailored routes that explore breathtaking landscapes, hidden trails, and serene camping spots.',
    video: require('../../assets/services/adventure/gear-pioneer-2.jpg'),
    option1: require('../../assets/services/adventure/friends-3.jpg'),
    option2: require('../../assets/services/adventure/friends-3.jpg'),
    likes: '6000',
    comments: '1.2K',
    shares: '850',
    userImage: require('../../assets/services/adventure/gear-pioneer-2.jpg'),
    serviceType: 'Adventure',
    price: 60.0,
    rating: 4.7,
    trips: '1.2K trips',
    type: 'intangible',
    isPosted: false,
    availability: "Not Available",
    selling_price: {
      options: [
        {
          type: 'basic',
          duration: '1 hour',
          price: 25000,
          features: [
            'One-on-one consultation',
            'Basic service package',
            'Email support'
          ]
        },
        {
          type: 'premium',
          duration: '5 hours',
          price: 100000,
          savings: '20%',
          features: [
            'Priority consultation',
            'Advanced service package',
            '24/7 phone support',
            'Progress tracking'
          ]
        },
        {
          type: 'enterprise',
          duration: 'custom',
          price: 200000,
          savings: '35%',
          features: [
            'VIP consultation',
            'Complete service suite',
            'Dedicated account manager',
            'Custom solutions',
            'Monthly review sessions'
          ]
        }
      ],
      threshold: {
        duration: '10 hours',
        message: 'For extended service requirements, we offer customized enterprise packages tailored to your needs.'
      }
    },
    sellingPoints: ['SP16'],
    deliveryOptions: ['DO16']
  },
  {
    id: '3',
    username: 'babyCarePros',
    title: 'Professional Babysitting Services',
    description: 'Trusted and caring babysitters available for families who need reliable childcare. Our professionals are trained to ensure your child’s safety, engage them in fun activities, and provide a nurturing environment.',
    video: require('../../assets/services/babysitters/Creative.jpg'),
    option1: require('../../assets/services/babysitters/Best-nanny-to-hire.jpg'),
    option2: require('../../assets/services/babysitters/1.1.1_Africa_Nann.jpg'),
    likes: '5000',
    comments: '580',
    shares: '400',
    userImage: require('../../assets/services/babysitters/1.1.1_Africa_Nann.jpg'),
    serviceType: 'Family',
    price: 25.0,
    rating: 4.8,
    trips: '650 trips',
    type: 'intangible',
    isPosted: false,
    availability: "Not Available",
    selling_price: {
      options: [
        {
          type: 'basic',
          duration: '1 hour',
          price: 25000,
          features: [
            'One-on-one consultation',
            'Basic service package',
            'Email support'
          ]
        },
        {
          type: 'premium',
          duration: '5 hours',
          price: 100000,
          savings: '20%',
          features: [
            'Priority consultation',
            'Advanced service package',
            '24/7 phone support',
            'Progress tracking'
          ]
        },
        {
          type: 'enterprise',
          duration: 'custom',
          price: 200000,
          savings: '35%',
          features: [
            'VIP consultation',
            'Complete service suite',
            'Dedicated account manager',
            'Custom solutions',
            'Monthly review sessions'
          ]
        }
      ],
      threshold: {
        duration: '10 hours',
        message: 'For extended service requirements, we offer customized enterprise packages tailored to your needs.'
      }
    },
    sellingPoints: ['SP17'],
    deliveryOptions: ['DO17']
  },

  {
    id: '4',
    username: 'kitchenEssentials',
    title: 'Non-Stick Cookware Set',
    description: 'Upgrade your kitchen with this premium non-stick cookware set. The set includes frying pans, saucepans, and a stockpot, all with durable non-stick coatings that make cooking and cleaning easier than ever.',
    video: require('../../assets/products/kitchen/faw-primary.jpeg'),
    option1: require('../../assets/products/kitchen/71CQ6Sk-KWL.jpg'),
    option2: require('../../assets/products/kitchen/66795ff79d3.jpg'),
    likes: '8000',
    comments: '1.2K',
    shares: '870',
    userImage: require('../../assets/products/kitchen/66795ff79d3.jpg'),
    price: 99.99,
    quantity: 100,
    rating: 4.8,
    trips: 'All sizes',
    size: 'Set',
    type: 'tangible',
    isPosted: true,
    stock: '857',
    delivery_options: {
      locations: [
        {
          type: 'pickup',
          name: 'Collect at selling point',
          cost: 0,
          currency: 'FCFA',
          negotiable: false,
          address: 'Shop location address',
          available_hours: '8:00 AM - 6:00 PM',
          notes: 'Bring a valid ID for collection'
        },
        {
          type: 'in_town',
          name: 'In town delivery',
          cost: 2000,
          currency: 'FCFA',
          negotiable: true,
          available_towns: ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam'],
          estimated_time: '1-2 days',
          notes: 'Price may vary based on specific location within the town'
        },
        {
          type: 'out_of_town',
          name: 'Out of town delivery',
          cost: 5000,
          currency: 'FCFA',
          negotiable: true,
          estimated_time: '2-5 days',
          notes: 'Additional fees may apply based on distance'
        },
        {
          type: 'custom',
          name: 'Other locations',
          negotiable: true,
          contact_info: {
            phone: '+237 123456789',
            whatsapp: '+237 123456789',
            email: 'merchant@email.com'
          },
          notes: 'Contact merchant for custom delivery arrangements'
        }
      ],
      default_currency: 'FCFA',
      general_notes: 'All deliveries are insured. Tracking number will be provided after shipping.'
    },
    selling_price: {
      options: [
        {
          type: 'detail',
          quantity_range: '1-5',
          unit: 'pieces',
          price_per_unit: 15000,
          features: ['Standard shipping', 'Basic warranty'],
          minimum_order: 1
        },
        {
          type: 'semi_Whole',
          quantity_range: '6-20',
          unit: 'pieces',
          price_per_unit: 12000,
          discount: 20,
          features: ['Free shipping', 'Extended warranty'],
          minimum_order: 6
        },
        {
          type: 'Wholesale',
          quantity_range: '21+',
          unit: 'pieces',
          price_per_unit: 9000,
          discount: 40,
          features: ['Priority shipping', 'Premium support', 'Wholesale packaging'],
          minimum_order: 21
        }
      ],
      threshold: {
        quantity: 50,
        unit: 'pieces',
        message: 'For orders above 50 pieces, contact us for special enterprise pricing and customized shipping options.'
      }
    },
    sellingPoints: ['SP18'],
    deliveryOptions: ['DO18']
  },
  {
    id: '5',
    username: 'luxuryWear',
    title: 'Premium Wool Coat',
    description: 'Stay warm and stylish with this premium wool coat. Perfect for cold weather, it features a tailored fit and a timeless design that works for both formal and casual occasions.',
    video: require('../../assets/products/coat/1.jpg'),
    option1: require('../../assets/products/coat/2.jpg'),
    option2: require('../../assets/products/coat/3.jpg'),
    likes: '9000',
    comments: '1.5K',
    shares: '980',
    userImage: require('../../assets/products/coat/3.jpg'),
    price: 250.0,
    quantity: 80,
    rating: 4.8,
    trips: 'All sizes',
    size: 'Large',
    type: 'tangible',
    isPosted: true,
    stock: '400',
    delivery_options: {
      locations: [
        {
          type: 'pickup',
          name: 'Collect at selling point',
          cost: 0,
          currency: 'FCFA',
          negotiable: false,
          address: 'Shop location address',
          available_hours: '8:00 AM - 6:00 PM',
          notes: 'Bring a valid ID for collection'
        },
        {
          type: 'in_town',
          name: 'In town delivery',
          cost: 2000,
          currency: 'FCFA',
          negotiable: true,
          available_towns: ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam'],
          estimated_time: '1-2 days',
          notes: 'Price may vary based on specific location within the town'
        },
        {
          type: 'out_of_town',
          name: 'Out of town delivery',
          cost: 5000,
          currency: 'FCFA',
          negotiable: true,
          estimated_time: '2-5 days',
          notes: 'Additional fees may apply based on distance'
        },
        {
          type: 'custom',
          name: 'Other locations',
          negotiable: true,
          contact_info: {
            phone: '+237 123456789',
            whatsapp: '+237 123456789',
            email: 'merchant@email.com'
          },
          notes: 'Contact merchant for custom delivery arrangements'
        }
      ],
      default_currency: 'FCFA',
      general_notes: 'All deliveries are insured. Tracking number will be provided after shipping.'
    },
    selling_price: {
      options: [
        {
          type: 'detail',
          quantity_range: '1-5',
          unit: 'pieces',
          price_per_unit: 15000,
          features: ['Standard shipping', 'Basic warranty'],
          minimum_order: 1
        },
        {
          type: 'semi_Whole',
          quantity_range: '6-20',
          unit: 'pieces',
          price_per_unit: 12000,
          discount: 20,
          features: ['Free shipping', 'Extended warranty'],
          minimum_order: 6
        },
        {
          type: 'Wholesale',
          quantity_range: '21+',
          unit: 'pieces',
          price_per_unit: 9000,
          discount: 40,
          features: ['Priority shipping', 'Premium support', 'Wholesale packaging'],
          minimum_order: 21
        }
      ],
      threshold: {
        quantity: 50,
        unit: 'pieces',
        message: 'For orders above 50 pieces, contact us for special enterprise pricing and customized shipping options.'
      }
    },
    sellingPoints: ['SP19'],
    deliveryOptions: ['DO19']
  },
  {
    id: '6',
    username: 'gamingHub',
    title: 'Wireless Gaming Headset',
    description: 'Immerse yourself in gaming with this wireless headset. Features include surround sound, noise cancellation, and a built-in microphone for clear communication.',
    video: require('../../assets/products/headset/550x470.jpg'),
    option1: require('../../assets/products/headset/71SVek9CIkL.jpg'),
    option2: require('../../assets/products/headset/41zD6XY.jpg'),
    likes: '7000',
    comments: '1.1K',
    shares: '630',
    userImage: require('../../assets/products/headset/41zD6XY.jpg'),
    price: 120.0,
    rating: 4.8,
    trips: 'All colors',
    quantity: 150,
    size: 'Standard',
    type: 'tangible',
    isPosted: false,
    stock: '50',
    delivery_options: {
      locations: [
        {
          type: 'pickup',
          name: 'Collect at selling point',
          cost: 0,
          currency: 'FCFA',
          negotiable: false,
          address: 'Shop location address',
          available_hours: '8:00 AM - 6:00 PM',
          notes: 'Bring a valid ID for collection'
        },
        {
          type: 'in_town',
          name: 'In town delivery',
          cost: 2000,
          currency: 'FCFA',
          negotiable: true,
          available_towns: ['Yaoundé', 'Douala', 'Bamenda', 'Bafoussam'],
          estimated_time: '1-2 days',
          notes: 'Price may vary based on specific location within the town'
        },
        {
          type: 'out_of_town',
          name: 'Out of town delivery',
          cost: 5000,
          currency: 'FCFA',
          negotiable: true,
          estimated_time: '2-5 days',
          notes: 'Additional fees may apply based on distance'
        },
        {
          type: 'custom',
          name: 'Other locations',
          negotiable: true,
          contact_info: {
            phone: '+237 123456789',
            whatsapp: '+237 123456789',
            email: 'merchant@email.com'
          },
          notes: 'Contact merchant for custom delivery arrangements'
        }
      ],
      default_currency: 'FCFA',
      general_notes: 'All deliveries are insured. Tracking number will be provided after shipping.'
    },
    selling_price: {
      options: [
        {
          type: 'detail',
          quantity_range: '1-5',
          unit: 'pieces',
          price_per_unit: 15000,
          features: ['Standard shipping', 'Basic warranty'],
          minimum_order: 1
        },
        {
          type: 'semi_Whole',
          quantity_range: '6-20',
          unit: 'pieces',
          price_per_unit: 12000,
          discount: 20,
          features: ['Free shipping', 'Extended warranty'],
          minimum_order: 6
        },
        {
          type: 'Wholesale',
          quantity_range: '21+',
          unit: 'pieces',
          price_per_unit: 9000,
          discount: 40,
          features: ['Priority shipping', 'Premium support', 'Wholesale packaging'],
          minimum_order: 21
        }
      ],
      threshold: {
        quantity: 50,
        unit: 'pieces',
        message: 'For orders above 50 pieces, contact us for special enterprise pricing and customized shipping options.'
      }
    },
    sellingPoints: ['SP20'],
    deliveryOptions: ['DO20']
  },
];

// Selling Points Data
export const sellingPointsData = [
  {
    id: 'SP1',
    city: 'Yaounde',
    address: 'Kennedy Avenue',
    location: 'Hilton Hotel',
    coordinates: { lat: 3.8667, lng: 11.5167 },
    contactInfo: {
      phone: '+237 699887766',
      whatsapp: '+237 699887766'
    }
  },
  {
    id: 'SP2',
    city: 'Douala',
    address: 'Liberty Boulevard',
    location: 'Akwa Palace Hotel',
    coordinates: { lat: 4.0500, lng: 9.7000 },
    contactInfo: {
      phone: '+237 677889900',
      whatsapp: '+237 677889900'
    }
  },
  {
    id: 'SP3',
    city: 'Bafoussam',
    address: 'Avenue des Banques',
    location: 'Marché B',
    coordinates: { lat: 5.4667, lng: 10.4167 },
    contactInfo: {
      phone: '+237 698765432',
      whatsapp: '+237 698765432'
    }
  },
  {
    id: 'SP4',
    city: 'Bamenda',
    address: 'Commercial Avenue',
    location: 'Food Market',
    coordinates: { lat: 5.9597, lng: 10.1456 },
    contactInfo: {
      phone: '+237 677123456',
      whatsapp: '+237 677123456'
    }
  },
  {
    id: 'SP5',
    city: 'Garoua',
    address: 'Avenue Ahmadou Ahidjo',
    location: 'Grand Marché',
    coordinates: { lat: 9.3017, lng: 13.3921 },
    contactInfo: {
      phone: '+237 699112233',
      whatsapp: '+237 699112233'
    }
  },
  {
    id: 'SP6',
    city: 'Maroua',
    address: 'Rue du Marché',
    location: 'Marché Central',
    coordinates: { lat: 10.5913, lng: 14.3158 },
    contactInfo: {
      phone: '+237 677445566',
      whatsapp: '+237 677445566'
    }
  },
  {
    id: 'SP7',
    city: 'Bertoua',
    address: 'Avenue Principale',
    location: 'Centre Commercial',
    coordinates: { lat: 4.5833, lng: 13.6833 },
    contactInfo: {
      phone: '+237 699998877',
      whatsapp: '+237 699998877'
    }
  },
  {
    id: 'SP8',
    city: 'Kribi',
    address: 'Beach Boulevard',
    location: 'Tourism Office',
    coordinates: { lat: 2.9333, lng: 9.9167 },
    contactInfo: {
      phone: '+237 677665544',
      whatsapp: '+237 677665544'
    }
  },
  {
    id: 'SP9',
    city: 'Limbe',
    address: 'Down Beach Road',
    location: 'Mile 4',
    coordinates: { lat: 4.0213, lng: 9.2094 },
    contactInfo: {
      phone: '+237 699223344',
      whatsapp: '+237 699223344'
    }
  },
  {
    id: 'SP10',
    city: 'Buea',
    address: 'Molyko Street',
    location: 'University Area',
    coordinates: { lat: 4.1527, lng: 9.2920 },
    contactInfo: {
      phone: '+237 677889911',
      whatsapp: '+237 677889911'
    }
  },
  {
    id: 'SP11',
    city: 'Ebolowa',
    address: 'Rue du Commerce',
    location: 'Marché Central',
    coordinates: { lat: 2.9000, lng: 11.1500 },
    contactInfo: {
      phone: '+237 699334455',
      whatsapp: '+237 699334455'
    }
  },
  {
    id: 'SP12',
    city: 'Ngaoundere',
    address: 'Avenue de la Gare',
    location: 'Gare Ferroviaire',
    coordinates: { lat: 7.3167, lng: 13.5833 },
    contactInfo: {
      phone: '+237 677990011',
      whatsapp: '+237 677990011'
    }
  },
  {
    id: 'SP13',
    city: 'Dschang',
    address: 'Avenue de l\'Université',
    location: 'Campus Area',
    coordinates: { lat: 5.4500, lng: 10.0667 },
    contactInfo: {
      phone: '+237 699556677',
      whatsapp: '+237 699556677'
    }
  },
  {
    id: 'SP14',
    city: 'Foumban',
    address: 'Route du Palais',
    location: 'Marché des Artisans',
    coordinates: { lat: 5.7333, lng: 10.9000 },
    contactInfo: {
      phone: '+237 677112233',
      whatsapp: '+237 677112233'
    }
  },
  {
    id: 'SP15',
    city: 'Edea',
    address: 'Boulevard du Commerce',
    location: 'Marché Principal',
    coordinates: { lat: 3.8000, lng: 10.1333 },
    contactInfo: {
      phone: '+237 699778899',
      whatsapp: '+237 699778899'
    }
  },
  {
    id: 'SP16',
    city: 'Kumba',
    address: 'Station Road',
    location: 'Fiango Market',
    coordinates: { lat: 4.6333, lng: 9.4333 },
    contactInfo: {
      phone: '+237 677334455',
      whatsapp: '+237 677334455'
    }
  },
  {
    id: 'SP17',
    city: 'Nkongsamba',
    address: 'Avenue Principale',
    location: 'Grand Marché',
    coordinates: { lat: 4.9500, lng: 9.9333 },
    contactInfo: {
      phone: '+237 699667788',
      whatsapp: '+237 699667788'
    }
  },
  {
    id: 'SP18',
    city: 'Sangmelima',
    address: 'Rue du Marché',
    location: 'Centre Commercial',
    coordinates: { lat: 2.9333, lng: 11.9833 },
    contactInfo: {
      phone: '+237 677556677',
      whatsapp: '+237 677556677'
    }
  },
  {
    id: 'SP19',
    city: 'Mbalmayo',
    address: 'Route Principale',
    location: 'Marché Central',
    coordinates: { lat: 3.5167, lng: 11.5000 },
    contactInfo: {
      phone: '+237 699889900',
      whatsapp: '+237 699889900'
    }
  },
  {
    id: 'SP20',
    city: 'Tiko',
    address: 'Market Street',
    location: 'Main Market',
    coordinates: { lat: 4.0750, lng: 9.3600 },
    contactInfo: {
      phone: '+237 677223344',
      whatsapp: '+237 677223344'
    }
  }
];

export const deliveryOptionsData = [
  {
    id: 'DO1',
    type: 'pickup',
    name: 'Service Point Pickup',
    price: 0,
    isNegotiable: false,
    description: 'Meet at the designated service point',
    contactMethods: {
      phone: '+237 699887766',
      whatsapp: '+237 699887766'
    }
  },
  {
    id: 'DO2',
    type: 'local',
    name: 'Service in Yaounde',
    price: 2000,
    isNegotiable: true,
    description: 'Transport service within Yaounde city',
    contactMethods: {
      phone: '+237 699887766',
      whatsapp: '+237 699887766'
    }
  },
  {
    id: 'DO3',
    type: 'outOfTown',
    name: 'Out of Yaounde Service',
    price: null,
    isNegotiable: true,
    description: 'Contact us for a personalized quote',
    contactMethods: {
      phone: '+237 699887766',
      whatsapp: '+237 699887766'
    }
  },
  {
    id: 'DO4',
    type: 'pickup',
    name: 'At our location',
    price: 0,
    isNegotiable: false,
    description: 'Training at our facilities',
    contactMethods: {
      phone: '+237 698765432',
      whatsapp: '+237 698765432'
    }
  },
  {
    id: 'DO5',
    type: 'local',
    name: 'Home Service (Yaounde)',
    price: 5000,
    isNegotiable: true,
    description: 'Home coaching service in Yaounde',
    contactMethods: {
      phone: '+237 698765432',
      whatsapp: '+237 698765432'
    }
  },
  {
    id: 'DO6',
    type: 'outOfTown',
    name: 'Out of Yaounde',
    price: null,
    isNegotiable: true,
    description: 'Contact us to arrange your program',
    contactMethods: {
      phone: '+237 698765432',
      whatsapp: '+237 698765432'
    }
  },
  {
    id: 'DO7',
    type: 'pickup',
    name: 'Meeting Point',
    price: 0,
    isNegotiable: false,
    description: 'Meet at the tour starting point',
    contactMethods: {
      phone: '+237 699112233',
      whatsapp: '+237 699112233'
    }
  },
  {
    id: 'DO8',
    type: 'local',
    name: 'Hotel Pickup',
    price: 3000,
    isNegotiable: true,
    description: 'We pick you up from your hotel in the city',
    contactMethods: {
      phone: '+237 699112233',
      whatsapp: '+237 699112233'
    }
  },
  {
    id: 'DO9',
    type: 'outOfTown',
    name: 'Custom Service',
    price: null,
    isNegotiable: true,
    description: 'Contact us to organize your tour',
    contactMethods: {
      phone: '+237 699112233',
      whatsapp: '+237 699112233'
    }
  },
  {
    id: 'DO10',
    type: 'pickup',
    name: 'Store Pickup',
    price: 0,
    isNegotiable: false,
    description: 'Collect from our store',
    contactMethods: {
      phone: '+237 699445566',
      whatsapp: '+237 699445566'
    }
  },
  {
    id: 'DO11',
    type: 'local',
    name: 'City Delivery',
    price: 2000,
    isNegotiable: true,
    description: 'Same-day delivery within the city',
    contactMethods: {
      phone: '+237 699445566',
      whatsapp: '+237 699445566'
    }
  },
  {
    id: 'DO12',
    type: 'outOfTown',
    name: 'Nationwide Delivery',
    price: null,
    isNegotiable: true,
    description: 'Contact us for shipping rates',
    contactMethods: {
      phone: '+237 699445566',
      whatsapp: '+237 699445566'
    }
  },
  {
    id: 'DO13',
    type: 'pickup',
    name: 'Office Pickup',
    price: 0,
    isNegotiable: false,
    description: 'Collect from our office',
    contactMethods: {
      phone: '+237 699778899',
      whatsapp: '+237 699778899'
    }
  },
  {
    id: 'DO14',
    type: 'local',
    name: 'Office Delivery',
    price: 1500,
    isNegotiable: true,
    description: 'Delivery to your office',
    contactMethods: {
      phone: '+237 699778899',
      whatsapp: '+237 699778899'
    }
  },
  {
    id: 'DO15',
    type: 'outOfTown',
    name: 'Custom Office Service',
    price: null,
    isNegotiable: true,
    description: 'Contact us to arrange your office service',
    contactMethods: {
      phone: '+237 699778899',
      whatsapp: '+237 699778899'
    }
  },
  {
    id: 'DO16',
    type: 'pickup',
    name: 'Warehouse Pickup',
    price: 0,
    isNegotiable: false,
    description: 'Collect from our warehouse',
    contactMethods: {
      phone: '+237 677334455',
      whatsapp: '+237 677334455'
    }
  },
  {
    id: 'DO17',
    type: 'local',
    name: 'Warehouse Delivery',
    price: 2500,
    isNegotiable: true,
    description: 'Delivery to your warehouse',
    contactMethods: {
      phone: '+237 677334455',
      whatsapp: '+237 677334455'
    }
  },
  {
    id: 'DO18',
    type: 'outOfTown',
    name: 'Custom Warehouse Service',
    price: null,
    isNegotiable: true,
    description: 'Contact us to arrange your warehouse service',
    contactMethods: {
      phone: '+237 677334455',
      whatsapp: '+237 677334455'
    }
  },
  {
    id: 'DO19',
    type: 'pickup',
    name: 'Factory Pickup',
    price: 0,
    isNegotiable: false,
    description: 'Collect from our factory',
    contactMethods: {
      phone: '+237 699889900',
      whatsapp: '+237 699889900'
    }
  },
  {
    id: 'DO20',
    type: 'local',
    name: 'Factory Delivery',
    price: 3000,
    isNegotiable: true,
    description: 'Delivery to your factory',
    contactMethods: {
      phone: '+237 699889900',
      whatsapp: '+237 699889900'
    }
  }
];

export const ordersDataTrack = [
  {
    id: '1',
    username: 'premiumRides',
    title: 'Luxury Chauffeur Service',
    description: 'Experience unparalleled comfort and professionalism with our luxury chauffeur service. Perfect for business meetings, weddings, or any special occasion. Our fleet includes top-of-the-line vehicles and professional drivers who prioritize safety and punctuality.',
    option2: require('../../assets/services/luxury_driver/Personal-driver-2.jpg'), 
    price: 25000,
    action: 'Track' 
  },
  {
    id: '2',
    username: 'techZone',
    title: 'Smartphone: Galaxy S22',
    description: 'The Galaxy S22 combines cutting-edge technology with sleek design. Featuring a powerful processor, stunning display, and an advanced camera system, it’s perfect for both work and play.',
    video: require('../../assets/products/samsung1/samsung.jpeg'),
    price: 15000,
    quantity: 200,
    rating: 4.8,
    action: 'Track',
  },

  {
    id: '3',
    username: 'cityTourExperts',
    title: 'City Walking Tours',
    description: 'Join our guided city walking tours to explore the history, culture, and vibrant life of the city. Our knowledgeable guides will take you to iconic landmarks, hidden gems, and bustling markets.',
    video: require('../../assets/services/city_walking/Milo-rotated.jpg'),
    price: 25000.0,
    rating: 4.8,
    action: 'Track',
  },
  {
    id: '4',
    username: 'fashionHub',
    title: 'Leather Jacket',
    description: 'Stylish and durable, this leather jacket adds a touch of sophistication to your wardrobe. Perfect for casual or formal occasions.',
    video: require('../../assets/products/jacket/1.jpg'),
    price: 15000.0,
    quantity: 70,
    rating: 4.8,
    trips: 'All sizes',
    size: 'Medium',
    action: 'Track',
  },

  {
    id: '5',
    username: 'petCarePros',
    title: 'Pet Sitting Services',
    description: 'Our trusted pet sitting services ensure your furry friends are well cared for while you’re away. From feeding and walking to playtime and medication administration, we cater to all your pet’s needs.',
    video: require('../../assets/services/pet_sitting/South.jpg'),
    price: 30.0,
    rating: 4.8,
    action: 'Track',
  },  
]

export const ordersDataComment = [
  {
    id: '1',
    username: 'premiumRides',
    title: 'Luxury Chauffeur Service',
    description: 'Experience unparalleled comfort and professionalism with our luxury chauffeur service. Perfect for business meetings, weddings, or any special occasion. Our fleet includes top-of-the-line vehicles and professional drivers who prioritize safety and punctuality.',
    option2: require('../../assets/services/luxury_driver/Personal-driver-2.jpg'), 
    price: 25000,
    action: 'comment' 
  },
  {
    id: '2',
    username: 'techZone',
    title: 'Smartphone: Galaxy S22',
    description: 'The Galaxy S22 combines cutting-edge technology with sleek design. Featuring a powerful processor, stunning display, and an advanced camera system, it’s perfect for both work and play.',
    video: require('../../assets/products/samsung1/samsung.jpeg'),
    price: 15000,
    quantity: 200,
    rating: 4.8,
    action: 'comment',
  },

  {
    id: '3',
    username: 'cityTourExperts',
    title: 'City Walking Tours',
    description: 'Join our guided city walking tours to explore the history, culture, and vibrant life of the city. Our knowledgeable guides will take you to iconic landmarks, hidden gems, and bustling markets.',
    video: require('../../assets/services/city_walking/Milo-rotated.jpg'),
    price: 25000.0,
    rating: 4.8,
    action: 'comment',
  },
  {
    id: '4',
    username: 'fashionHub',
    title: 'Leather Jacket',
    description: 'Stylish and durable, this leather jacket adds a touch of sophistication to your wardrobe. Perfect for casual or formal occasions.',
    video: require('../../assets/products/jacket/1.jpg'),
    price: 15000.0,
    quantity: 70,
    rating: 4.8,
    trips: 'All sizes',
    size: 'Medium',
    action: 'comment',
  },

  {
    id: '5',
    username: 'petCarePros',
    title: 'Pet Sitting Services',
    description: 'Our trusted pet sitting services ensure your furry friends are well cared for while you’re away. From feeding and walking to playtime and medication administration, we cater to all your pet’s needs.',
    video: require('../../assets/services/pet_sitting/South.jpg'),
    price: 30.0,
    rating: 4.8,
    action: 'comment',
  },  
]

export const ordersDataReorder = [
  {
    id: '1',
    username: 'premiumRides',
    title: 'Luxury Chauffeur Service',
    description: 'Experience unparalleled comfort and professionalism with our luxury chauffeur service. Perfect for business meetings, weddings, or any special occasion. Our fleet includes top-of-the-line vehicles and professional drivers who prioritize safety and punctuality.',
    option2: require('../../assets/services/luxury_driver/Personal-driver-2.jpg'), 
    price: 25000,
    action: 'Re-Order' 
  },
  {
    id: '2',
    username: 'techZone',
    title: 'Smartphone: Galaxy S22',
    description: 'The Galaxy S22 combines cutting-edge technology with sleek design. Featuring a powerful processor, stunning display, and an advanced camera system, it’s perfect for both work and play.',
    video: require('../../assets/products/samsung1/samsung.jpeg'),
    price: 15000,
    quantity: 200,
    rating: 4.8,
    action: 'Re-Order',
  },

  {
    id: '3',
    username: 'cityTourExperts',
    title: 'City Walking Tours',
    description: 'Join our guided city walking tours to explore the history, culture, and vibrant life of the city. Our knowledgeable guides will take you to iconic landmarks, hidden gems, and bustling markets.',
    video: require('../../assets/services/city_walking/Milo-rotated.jpg'),
    price: 25000.0,
    rating: 4.8,
    action: 'Re-Order',
  },
  {
    id: '4',
    username: 'fashionHub',
    title: 'Leather Jacket',
    description: 'Stylish and durable, this leather jacket adds a touch of sophistication to your wardrobe. Perfect for casual or formal occasions.',
    video: require('../../assets/products/jacket/1.jpg'),
    price: 15000.0,
    quantity: 70,
    rating: 4.8,
    trips: 'All sizes',
    size: 'Medium',
    action: 'Re-Order',
  },

  {
    id: '5',
    username: 'petCarePros',
    title: 'Pet Sitting Services',
    description: 'Our trusted pet sitting services ensure your furry friends are well cared for while you’re away. From feeding and walking to playtime and medication administration, we cater to all your pet’s needs.',
    video: require('../../assets/services/pet_sitting/South.jpg'),
    price: 30.0,
    rating: 4.8,
    action: 'Re-Order',
  },  
]
