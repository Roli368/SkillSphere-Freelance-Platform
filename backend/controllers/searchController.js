import Gig from '../models/Gig.js';
import FreelancerProfile from '../models/FreelancerProfile.js';

export const searchGigs = async (req, res) => {
  try {
    const { keyword, category, minBudget, maxBudget, experienceLevel } = req.query;
    let query = { status: 'Open' };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }
    if (category) query.category = category;
    if (experienceLevel) query.experienceLevel = experienceLevel;
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = Number(minBudget);
      if (maxBudget) query.budget.$lte = Number(maxBudget);
    }

    const gigs = await Gig.find(query).populate('client', 'fullName');
    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchFreelancers = async (req, res) => {
  try {
    const { skill, minRating, minHourly, maxHourly } = req.query;
    let query = {};

    if (skill) {
      query['skills.name'] = { $regex: skill, $options: 'i' };
    }
    if (minRating) query.rating = { $gte: Number(minRating) };
    if (minHourly || maxHourly) {
      query.hourlyRate = {};
      if (minHourly) query.hourlyRate.$gte = Number(minHourly);
      if (maxHourly) query.hourlyRate.$lte = Number(maxHourly);
    }

    const freelancers = await FreelancerProfile.find(query).populate('user', 'fullName email avatar isVerified');
    res.status(200).json(freelancers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
