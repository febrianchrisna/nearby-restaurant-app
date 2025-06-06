import express from 'express';
import { login, register, logout, getUser, updateUserProfile } from '../controller/UserController.js';
import {
    getRestaurants, getRestaurantById, searchRestaurants, 
    getCuisines, getNearbyRestaurants
} from '../controller/RestaurantController.js';
import { verifyToken } from '../middleware/AuthMiddleware.js';
import { refreshToken } from '../controller/RefreshToken.js';

const router = express.Router();

// ==================== AUTH ROUTES (untuk semua) ====================
router.post("/api/auth/login", login);
router.post("/api/auth/register", register);
router.get("/api/auth/logout", verifyToken, logout);
router.get("/api/auth/token", refreshToken);
router.get("/api/auth/profile", verifyToken, getUser);
router.put("/api/auth/profile", verifyToken, updateUserProfile);

// ==================== RESTAURANT ROUTES (public - read only) ====================
router.get("/api/restaurants", getRestaurants);
router.get("/api/restaurants/search", searchRestaurants);
router.get("/api/restaurants/nearby", getNearbyRestaurants);
router.get("/api/restaurants/cuisines", getCuisines);
router.get("/api/restaurants/:id", getRestaurantById);

// ==================== HEALTH CHECK ====================
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Restaurant Finder API is running' });
});

export default router;
