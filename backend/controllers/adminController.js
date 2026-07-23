import User from '../models/User.js';
import FreelancerProfile from '../models/FreelancerProfile.js';
import Gig from '../models/Gig.js';
import AdminAnalytics from '../models/AdminAnalytics.js';

export const manageUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const suspendAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    res.status(200).json({ message: 'User suspended', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyFreelancer = async (req, res) => {
  try {
    const profile = await FreelancerProfile.findOneAndUpdate(
      { user: req.params.id }, 
      { verificationBadge: true }, 
      { new: true }
    );
    res.status(200).json({ message: 'Freelancer verified', profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const approveGig = async (req, res) => {
  try {
    // Assuming gigs need approval before being public
    const gig = await Gig.findByIdAndUpdate(req.params.id, { status: 'Open' }, { new: true });
    res.status(200).json({ message: 'Gig approved', gig });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdminAnalytics = async (req, res) => {
  try {
    const analytics = await AdminAnalytics.findOne().sort({ createdAt: -1 });
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
