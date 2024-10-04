import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    type: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    category: string;

    @Column('decimal')
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
}
