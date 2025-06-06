import Restaurant from '../models/RestaurantModel.js';
import { Op } from 'sequelize';

// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
};

// Get all restaurants with optional filtering and distance calculation
export const getRestaurants = async (req, res) => {
    try {
        const { 
            cuisine, 
            priceRange, 
            search, 
            userLat, 
            userLon, 
            radius = 10, // default 10km radius
            page = 1, 
            limit = 10,
            sortBy = 'distance' // distance, rating, price
        } = req.query;
        
        let whereClause = {};
        
        // Filter by cuisine if provided
        if (cuisine) {
            whereClause.cuisine = cuisine;
        }
        
        // Filter by price range
        if (priceRange) {
            whereClause.priceRange = priceRange;
        }
        
        // Search by restaurant name
        if (search) {
            whereClause.name = { [Op.like]: `%${search}%` };
        }
        
        // Only show open restaurants
        whereClause.isOpen = true;
        
        // Get all restaurants first
        const allRestaurants = await Restaurant.findAll({
            where: whereClause
        });
        
        // Calculate distance if user location is provided
        let restaurantsWithDistance = allRestaurants.map(restaurant => {
            const restaurantData = restaurant.get({ plain: true });
            
            if (userLat && userLon) {
                const distance = calculateDistance(
                    parseFloat(userLat), 
                    parseFloat(userLon),
                    parseFloat(restaurant.latitude), 
                    parseFloat(restaurant.longitude)
                );
                restaurantData.distance = Math.round(distance * 100) / 100; // Round to 2 decimal places
            }
            
            return restaurantData;
        });
        
        // Filter by radius if user location is provided
        if (userLat && userLon) {
            restaurantsWithDistance = restaurantsWithDistance.filter(
                restaurant => restaurant.distance <= radius
            );
        }
        
        // Sort restaurants
        if (sortBy === 'distance' && userLat && userLon) {
            restaurantsWithDistance.sort((a, b) => a.distance - b.distance);
        } else if (sortBy === 'rating') {
            restaurantsWithDistance.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'price') {
            restaurantsWithDistance.sort((a, b) => a.averagePrice - b.averagePrice);
        }
        
        // Pagination
        const offset = (page - 1) * limit;
        const totalItems = restaurantsWithDistance.length;
        const paginatedRestaurants = restaurantsWithDistance.slice(offset, offset + parseInt(limit));
        
        res.status(200).json({
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: parseInt(page),
            restaurants: paginatedRestaurants
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get single restaurant by ID
export const getRestaurantById = async (req, res) => {
    try {
        const { userLat, userLon } = req.query;
        const restaurant = await Restaurant.findByPk(req.params.id);
        
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        
        const restaurantData = restaurant.get({ plain: true });
        
        // Calculate distance if user location is provided
        if (userLat && userLon) {
            const distance = calculateDistance(
                parseFloat(userLat), 
                parseFloat(userLon),
                parseFloat(restaurant.latitude), 
                parseFloat(restaurant.longitude)
            );
            restaurantData.distance = Math.round(distance * 100) / 100;
        }
        
        res.status(200).json(restaurantData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Search restaurants by name
export const searchRestaurants = async (req, res) => {
    try {
        const { query, userLat, userLon } = req.query;
        
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        
        const restaurants = await Restaurant.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { cuisine: { [Op.like]: `%${query}%` } },
                    { address: { [Op.like]: `%${query}%` } }
                ],
                isOpen: true
            },
            limit: 10
        });
        
        // Add distance calculation if user location provided
        const restaurantsWithDistance = restaurants.map(restaurant => {
            const restaurantData = restaurant.get({ plain: true });
            
            if (userLat && userLon) {
                const distance = calculateDistance(
                    parseFloat(userLat), 
                    parseFloat(userLon),
                    parseFloat(restaurant.latitude), 
                    parseFloat(restaurant.longitude)
                );
                restaurantData.distance = Math.round(distance * 100) / 100;
            }
            
            return restaurantData;
        });
        
        // Sort by distance if user location is provided
        if (userLat && userLon) {
            restaurantsWithDistance.sort((a, b) => a.distance - b.distance);
        }
        
        res.status(200).json(restaurantsWithDistance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get restaurant cuisines
export const getCuisines = async (req, res) => {
    try {
        const cuisines = await Restaurant.findAll({
            attributes: ['cuisine'],
            group: ['cuisine'],
            where: { isOpen: true }
        });
        
        res.status(200).json(cuisines.map(item => item.cuisine));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get nearby restaurants (within specific radius)
export const getNearbyRestaurants = async (req, res) => {
    try {
        const { userLat, userLon, radius = 5 } = req.query;
        
        if (!userLat || !userLon) {
            return res.status(400).json({ message: 'User location (userLat, userLon) is required' });
        }
        
        const restaurants = await Restaurant.findAll({
            where: { isOpen: true }
        });
        
        // Filter restaurants within radius and add distance
        const nearbyRestaurants = restaurants
            .map(restaurant => {
                const restaurantData = restaurant.get({ plain: true });
                const distance = calculateDistance(
                    parseFloat(userLat), 
                    parseFloat(userLon),
                    parseFloat(restaurant.latitude), 
                    parseFloat(restaurant.longitude)
                );
                restaurantData.distance = Math.round(distance * 100) / 100;
                return restaurantData;
            })
            .filter(restaurant => restaurant.distance <= radius)
            .sort((a, b) => a.distance - b.distance);
        
        res.status(200).json(nearbyRestaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
