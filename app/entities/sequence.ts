import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Sequence {

    @PrimaryGeneratedColumn() id: number;
    @Column('string', { nullable: true }) name;

}
