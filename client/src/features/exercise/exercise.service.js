import ApiService from '../../utils/apiService';

class ExerciseService extends ApiService {
  constructor () {
    super('/exercise');
  }

  async submitExercise (submission) {
    return await this.upsert(submission);
  }

  async fetchExerciseSubmission(submissionId) {
    return await this.httpGet(`/submission/${ submissionId }`);
  }

  async fetchSubmissionsForUser(userId) {
    return await this.httpGet(`/user/${ userId }/exercise/submission`, false);
  }

  async approveSubmission(submissionId) {
    return await this.httpPost(`/submission/${ submissionId }/approve`);
  }

  async fetchExerciseSubmissions () {
    return await this.httpGet(`/submission`);
  }
}

const exerciseService = new ExerciseService();

export default exerciseService;