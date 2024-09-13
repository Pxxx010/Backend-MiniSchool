const escola = require('../models/escolaModel');
const User = require('../models/userModel');

exports.getEscola = async (req, res) => {
  try {
    const users = await escola.find().populate('user');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEscolaById = async (req, res) => {
  try {
    const users = await escola.findById(req.params.id).populate('user');
    if (!users) {
      return res.status(404).json({ message: 'Cadastro não encontrada' });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEscola = async (req, res) => {
  try {
    const users = new escola(req.body);
    await users.save();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateEscola = async (req, res) => {
  try {
    const users = await escola.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!users) {
      return res.status(404).json({ message: 'Cadastro não encontrada' });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEscola = async (req, res) => {
  try {
    await escola.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cadastro deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEscolaByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verifique se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Encontre todas as plantações associadas a esse usuário
    const users = await escola.find({ user: userId });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

console.log("escolaController OK");