const userRepository = require("../repositories/userRepository");
const AppError = require("../utils/AppError");
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../utils/emailMessage.util");

const getUsers = async () => {
  const users = await userRepository.findVerifiedUsers();
  if (!users || users.length === 0) {
    throw new AppError("User is empty!", 404);
  }
  return users;
};

const getUserById = async (id) => {
  const user = await userRepository.findUserById(id);
  if(!user) {
    throw new AppError("User not found!", 404);
  }
  return user;
}

const createUser = async (payload) => {
  const existingUser = await userRepository.findUserByEmail(payload.email);
  if (existingUser && existingUser.is_verified) {
    throw new AppError("Your email is already registered", 409);
  }
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(payload.password, salt);
  const verificationToken = uuidv4();
  const verificationTokenHash = await bcrypt.hash(verificationToken, salt);
  const verificationTokenExpiry = new Date(
    Date.now() + 60 * 60 * 1000
  );
  if (existingUser && !existingUser.is_verified) {
    existingUser.password = passwordHash;
    existingUser.verification_token = verificationTokenHash;
    existingUser.verification_token_expiry = verificationTokenExpiry;

    await existingUser.save();

    await sendEmail(
      existingUser.email,
      `http://localhost:5173/verify/${existingUser.id}/${verificationToken}`,
      existingUser.name
    );

    return {
      id: existingUser.id,
      message: "Verification email sent again"
    };
  }
  const user = await userRepository.createUser({
    ...payload,
    password: passwordHash,
    verification_token: verificationTokenHash,
    verification_token_expiry: verificationTokenExpiry
  });
  await sendEmail(
    user.email,
    `http://localhost:5173/verify/${user.id}/${verificationToken}`,
    user.name
  );
  return {
    id: user.id,
    message: "User created. Please verify your email."
  };
};

const updateUser = async (id, payload) => {
  const updatePayload = { ...payload };
  if (payload.password) {
    const salt = await bcrypt.genSalt(10);
    updatePayload.password = await bcrypt.hash(payload.password, salt);
  }
  if (payload.email) {
    updatePayload.email = payload.email;
    updatePayload.is_verified = false;
  }
  const [affectedCount] = await userRepository.updateUser(id, updatePayload);
  if (affectedCount === 0) {
    throw new AppError(
      "Update failed. User not found or not verified!",
      404
    );
  }
};

const deleteUser = async (id, userId) => {
  const affectedCount = await userRepository.deleteUser(id);
  if(userId === id){
    throw new AppError("You cannot delete your own account",400)
  }
  if(!affectedCount) {
    throw new AppError(
      "Delete failed. User not found or not verified!",
      404
    )
  }
};

const restoreUser = async (id) => {
  const affectedCount = userRepository.restoreUser(id);
  if(!affectedCount) {
    throw new AppError("Restore failed. User not found or not verified!", 404)
  }
};

const uploadFoto = async (id, imgUrl) => {
  const [ affectedCount ] = await userRepository.updateUser(id, imgUrl);
  if(affectedCount === 0) {
    throw new AppError(
      "Update failed. User not found or not verified!",
      404
    );
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  restoreUser,
  uploadFoto
}