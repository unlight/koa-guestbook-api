import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category';

@Entity()
export class Message {

    @PrimaryGeneratedColumn() id: number;
    @Column() author: string;
    @Column() body: string;
    @ManyToOne(type => Category, c => c.messages) category: Category;
}
