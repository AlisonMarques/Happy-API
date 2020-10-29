import httpStatus from 'http-status';
import { getRepository } from 'typeorm';

import schemaOrphanage from '../schemas/schemaOrphanage';
import Orphanage from '../models/Orphanage';

class OrphanagesService {
  index = async () => {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
    });

    return {
      status: httpStatus.OK,
      result: orphanages,
    };
  };

  show = async (id: any) => {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });
    return {
      status: httpStatus.OK,
      result: orphanage,
    };
  };

  create = async (data: any) => {
    await schemaOrphanage.validate(data, {
      abortEarly: false,
    });

    const orphanagesRepository = getRepository(Orphanage);
    const orphanage = orphanagesRepository.create(data);
    await orphanagesRepository.save(orphanage);

    return {
      status: httpStatus.CREATED,
      result: orphanage,
    };
  };
}

export default new OrphanagesService();
