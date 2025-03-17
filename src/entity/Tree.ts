import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity('tree')
export class Tree {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("uuid")
    owner_id: string

    @CreateDateColumn()
    create_date: Date

    @UpdateDateColumn()
    update_date: Date


    @Column({ type: 'varchar', length: 255 })
    model: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;

}
