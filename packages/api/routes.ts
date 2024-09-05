import { Router } from "express";
import {
  createNewRole,
  createNewUser,
  deleteRole,
  deleteUser,
  getAllRoles,
  getAllUsers,
} from "./src/controllers/user";
import * as userModel from "./src/models/user";
import * as racesModel from "./src/models/races";
import * as avisModel from "./src/models/avis";
import * as ticketsModel from "./src/models/tickets";
import * as nourrituresModel from "./src/models/nourritures";
import * as photosModel from "./src/models/photos";
import * as stockModel from "./src/models/stock";
import * as commandesModel from "./src/models/commandes";

import {
  createNewAnimal,
  createNewRace,
  deleteAnimal,
  deleteRace,
  getAllAnimaux,
  getAllRaces,
  updateAnimalById,
  updateRaceById,
} from "./src/controllers/races";
import {
  createNewAvis,
  createNewSujet,
  deleteAvis,
  deleteSujet,
  getAllAvis,
  getAllSujets,
  updateAvisById,
  updateSujetById,
} from "./src/controllers/avis";
import {
  createNewTicket,
  deleteTicket,
  getAllTickets,
  updateTicketById,
} from "./src/controllers/tickets";
import {
  createNewNourriture,
  deleteNourriture,
  getAllNourritures,
  updateNourritureById,
} from "./src/controllers/nourritures";
import {
  deletePhoto,
  getAllPhotos,
  getPhotosCategorie,
  uploadImage,
} from "./src/controllers/photos";
import multer from "multer";
import {
  createNewStock,
  deleteStock,
  getAllStock,
  getStockActuel,
  updateStockById,
} from "./src/controllers/stock";
import {
  createNewCommande,
  deleteCommande,
  getAllCommandes,
  updateCommandeById,
} from "./src/controllers/commandes";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/users", getAllUsers(userModel));
router.get("/roles", getAllRoles(userModel));
router.get("/races", getAllRaces(racesModel));
router.get("/animaux", getAllAnimaux(racesModel));
router.get("/avis", getAllAvis(avisModel));
router.get("/sujets", getAllSujets(avisModel));
router.get("/tickets", getAllTickets(ticketsModel));
router.get("/nourritures", getAllNourritures(nourrituresModel));
router.get("/photos", getAllPhotos(photosModel));
router.get("/stock", getAllStock(stockModel));
router.get("/commandes", getAllCommandes(commandesModel));
router.get("/stockactuel", getStockActuel(stockModel));
router.get("/photoscategorie", getPhotosCategorie(photosModel));

router.post("/createuser", upload.single("file"), createNewUser(userModel));
router.post("/createrole", createNewRole(userModel));
router.post("/createrace", createNewRace(racesModel));
router.post("/createanimal", createNewAnimal(racesModel));
router.post("/createavis", createNewAvis(avisModel));
router.post("/createsujet", createNewSujet(avisModel));
router.post("/createticket", createNewTicket(ticketsModel));
router.post("/createnourriture", createNewNourriture(nourrituresModel));
router.post("/uploadfile", upload.single("file"), uploadImage(photosModel));
router.post("/createstock", createNewStock(stockModel));
router.post("/createcommande", createNewCommande(commandesModel));

router.post("/updaterace", updateRaceById(racesModel));
router.post("/updateanimal", updateAnimalById(racesModel));
router.post("/updateticket", updateTicketById(ticketsModel));
router.post("/updateavis", updateAvisById(avisModel));
router.post("/updatesujet", updateSujetById(avisModel));
router.post("/updatenourriture", updateNourritureById(nourrituresModel));
router.post("/updatestock", updateStockById(stockModel));
router.post("/updatecommande", updateCommandeById(commandesModel));

router.delete("/deluser/:id", deleteUser(userModel));
router.delete("/delrole/:id", deleteRole(userModel));
router.delete("/delrace/:id", deleteRace(racesModel));
router.delete("/delanimal/:id", deleteAnimal(racesModel));
router.delete("/delavis/:id", deleteAvis(avisModel));
router.delete("/delsujet/:id", deleteSujet(avisModel));
router.delete("/delticket/:id", deleteTicket(ticketsModel));
router.delete("/delnourriture/:id", deleteNourriture(nourrituresModel));
router.delete("/delphotos/:id", deletePhoto(photosModel));
router.delete("/delstock/:id", deleteStock(stockModel));
router.delete("/delcommande/:id", deleteCommande(commandesModel));

export default router;
