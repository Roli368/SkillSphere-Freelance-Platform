import FreelancerAnalytics from '../models/FreelancerAnalytics.js';

export const getFreelancerAnalytics = async (req, res) => {
  try {
    const analytics = await FreelancerAnalytics.findOne({ freelancer: req.params.freelancerId });
    if (!analytics) return res.status(404).json({ message: 'Analytics not found' });
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const incrementProfileViews = async (req, res) => {
  try {
    const analytics = await FreelancerAnalytics.findOneAndUpdate(
      { freelancer: req.params.freelancerId },
      { $inc: { profileViews: 1 } },
      { new: true, upsert: true }
    );
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
