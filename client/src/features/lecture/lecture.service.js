import ApiService from '../../utils/apiService';

class LectureService extends ApiService {
  constructor () {
    super('/lecture');
  }
}

const lectureService = new LectureService();
export default lectureService;