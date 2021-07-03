import ApiService from '../../utils/apiService';

class UserService extends ApiService {
  constructor () {
    super('/user');
  }

  async deleteMultiple (userIds) {
    return await Promise.all(userIds.map(userId => {
      return this.delete(userId);
    }));
  }

  async getCourseInfo (userId, courseId) {
    return this.httpGet(`/${ userId }/course/${ courseId }/details`);
  }
}
const userService = new UserService();
export default userService;