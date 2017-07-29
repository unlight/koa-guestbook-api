import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Message } from './index';

@Entity()
export class Category {

    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
    @OneToMany(type => Message, m => m.category) messages: Message[];
}
