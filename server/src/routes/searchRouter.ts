import express, { Router } from 'express';
import searchController from '../controllers/searchController';

const searchRouter: Router = express.Router();

searchRouter.get('/places', searchController.searchPlaces);
searchRouter.get('/places/:placeId', searchController.getPlaceDetails);

export default searchRouter;