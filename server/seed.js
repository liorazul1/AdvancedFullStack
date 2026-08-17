require('dotenv').config();

const connectDB = require('./config/db');
const User = require('./models/user');
const Restaurant = require('./models/restaurant');
const Review = require('./models/review');

const seedData = async () => {
    try {
        await connectDB();

        // ניקוי דאטה דמו קודם כדי שלא יהיו כפילויות בהרצות חוזרות
        await Review.deleteMany({});
        await Restaurant.deleteMany({});
        await User.deleteMany({
            email: {
                $in: [
                    'demo@tastymatch.com',
                    'maya@tastymatch.com',
                    'daniel@tastymatch.com'
                ]
            }
        });

        const users = await User.create([
            {
                username: 'Demo User',
                email: 'demo@tastymatch.com',
                password: 'Password123',
                favoriteCuisines: ['Italian', 'Asian', 'Mexican'],
                favoriteVibes: ['Date Night', 'With Friends'],
                favoriteCities: ['Tel Aviv', 'Jerusalem'],
                priceRangePreference: ['$$', '$$$']
            },
            {
                username: 'Maya',
                email: 'maya@tastymatch.com',
                password: 'Password123',
                favoriteCuisines: ['Cafes', 'Desserts', 'Vegan'],
                favoriteVibes: ['Outdoor Seating', 'Hidden Gems'],
                favoriteCities: ['Haifa', 'Herzliya'],
                priceRangePreference: ['$', '$$']
            },
            {
                username: 'Daniel',
                email: 'daniel@tastymatch.com',
                password: 'Password123',
                favoriteCuisines: ['Burgers', 'Cocktails', 'Asian'],
                favoriteVibes: ['Trendy Bars', 'Rooftop Views'],
                favoriteCities: ['Tel Aviv', 'Beer Sheva'],
                priceRangePreference: ['$$', '$$$']
            }
        ]);

        const restaurants = await Restaurant.insertMany([
            {
                name: 'Italiano',
                description: 'Authentic Italian food with handmade pasta, wine, and warm dinner vibes.',
                cuisine: 'Italian',
                city: 'Jerusalem',
                priceRange: '$$$',
                vibes: ['Date Night', 'Wine & Dine'],
                tags: ['pasta', 'wine', 'romantic']
            },
            {
                name: 'Tokyo Bowl',
                description: 'Fresh Asian bowls, sushi plates, and fast casual dishes for lunch or dinner.',
                cuisine: 'Asian',
                city: 'Tel Aviv',
                priceRange: '$$',
                vibes: ['With Friends', 'Trendy Bars'],
                tags: ['sushi', 'noodles', 'casual']
            },
            {
                name: 'Burger House',
                description: 'Juicy burgers, crispy fries, and classic comfort food in a relaxed atmosphere.',
                cuisine: 'Burgers',
                city: 'Beer Sheva',
                priceRange: '$$',
                vibes: ['With Friends', 'Family Dinner'],
                tags: ['burgers', 'fries', 'comfort food']
            },
            {
                name: 'Coco Cafe',
                description: 'Cozy cafe with breakfast plates, pastries, coffee, and outdoor seating.',
                cuisine: 'Cafes',
                city: 'Haifa',
                priceRange: '$$',
                vibes: ['Outdoor Seating', 'Hidden Gems'],
                tags: ['coffee', 'breakfast', 'pastries']
            },
            {
                name: 'Sweet Lab',
                description: 'Creative desserts, cakes, and sweet plates for a fun night out.',
                cuisine: 'Desserts',
                city: 'Herzliya',
                priceRange: '$$',
                vibes: ['With Friends', 'Date Night'],
                tags: ['dessert', 'cakes', 'sweet']
            },
            {
                name: 'Verde',
                description: 'Fresh vegan dishes, colorful salads, and healthy plates with seasonal ingredients.',
                cuisine: 'Vegan',
                city: 'Tel Aviv',
                priceRange: '$$',
                vibes: ['Outdoor Seating', 'Family Dinner'],
                tags: ['vegan', 'healthy', 'fresh']
            },
            {
                name: 'Casa Mexicana',
                description: 'Mexican street food, tacos, nachos, and colorful cocktails.',
                cuisine: 'Mexican',
                city: 'Netanya',
                priceRange: '$$',
                vibes: ['With Friends', 'Trendy Bars'],
                tags: ['tacos', 'nachos', 'cocktails']
            },
            {
                name: 'Skyline Lounge',
                description: 'Rooftop cocktails, city views, and elegant evening food.',
                cuisine: 'Cocktails',
                city: 'Tel Aviv',
                priceRange: '$$$',
                vibes: ['Rooftop Views', 'Trendy Bars'],
                tags: ['rooftop', 'cocktails', 'views']
            },
            {
                name: 'Sunset Burgers',
                description: 'Casual burger spot with loaded fries and a fun dinner atmosphere.',
                cuisine: 'Burgers',
                city: 'Ashdod',
                priceRange: '$$',
                vibes: ['Family Dinner', 'With Friends'],
                tags: ['burgers', 'fries', 'casual']
            },
            {
                name: 'Matcha Garden',
                description: 'Modern cafe with matcha drinks, vegan pastries, and outdoor seating.',
                cuisine: 'Cafes',
                city: 'Eilat',
                priceRange: '$$',
                vibes: ['Hidden Gems', 'Outdoor Seating'],
                tags: ['matcha', 'coffee', 'vegan']
            }
        ]);

        const reviews = [
            { user: users[0]._id, restaurant: restaurants[0]._id, rating: 5, comment: 'Amazing pasta and a really cozy atmosphere.' },
            { user: users[1]._id, restaurant: restaurants[0]._id, rating: 4, comment: 'Great food and service, perfect for dinner.' },
            { user: users[2]._id, restaurant: restaurants[1]._id, rating: 5, comment: 'Fresh, fast, and very tasty.' },
            { user: users[0]._id, restaurant: restaurants[1]._id, rating: 4, comment: 'Good Asian food and fun vibe.' },
            { user: users[1]._id, restaurant: restaurants[2]._id, rating: 4, comment: 'Solid burger and great fries.' },
            { user: users[2]._id, restaurant: restaurants[2]._id, rating: 5, comment: 'Exactly what I wanted for comfort food.' },
            { user: users[0]._id, restaurant: restaurants[3]._id, rating: 5, comment: 'Lovely cafe, great coffee and pastries.' },
            { user: users[1]._id, restaurant: restaurants[4]._id, rating: 5, comment: 'Beautiful desserts and very fun presentation.' },
            { user: users[2]._id, restaurant: restaurants[5]._id, rating: 4, comment: 'Fresh vegan food, surprisingly filling.' },
            { user: users[0]._id, restaurant: restaurants[6]._id, rating: 5, comment: 'Tacos were excellent and the place is colorful.' },
            { user: users[1]._id, restaurant: restaurants[7]._id, rating: 4, comment: 'Great view and cocktails.' },
            { user: users[2]._id, restaurant: restaurants[8]._id, rating: 4, comment: 'Good family dinner spot.' },
            { user: users[0]._id, restaurant: restaurants[9]._id, rating: 5, comment: 'Feels special and different from regular restaurants.' }
        ];

        await Review.insertMany(reviews);

        for (const restaurant of restaurants) {
            const restaurantReviews = reviews.filter(
                (review) => review.restaurant.toString() === restaurant._id.toString()
            );

            const averageRating =
                restaurantReviews.reduce((sum, review) => sum + review.rating, 0) /
                restaurantReviews.length;

            restaurant.rating = Number(averageRating.toFixed(1));
            restaurant.reviewCount = restaurantReviews.length;
            await restaurant.save();
        }

        users[0].savedRestaurants = [
            restaurants[0]._id,
            restaurants[1]._id,
            restaurants[7]._id
        ];

        users[1].savedRestaurants = [
            restaurants[3]._id,
            restaurants[4]._id,
            restaurants[5]._id
        ];

        users[2].savedRestaurants = [
            restaurants[2]._id,
            restaurants[6]._id,
            restaurants[9]._id
        ];

        await Promise.all(users.map((user) => user.save()));

        console.log('Seed data inserted successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
};

seedData();