import { Router } from "express";
import {
  createNewRole,
  createNewUser,
  deleteRole,
  deleteUser,
  getAllRoles,
  getAllUsers,
  getUserBy,
  login,
} from "./src/controllers/user";
import * as userModel from "./src/models/user";
import * as racesModel from "./src/models/races";
import * as avisModel from "./src/models/avis";
import * as adresseModel from "./src/models/adresses";
import * as articlesModel from "./src/models/articles";
import * as photosModel from "./src/models/photos";
import * as stockModel from "./src/models/stock";
import * as commandesModel from "./src/models/commandes";
import * as loiModel from "./src/models/loi";

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
  createNewAdresse,
  deleteAdresse,
  getAllAdresses,
  updateAdressetById,
} from "./src/controllers/adresses";
import {
  createNewarticle,
  deletearticle,
  getAllarticles,
  updatearticleById,
} from "./src/controllers/articles";
import {
  deletePhoto,
  getAllPhotos,
  getPhotosCategorie,
  getPhotosArticles,
  getPhotosProduitsByCategorie,
  uploadImage,
  getPhotosByIdRace,
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
import { getLoiByTitre, updateLoiById } from "./src/controllers/loi";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/users", getAllUsers(userModel));
router.get("/getuserby", getUserBy(userModel));
router.get("/roles", getAllRoles(userModel));
router.get("/races", getAllRaces(racesModel));
router.get("/animaux", getAllAnimaux(racesModel));
router.get("/avis", getAllAvis(avisModel));
router.get("/sujets", getAllSujets(avisModel));
router.get("/adresses", getAllAdresses(adresseModel));
router.get("/articles/:categorieVentes?", getAllarticles(articlesModel));
router.get("/photos", getAllPhotos(photosModel));
router.get("/stock", getAllStock(stockModel));
router.get("/commandes", getAllCommandes(commandesModel));
router.get("/stockactuel", getStockActuel(stockModel));
router.get("/photoscategorie", getPhotosCategorie(photosModel));
router.get(
  "/getphotosarticles/:categorieVentes",
  getPhotosArticles(photosModel)
);
router.get("/photosproduits/:id", getPhotosProduitsByCategorie(photosModel));
router.get("/loi/:titre", getLoiByTitre(loiModel));
router.get("/photosraces/:id", getPhotosByIdRace(photosModel));

router.post("/login", login(userModel));
router.post("/createuser", upload.single("file"), createNewUser(userModel));
router.post("/createrole", createNewRole(userModel));
router.post("/createrace", createNewRace(racesModel));
router.post("/createanimal", createNewAnimal(racesModel));
router.post("/createavis", createNewAvis(avisModel));
router.post("/createsujet", createNewSujet(avisModel));
router.post("/createadresse", createNewAdresse(adresseModel));
router.post("/createarticle", createNewarticle(articlesModel));
router.post("/uploadfile", upload.single("file"), uploadImage(photosModel));
router.post("/createstock", createNewStock(stockModel));
router.post("/createcommande", createNewCommande(commandesModel));

router.post("/updaterace", updateRaceById(racesModel));
router.post("/updateanimal", updateAnimalById(racesModel));
router.post("/updateadresse", updateAdressetById(adresseModel));
router.post("/updateavis", updateAvisById(avisModel));
router.post("/updatesujet", updateSujetById(avisModel));
router.post("/updatearticle", updatearticleById(articlesModel));
router.post("/updatestock", updateStockById(stockModel));
router.post("/updatecommande", updateCommandeById(commandesModel));
router.post("/updateloi", updateLoiById(loiModel));

router.delete("/deluser/:id", deleteUser(userModel));
router.delete("/delrole/:id", deleteRole(userModel));
router.delete("/delrace/:id", deleteRace(racesModel));
router.delete("/delanimal/:id", deleteAnimal(racesModel));
router.delete("/delavis/:id", deleteAvis(avisModel));
router.delete("/delsujet/:id", deleteSujet(avisModel));
router.delete("/deladresse/:id", deleteAdresse(adresseModel));
router.delete("/delarticle/:id", deletearticle(articlesModel));
router.delete("/delphotos/:id", deletePhoto(photosModel));
router.delete("/delstock/:id", deleteStock(stockModel));
router.delete("/delcommande/:id", deleteCommande(commandesModel));

export default router;
