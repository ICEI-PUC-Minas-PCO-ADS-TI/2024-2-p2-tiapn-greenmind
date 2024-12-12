// const router = require('express').Router();
const { Router } = require("express");
const router = Router();
const formularioController = require("../controllers/formularioController");

router.get("/formulario", (req, res) => {
  const respFormulario = formularioController.getFormulario();
  respFormulario
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(400).json(error));
});

router.post("/formulario", (req, res) => {
  res.send("chegou aqui, POST");
});

module.exports = router;
