import ApiService from '../../utils/apiService';

class ModuleService extends ApiService {
  constructor () {
    super('/module');
  }
};

const moduleService = new ModuleService();

export default moduleService;