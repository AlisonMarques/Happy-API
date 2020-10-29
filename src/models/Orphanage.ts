import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Image from './Image';
import User from './User';

/**
 * Usando esse decorator (Entity) o typeorm vai entender que a classe Orphanage
 * está associada com a nossa tabela chamada orphanages
 */
@Entity('orphanages')
export default class Orphanage {
  // Vai gerar o incremento do ID. ex: 1 + 1
  @PrimaryGeneratedColumn('increment')
  id: number;

  // Column está informando quais atributos são colunas
  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  // Relacionando para salvar no banco de dados
  @OneToMany(() => Image, (image) => image.orphanage, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[];

  @ManyToOne(() => User, (user) => user.orphanage)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
