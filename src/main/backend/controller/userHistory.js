const {userHistory} = require('../model/userHistory');

const getUserHistoryData = async (req, res) => {
    const { userId, dataType} = req.params;

    try {
        const userHistory = await userHistory.findAll({
            where: { userId },
            attributes: ['date', dataType],
            order: [['date', 'ASC']]
        });

        const data = userHistory.map(record => record[dataType]);
        const dates = userHistory.map(record => record.date);
        res.json({ data, dates });

    } catch (error) {
        console.error('Error fetching user history', error);
        res.status(500).send('Internal server error');
    }
};

module.exports = { getUserHistoryData };