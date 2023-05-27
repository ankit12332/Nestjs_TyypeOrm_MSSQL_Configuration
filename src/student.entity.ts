import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  course: string;

  // Add more properties as needed

  // Add any additional columns, relationships, or decorators as needed
}
