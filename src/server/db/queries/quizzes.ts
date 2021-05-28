import Query from "../query";
import { QuizQuestionType } from "../../../client/utils/enums";

const getAll = async () => {
    const quizzes = await Query("SELECT * FROM quizzes");
    return quizzes;
};

const getQuizByLectureId = async (lectureId: string) => {
  const quizzes = await Query("SELECT * FROM quizzes WHERE QuizID = ?", [lectureId]);

  return Promise.all(quizzes.map(async (quiz: any) => {
    const quizQuestions = await getQuestionsByQuizId(quiz.QuizID);
    quiz.Questions = quizQuestions;

    return quiz;
  }));
};

const getQuestionsByQuizId = async (quizId: string) => {
    let questions: any = await Query("SELECT * FROM quizquestions WHERE QuizID = ?", [quizId]);

    return Promise.all(questions.map(async (question: any) => {
        switch (question.Type) {
            case QuizQuestionType.Select:
            case QuizQuestionType.MultiSelect:
                const questionOptions = await getQuestionOptionsByQuestionId(question.QuizQuestionID);
                question.Options = questionOptions;
                return question;
            case QuizQuestionType.TrueFalse:
            case QuizQuestionType.Text:
            default:
                return question;
        }
    }));
}

const getQuestionOptionsByQuestionId = async (quizQuestionId: string) => {
    return await Query("SELECT * FROM quizquestionoptions WHERE QuizQuestionID = ?", [quizQuestionId]);
}

export {
    getAll,
    getQuizByLectureId,
    getQuestionsByQuizId,
    getQuestionOptionsByQuestionId
}
