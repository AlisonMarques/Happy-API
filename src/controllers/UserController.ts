import { Request, Response } from 'express';

import { UserService } from '../services';
import schemaUser from '../schemas/schemaUser';

class UserController {
  async create(request: Request, response: Response) {
    const { id, name, email, password } = request.body;

    if (!(await schemaUser.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation Fails' });
    }

    const data = {
      id,
      name,
      email,
      password,
    };

    const { result, status } = await UserService.create(data);

    return response.status(status).json(result);
  }
}

export default new UserController();
