import ApiService from '../../utils/apiService';

class CourseService extends ApiService {
  constructor () {
    super('/course');
  }

  async fetchEnrolledCoursesByUserId (userId) {
    return await this.httpGet(`/user/${ userId }/course`, false);
  }
}

const courseService = new CourseService();
export default courseService;