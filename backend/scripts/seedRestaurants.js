import db from '../config/database.js';
import Restaurant from '../models/RestaurantModel.js';
import '../models/associations.js';

const restaurants = [
    {
        name: 'Gudeg Yu Djum',
        description: 'Gudeg tradisional Yogyakarta yang terkenal dengan cita rasa autentik sejak tahun 1950. Menggunakan resep turun temurun dengan bumbu rempah pilihan.',
        address: 'Jl. Wijilan No.167, Kraton, Yogyakarta',
        latitude: -7.8063,
        longitude: 110.3647,
        cuisine: 'Indonesian',
        priceRange: 'Murah',
        averagePrice: 25000,
        rating: 4.5,
        openTime: '06:00',
        closeTime: '21:00',
        phone: '0274-561593',
        imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500',
        isOpen: true
    },
    {
        name: 'Warung Bu Ageng',
        description: 'Tahu telur dan lotek legendaris di Tugu yang sudah berdiri puluhan tahun. Terkenal dengan sambal kacangnya yang gurih.',
        address: 'Jl. Sugeng Jeroni, Tugu, Yogyakarta',
        latitude: -7.7830,
        longitude: 110.3904,
        cuisine: 'Indonesian',
        priceRange: 'Murah',
        averagePrice: 15000,
        rating: 4.3,
        openTime: '07:00',
        closeTime: '17:00',
        phone: null,
        imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500',
        isOpen: true
    },
    {
        name: 'Sate Klathak Pak Pong',
        description: 'Sate kambing bakar khas Bantul dengan bumbu tradisional. Daging kambing muda yang empuk dengan aroma khas dari pembakaran arang.',
        address: 'Jl. Imogiri Tim., Bantul, Yogyakarta',
        latitude: -7.8878,
        longitude: 110.3297,
        cuisine: 'Indonesian',
        priceRange: 'Sedang',
        averagePrice: 45000,
        rating: 4.4,
        openTime: '17:00',
        closeTime: '23:00',
        phone: '0274-367890',
        imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500',
        isOpen: true
    },
    {
        name: 'Angkringan Tugu',
        description: 'Angkringan tradisional dengan suasana khas Yogyakarta. Menyajikan nasi kucing, sate usus, dan wedang hangat.',
        address: 'Jl. Margahayu, Tugu, Yogyakarta',
        latitude: -7.7756,
        longitude: 110.3678,
        cuisine: 'Indonesian',
        priceRange: 'Murah',
        averagePrice: 12000,
        rating: 4.2,
        openTime: '18:00',
        closeTime: '02:00',
        phone: null,
        imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500',
        isOpen: true
    },
    {
        name: 'Bakpia Pathok 25',
        description: 'Toko bakpia terkenal di Malioboro dengan berbagai varian rasa. Bakpia khas Yogyakarta dengan kualitas terbaik.',
        address: 'Jl. Malioboro No.25, Yogyakarta',
        latitude: -7.7926,
        longitude: 110.3656,
        cuisine: 'Dessert',
        priceRange: 'Murah',
        averagePrice: 35000,
        rating: 4.1,
        openTime: '08:00',
        closeTime: '21:00',
        phone: '0274-562533',
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500',
        isOpen: true
    },
    {
        name: 'Jejamuran',
        description: 'Restoran dengan konsep healthy food, khusus menyajikan berbagai olahan jamur. Menu vegetarian yang lezat dan bergizi.',
        address: 'Jl. Kaliurang Km 4.5, Yogyakarta',
        latitude: -7.7398,
        longitude: 110.3756,
        cuisine: 'Vegetarian',
        priceRange: 'Sedang',
        averagePrice: 55000,
        rating: 4.6,
        openTime: '10:00',
        closeTime: '22:00',
        phone: '0274-881918',
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500',
        isOpen: true
    },
    {
        name: 'Mediterranea Restaurant',
        description: 'Restoran fine dining dengan menu Mediterranean dan Western. Suasana romantis cocok untuk dinner special.',
        address: 'Jl. Dalem KG III No.7, Yogyakarta',
        latitude: -7.8156,
        longitude: 110.3640,
        cuisine: 'Mediterranean',
        priceRange: 'Mahal',
        averagePrice: 150000,
        rating: 4.7,
        openTime: '11:00',
        closeTime: '23:00',
        phone: '0274-386366',
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500',
        isOpen: true
    },
    {
        name: 'Miyama Japanese Restaurant',
        description: 'Restoran Jepang authentic dengan chef langsung dari Jepang. Menyajikan sushi, ramen, dan teppanyaki berkualitas tinggi.',
        address: 'Jl. Laksda Adisucipto Km 8, Yogyakarta',
        latitude: -7.7847,
        longitude: 110.4083,
        cuisine: 'Japanese',
        priceRange: 'Mahal',
        averagePrice: 120000,
        rating: 4.5,
        openTime: '11:30',
        closeTime: '22:00',
        phone: '0274-485888',
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500',
        isOpen: true
    },
    {
        name: 'Warung Handayani',
        description: 'Masakan Padang authentic dengan rendang dan gulai yang mantap. Warung keluarga dengan cita rasa traditional.',
        address: 'Jl. Parangtritis Km 5, Yogyakarta',
        latitude: -7.8445,
        longitude: 110.3789,
        cuisine: 'Padang',
        priceRange: 'Sedang',
        averagePrice: 35000,
        rating: 4.3,
        openTime: '08:00',
        closeTime: '21:00',
        phone: '0274-376543',
        imageUrl: 'https://images.unsplash.com/photo-1516684669134-de6f6ba62051?w=500',
        isOpen: true
    },
    {
        name: 'House of Raminten',
        description: 'Restoran unik dengan konsep Javanese traditional yang kental. Menyajikan makanan khas Jawa dengan suasana yang autentik.',
        address: 'Jl. FM Noto No.7, Kotabaru, Yogyakarta',
        latitude: -7.7815,
        longitude: 110.3784,
        cuisine: 'Javanese',
        priceRange: 'Sedang',
        averagePrice: 65000,
        rating: 4.2,
        openTime: '10:00',
        closeTime: '22:00',
        phone: '0274-566333',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500',
        isOpen: true
    },
    {
        name: 'Soto Bathok Mbah Katro',
        description: 'Soto ayam legendaris dengan mangkok dari tempurung kelapa. Kuah yang gurih dan daging ayam yang empuk.',
        address: 'Jl. Bantul No.92, Yogyakarta',
        latitude: -7.8234,
        longitude: 110.3712,
        cuisine: 'Indonesian',
        priceRange: 'Murah',
        averagePrice: 18000,
        rating: 4.4,
        openTime: '08:00',
        closeTime: '16:00',
        phone: null,
        imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
        isOpen: true
    },
    {
        name: 'Milas Vegetarian',
        description: 'Restoran vegetarian dengan menu beragam. Cocok untuk yang menjalani diet sehat atau vegetarian lifestyle.',
        address: 'Jl. Prawirotaman No.8, Yogyakarta',
        latitude: -7.8167,
        longitude: 110.3678,
        cuisine: 'Vegetarian',
        priceRange: 'Sedang',
        averagePrice: 40000,
        rating: 4.1,
        openTime: '09:00',
        closeTime: '21:00',
        phone: '0274-376789',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
        isOpen: true
    }
];

const seedRestaurants = async () => {
    try {
        await db.authenticate();
        console.log('Database connection established.');
        
        // Sync database
        await db.sync({ alter: true });
        console.log('Database synced.');
        
        // Clear existing restaurants
        await Restaurant.destroy({ where: {} });
        console.log('Existing restaurants cleared.');
        
        // Insert new restaurants
        await Restaurant.bulkCreate(restaurants);
        console.log('Sample restaurants inserted successfully!');
        
        // Display inserted restaurants
        const insertedRestaurants = await Restaurant.findAll();
        console.log(`Total restaurants in database: ${insertedRestaurants.length}`);
        
    } catch (error) {
        console.error('Error seeding restaurants:', error);
    } finally {
        await db.close();
        console.log('Database connection closed.');
    }
};

// Run the seeding
seedRestaurants();
