import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column('decimal')
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @Column({ nullable: true })
    category_id: number;

    @Column({ nullable: true })
    image_path: string;

    @DeleteDateColumn() // This column is used for soft deletes
    deleted_at?: Date;
}
