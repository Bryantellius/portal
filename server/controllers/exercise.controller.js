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

const getExerciseSubmissions = async (req, res) => {
  let findOptions = {
    include: [{
      model: db.User,
      where: req.params.userId
        ? {
          id: req.params.userId
        } : undefined
    }, {
      model: db.Exercise,
      include: {
        model: db.Lecture
      }
    }]
  };

  const submissions = await db.ExerciseSubmission.findAll(findOptions);

  res.json(submissions);
};

const approveSubmission = async (req, res) => {
  const updateResult = await db.ExerciseSubmission.update({
    hasBeenReviewed: true
  }, {
    where: {
      id: req.params.id
    }
  });

  res.json(updateResult);
};

const findSubmissionById = async (req, res) => {
  const submission = await db.ExerciseSubmission.findOne({
    where: {
      id: req.params.id
    },
    include: [
      db.User,
      {
        model: db.Exercise,
        include: [
          db.Lecture
        ]
      }
    ]
  });

  res.json(submission);
};

export default {
  submitExercise,
  updateExerciseSubmission,
  getExerciseSubmissions,
  approveSubmission,
  findSubmissionById
};
