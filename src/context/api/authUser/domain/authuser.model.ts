import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserType } from '../../userType/domain/user-type.model';
import { Country } from '../../country/domain/country.model';
import { City } from '../../City/domain/city.model';

@Entity('auth_user')
export class AuthUser {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserType)
  @JoinColumn({ name: 'user_type_id' })
  userType: UserType;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  second_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  second_last_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ unique: true })
  email: string;

  @Column()
  email_verified_at: Date;

  @Column({ unique: true })
  username: string;

  @OneToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column()
  address: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  accepted_terms: boolean;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}

export class RequestAuthUser {
  username: string;
  email: string;
}
