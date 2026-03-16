const User = require("../models/User");

exports.findVerifiedUsers = () => {
  return User.findAll({
    where: {
      is_verified: true,
    },
    attributes: {
      exclude: [
        "password",
        "deleted_at",
        "is_verified",
        "verification_token",
        "verification_token_expiry",
      ],
    },
  });
};

exports.findUserById = async (id) => {
  return User.findOne({
    where: {
      id,
      is_verified: true
    },
    attributes: {
      exclude: [
        'password',
        'deleted_at',
        'is_verified',
        'verification_token',
        'verification_token_expiry'
      ]
    }
  })
}

exports.createUser = async (payload) => {
  return User.create(payload);
}

exports.findUserByEmail = (email) => {
  return User.findOne({
    where: { email }
  });
};

exports.updateUser = async (id, payload) => {
  return User.update(payload, {
    where : {
      id,
      is_verified: true
    }
  });
};

exports.deleteUser = async (id) => {
  return User.destroy({
    where: {
      id
    }
  });
};

exports.restoreUser = async (id) => {
  return User.restore({
    where: {
      id
    }
  });
};