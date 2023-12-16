const WorkoutsModel = require('../models/workoutsModel')  // import the model
const mongoose = require('mongoose')  // import mongoose

const workoutController = {
    // GET /workouts
    async getAllWorkouts(req, res) {
        const workouts = await WorkoutsModel.find({}).sort({createdAt: -1});  // find all workouts
        res.status(200).json({ workouts });  // return the workouts
    },
    // GET /workouts by  id
    async getWorkoutById(req, res) {
        const id = req.params.id;  // get the id from the url

        if (!mongoose.Types.ObjectId.isValid(id)) {  // check if the id is valid
          res.status(400).json({ error: 'Invalid ID' });
            return;  
        }
        const workout = await WorkoutsModel.findById(id);  // find the workout by id
        
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }

        res.status(200).json({ workout });  // return the workout
    },
    // POST /workouts
     async createWorkout(req, res) {
        const { title, load, reps } = req.body;
        try {
            const workout = await WorkoutsModel.create({ title, load, reps });
            res.status(200).json({ workout });
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    },
    // UPDATE /workouts/:id 
    async updateWorkout(req, res) {
        const id = req.params.id;  // get the id from the url

        if (!mongoose.Types.ObjectId.isValid(id)) {  // check if the id is valid
          res.status(400).json({ error: 'Invalid ID' });
            return;  
        }
        const workout = await WorkoutsModel.findByIdAndUpdate(id, req.body, { new: true });  // find the workout by id
        
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }

        res.status(200).json({ workout });  // return the workout
    },
    // DELETE /workouts/:id
    async deleteWorkout(req, res) {
        const id = req.params.id;  // get the id from the url

        if (!mongoose.Types.ObjectId.isValid(id)) {  // check if the id is valid
          res.status(400).json({ error: 'Invalid ID' });
            return;  
        }
        const workout = await WorkoutsModel.findByIdAndDelete(id);  // find the workout by id
        
        if (!workout) {
            res.status(404).json({ error: 'Workout not found' });
            return;
        }

        res.status(200).json({ workout });  // return the workout
    }
}
module.exports = workoutController;  // export the controller