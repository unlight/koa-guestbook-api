import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../category/category';

@Entity()
export class Message {

    @PrimaryGeneratedColumn() id?: number;
    @Column() author: string;
    @Column('datetime') dateInserted?: string;
    @Column({ type: 'datetime', nullable: true }) dateUpdated?: string;
    @Column() body: string;
    @ManyToOne(type => Category, c => c.messages) category?: Category;
}
