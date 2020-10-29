import { Request, Response } from 'express';

import { UserService } from '../services';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const data = {
      name,
      email,
      password,
    };

    const { result, status } = await UserService.create(data);
    return response.status(status).json(result);
  }
}

export default new UserController();
