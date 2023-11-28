import { Company } from 'src/companies/entities/company.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  firstname: string;

  @Column({ type: 'varchar', length: 15 })
  lastname: string;

  @Column({ type: 'varchar', length: 15 })
  nickname: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Company, (company) => company.user)
  companies: Company;

  @Column({ type: 'varchar', default: '' })
  token: string;
}
