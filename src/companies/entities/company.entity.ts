import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  serviceOfActivity: string;

  @Column()
  numberOfEmployees: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @ManyToOne(() => User, (user) => user.companies)
  user: User;
}
