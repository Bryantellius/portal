import ApiService from '../../utils/apiService';

class QuizService extends ApiService {
  constructor () {
    super('/quiz');
  }

  async saveQuizSubmission (userId, quizId, quizResponses) {
    return await this.httpPost(`/${ quizId }`,
      {
        userId,
        quizId,
        responses: quizResponses
      }
    );
  }

  async fetchSubmissionsByUserId (userId) {
    return await this.httpGet(`/${ userId }/quiz/submission`, false);
  }
}

const quizService = new QuizService();

export default quizService;