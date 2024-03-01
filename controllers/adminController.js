const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.adminRegister = async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const admin = await newAdmin.save();
    res.status(201).json({ message: `Admin crée ${admin}` });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json(err);
  }
};

// user Login
exports.adminLogin = async (req, res) => {
  try {
    // On récupère l'utilisateur par email
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      // Il est souvent préférable de donner une réponse ambiguë pour des raisons de sécurité
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Comparer le mot de passe fourni avec le mot de passe haché stocké
    const isMatch = await bcrypt.compare(req.body.password, admin.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Création du payload pour JWT
    const payload = {
      id: admin.id,
      email: admin.email,
      role: admin.role ? "admin" : "user", // Assurez-vous que le rôle est correctement défini
    };

    // Générer un JWT
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: "10h", // Définir une durée de vie appropriée pour le token
    });

    // Envoi du token
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Une erreur s'est produite lors du traitement" });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      res.status(404).json({ message: "Admin non trouvé" });
    } else {
      const updatedAdmin = await Admin.findByIdAndUpdate(adminId, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(updatedAdmin);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
