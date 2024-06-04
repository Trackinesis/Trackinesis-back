const Friend = require('../model/friend'); // Assuming your friend model

exports.createFriend = async (req, res) => {
  try {
    const newFriend = await Friend.create(req.body);
    res.status(201).json(newFriend);
  } catch (error) {
    res.status(500).json({ message: 'Error creating friend', error });
  }
};

exports.getAllFriends = async (req, res) => {
  try {
    const friends = await Friend.findAll();
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching friends', error });
  }
};

exports.getFriendById = async (req, res) => {
  try {
    const friend = await Friend.findByPk(req.params.id);
    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }
    res.status(200).json(friend);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching friend', error });
  }
};

exports.updateFriend = async (req, res) => {
  try {
    const [updated] = await Friend.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: 'Friend not found' });
    }
    res.status(200).json({ message: 'Friend updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating friend', error });
  }
};

exports.deleteFriend = async (req, res) => {
  try {
    const deleted = await Friend.destroy({
      where: { id: req.params.id }, // Assuming your friend model has an "id" field
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Friend not found' });
    }
    res.status(200).json({ message: 'Friend deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting friend', error });
  }
};