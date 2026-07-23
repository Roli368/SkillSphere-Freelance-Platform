import express from "express";

import {
toggleFavorite,
getFavorites,
} from "../controllers/favoriteController.js";

import {
protect,
} from "../middleware/authMiddleware.js";

const router=express.Router();

router.get(
"/",
protect,
getFavorites
);

router.post(
"/:gigId",
protect,
toggleFavorite
);

export default router;