import ApiService from '../../utils/apiService';

class LectureService extends ApiService {
  constructor () {
    super('/lecture');
  }

  async addLectureRating (userId, lectureId, rating) {
    return await this.httpPost(`/user/${ userId }/lecture/${ lectureId }/rate`, {
      rating
    }, false);
  }
}

const lectureService = new LectureService();
export default lectureService;