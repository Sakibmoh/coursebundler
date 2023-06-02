import express from 'express';
import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from '../controllers/userController.js';
import { authorizeAdmin, isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

// register
router.route('/register').post(singleUpload, register);
// Login
router.route('/login').post(login);

// Logout
router.route('/logout').get(logout);
// Get my profile
router.route('/me').get(isAuthenticated, getMyProfile);

// Delete my profile
router.route('/me').delete(isAuthenticated, deleteMyProfile);
// Change Password

router.route('/changepassword').put(isAuthenticated, changePassword);

// Update profile
router.route('/updateprofile').put(isAuthenticated, updateProfile);

// Update profile picture

router
  .route('/updateprofilepicture')
  .put(isAuthenticated, singleUpload, updateProfilePicture);

router.route('/forgetpassword').post(forgetPassword);
router.route('/resetpassword/:token').put(resetPassword);
router.route('/addtoplaylist').post(isAuthenticated, addToPlaylist);
router.route('/removefromplaylist').delete(isAuthenticated, removeFromPlaylist);

// Admin Routes
router.route('/admin/users').get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route('/admin/user/:id')
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);
export default router;
