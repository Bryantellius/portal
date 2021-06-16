import db from '../db/models/index';

const submitExercise = async (req, res) => {
  const exercise = req.body;
  const created = await db.ExerciseSubmission.create(exercise);

  return res.json(created);
};

const updateExerciseSubmission = async (req, res) => {
  const exercise = req.body;
  exercise.id = req.params.id;

  const updated = await db.ExerciseSubmission.update(exercise);

  return res.json(updated);
};

export default {
  submitExercise,
  updateExerciseSubmission
};