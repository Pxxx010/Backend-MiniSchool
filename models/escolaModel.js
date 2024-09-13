const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const escolaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ['aluno', 'professor', 'coordenador'], required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

escolaSchema.pre('save', async function(next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

escolaSchema.methods.comparePassword = function(senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('escola', escolaSchema);


console.log("escolaModel OK");