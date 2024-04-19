'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const exercises = [
            { name: 'Deadlift', type: 'Strength', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Pull-up', type: 'Back', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Barbell Row', type: 'Back', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Squat', type: 'Legs', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Bench Press', type: 'Chest', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Push Up', type: 'Strength', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Overhead Press', type: 'Shoulders', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Romanian Deadlift', type: 'Legs', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Lunges', type: 'Legs', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Dumbbell Row', type: 'Back', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Leg Press', type: 'Legs', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Dumbbell Bench Press', type: 'Chest', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Lat Pulldown', type: 'Back', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Dumbbell Shoulder Press', type: 'Shoulders', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Hammer Curl', type: 'Arms', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Tricep Dip', type: 'Arms', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Plank', type: 'Core', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Russian Twist', type: 'Core', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Calf Raise', type: 'Legs', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Leg Curl', type: 'Legs', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Chest Fly', type: 'Chest', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Incline Bench Press', type: 'Chest', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Seated Row', type: 'Back', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Face Pull', type: 'Shoulders', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Barbell Curl', type: 'Arms', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Skull Crusher', type: 'Arms', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Ab Crunch', type: 'Core', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Side Plank', type: 'Core', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Standing Calf Raise', type: 'Legs', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Leg Extension', type: 'Legs', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Pec Deck', type: 'Chest', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Decline Bench Press', type: 'Chest', createdAt: new Date(), updatedAt: new Date() },
            // Agrega más ejercicios aquí si es necesario
        ];
        return queryInterface.bulkInsert('Exercises', exercises, {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Exercises', null, {});
    }
};