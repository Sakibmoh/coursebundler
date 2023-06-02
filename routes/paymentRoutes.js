import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import {
  buySubscription,
  cancelSubscription,
  getRazorPayKey,
  paymentVerification,
} from '../controllers/paymentController.js';

const router = express.Router();

// buy subscription
router.route('/subscribe').get(isAuthenticated, buySubscription);

// get razorpay key

router.route('/razorpaykey').get(getRazorPayKey);

// verify payment and save refrence in database
router.route('/paymentverification').post(isAuthenticated, paymentVerification);

// Cancel Subscription
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);

export default router;
