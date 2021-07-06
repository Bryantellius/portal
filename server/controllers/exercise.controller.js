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
      include: [
        db.Lecture,
        {
          model: db.ExerciseComment,
          include: [
            db.User
          ]
        }
      ]
    }]
  };

  const submissions = await db.ExerciseSubmission.findAll(findOptions);

  return res.json(submissions);
};

const approveSubmission = async (req, res) => {
  const updateResult = await db.ExerciseSubmission.update({
    hasBeenReviewed: true
  }, {
    where: {
      id: req.params.id
    }
  });

  return res.json(updateResult);
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
          db.Lecture,
          {
            model: db.ExerciseComment,
            include: [
              db.User
            ]
          }
        ]
      }
    ]
  });

  return res.json(submission);
};

const addComment = async (req, res) => {
  const {
    userId,
    id: exerciseId
  } = req.params;

  const {
    comment
  } = req.body;

  const result = await db.ExerciseComment.create({
    userId,
    exerciseId,
    text: comment
  });

  return res.json(result);
};

const addExerciseRating = async (req, res) => {
  const {
    userId,
    id: exerciseId
  } = req.params;

  const {
    rating
  } = req.body;

  const existing = await db.ExerciseRating.findOne({
    where: {
      userId,
      exerciseId
    }
  });

  let result;

  if (existing) {
    existing.rating = rating;
    result = await existing.save();
  } else {
    result = await db.ExerciseRating.create({
      userId,
      exerciseId,
      rating
    });
  }

  return res.json(result);
};

export default {
  submitExercise,
  updateExerciseSubmission,
  getExerciseSubmissions,
  approveSubmission,
  findSubmissionById,
  addComment,
  addExerciseRating
};
