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
}
const userService = new UserService();
export default userService;