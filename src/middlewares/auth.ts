import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface IGetUserAuthInfoRequest extends Request {
  user: any; // or any other type
}

//verificando se o usuário está logado
export default (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  //Se o header n tiver presente, return error
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // dividindo o authHeader e pegando apenas o token
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
