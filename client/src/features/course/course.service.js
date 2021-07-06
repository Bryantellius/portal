import ApiService from '../../utils/apiService';

class CourseService extends ApiService {
  constructor () {
    super('/course');
  }

  async fetchEnrolledCoursesByUserId (userId) {
    return await this.httpGet(`/user/${userId}/course`, false);
  }

  async fetchModulesForCourse (courseId) {
    return await this.httpGet(`/${courseId}/module`);
  }

  async fetchCourseUsers (courseId) {
    return await this.httpGet(`/${courseId}/users`);
  }

  async fetchCourseSchedule (courseId) {
    return await this.httpGet(`/${courseId}/schedule`);
  }

  async saveCourseIteration (course) {
    return course?.id
      ? await this.httpPut(`/course/${course?.courseDefinitionId}/schedule/${course?.id}`, course)
      : await this.httpPost(`/course/${course?.courseDefinitionId}/schedule`, course);
  }
}

const courseService = new CourseService();
export default courseService;