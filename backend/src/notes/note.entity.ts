import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity.';


@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  category: string | null;
  

  @Column({ default: false })
  archived: boolean;

  @ManyToOne(type => User, user => user.notes) 
  user: User;
}

