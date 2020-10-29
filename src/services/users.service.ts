import httpStatus from 'http-status';
import { getRepository } from 'typeorm';

import User from '../models/User';
import schemaUser from '../schemas/schemaUser';

class UserService {
  create = async (data: any) => {
    await schemaUser.validate(data, {
      abortEarly: false,
    });

    const userRepository = getRepository(User);
    const user = userRepository.create(data);
    await userRepository.save(user);

    return {
      status: httpStatus.CREATED,
      result: user,
    };
  };
}

export default new UserService();
