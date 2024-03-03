const express = require("express");
const router = express.Router();

const repositoryController = require("../controllers/repository.js");
const check = require("../middlewares/auth.js");

/* router.get("/get/:id", check.auth, repositoryController.getRepository);
router.get(
  "/getRepo/:id",
  check.auth,
  repositoryController.getPublicRepository
); */
router.post("/create", check.auth, repositoryController.create);
router.get(
  "/listByDate/:type/:page?",
  check.auth,
  repositoryController.listByDate
);
router.get(
  "/listByName/:type/:page?",
  check.auth,
  repositoryController.listByName
);
router.get(
  "/listByRate/:type/:page?",
  check.auth,
  repositoryController.listByRate
);
router.get(
  "/listAllByRate/:page?",
  check.auth,
  repositoryController.listAllByRate
);
router.get(
  "/listAllByDate/:page?",
  check.auth,
  repositoryController.listAllByDate
);
router.get(
  "/listAllByName/:page?",
  check.auth,
  repositoryController.listAllByName
);
router.post(
  "/searchByName/:page?",
  check.auth,
  repositoryController.searchRepositories
);
router.get("/mine/:page?", check.auth, repositoryController.myRepositories);
router.get(
  "/listPending/:page?",
  check.auth,
  repositoryController.listPendingOnes
);
router.put("/changeStatus", check.auth, repositoryController.changeState);

module.exports = router;
