const User = require("../auth/auth.model");
const ApiError = require("../../utils/ApiError");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role, status } = req.body;
    if (!name || !email || !password || !role) {
      throw new ApiError(400, "Missing required fields");
    }
    const existing = await User.findOne({ email });
    if (existing) {
      throw new ApiError(400, "User already exists with this email");
    }
    const user = new User({ name, email, password, role, status: status || "Active" });
    await user.save();
    res.status(201).json({ success: true, user: user.toSafeObject() });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!role) {
      throw new ApiError(400, "Role is required");
    }
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    user.role = role;
    await user.save();
    res.json({ success: true, user: user.toSafeObject() });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateRole
};
