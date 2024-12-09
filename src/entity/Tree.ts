import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm"


@Entity()
export class Tree {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("int")
    owner_id: number

    @CreateDateColumn()
    create_date: Date

    @UpdateDateColumn()
    update_date: Date

}
