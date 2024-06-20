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
import {
  createNewAnimal,
  createNewRace,
  deleteAnimal,
  deleteRace,
  getAllAnimaux,
  getAllRaces,
} from "./src/controllers/races";
import {
  createNewAvis,
  createNewSujet,
  deleteAvis,
  deleteSujet,
  getAllAvis,
  getAllSujets,
} from "./src/controllers/avis";
import {
  createNewTicket,
  deleteTicket,
  getAllTickets,
} from "./src/controllers/tickets";
import {
  createNewNourriture,
  deleteNourriture,
  getAllNourritures,
} from "./src/controllers/nourritures";
import multer from "multer";

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

router.post("/createuser", upload.single("file"), createNewUser(userModel));
router.post("/createrole", createNewRole(userModel));
router.post("/createrace", createNewRace(racesModel));
router.post("/createanimal", createNewAnimal(racesModel));
router.post("/createavis", createNewAvis(avisModel));
router.post("/createsujet", createNewSujet(avisModel));
router.post("/createticket", createNewTicket(ticketsModel));
router.post("/createnourriture", createNewNourriture(nourrituresModel));

router.delete("/deluser/:id", deleteUser(userModel));
router.delete("/delrole/:id", deleteRole(userModel));
router.delete("/delrace/:id", deleteRace(racesModel));
router.delete("/delanimal/:id", deleteAnimal(racesModel));
router.delete("/delavis/:id", deleteAvis(avisModel));
router.delete("/delsujet/:id", deleteSujet(avisModel));
router.delete("/delticket/:id", deleteTicket(ticketsModel));
router.delete("/delnourriture/:id", deleteNourriture(nourrituresModel));

export default router;
