import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { UserService } from '../services';

import schemaUser from '../schemas/schemaUser';
import User from '../models/User';

class UserController {
  async create(req: Request, response: Response) {
    const { id, name, email, password } = req.body;

    if (!(await schemaUser.isValid(req.body))) {
      return response.status(400).json({ error: 'Validation Fails' });
    }

    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return response.status(401).json({ error: 'User already exists' });
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

  async update(req: Request, res: Response) {
    return res.json({ ok: true });
  }
}

export default new UserController();
