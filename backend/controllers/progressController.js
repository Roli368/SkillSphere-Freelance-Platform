import ProjectProgress from '../models/ProjectProgress.js';

export const getProgress = async (req, res) => {
  try {
    const progress = await ProjectProgress.findOne({ gig: req.params.gigId });
    if (!progress) return res.status(404).json({ message: 'Progress not found' });
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCompletionPercentage = async (req, res) => {
  try {
    const { percentage } = req.body;
    const progress = await ProjectProgress.findOneAndUpdate(
      { gig: req.params.gigId },
      { completionPercentage: percentage },
      { new: true }
    );
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProgressLog = async (req, res) => {
  try {
    const { message } = req.body;
    const progress = await ProjectProgress.findOneAndUpdate(
      { gig: req.params.gigId },
      { $push: { progressLogs: { message } } },
      { new: true }
    );
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMilestoneFile = async (req, res) => {
  try {
    const { milestoneId, fileUrl, fileName } = req.body;
    const progress = await ProjectProgress.findOneAndUpdate(
      { gig: req.params.gigId, "milestones._id": milestoneId },
      { $push: { "milestones.$.files": { name: fileName, url: fileUrl } } },
      { new: true }
    );
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
