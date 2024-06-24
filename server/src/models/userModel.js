const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// crear usuario en la base de datos
const createUser = async (email, password, rol, lenguage) => {
  const hashedPassword = await hashPassword(password);
  const res = await pool.query(
    `INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *`,
    [email, hashedPassword, rol, lenguage]
  );
  return res.rows[0];
};

const findUserByEmail = async (email) => {
  const res = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [
    email,
  ]);
  return res.rows[0];
};

const findUserById = async (id) => {
  const res = await pool.query(`SELECT * FROM usuarios WHERE id = $1`, [id]);
  return res.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
