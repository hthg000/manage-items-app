import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { Category } from "src/modules/category/entities/category.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    product_id: number;

    @Column()
    @IsNotEmpty()
    product_name: string;

    @Column({ nullable: true })
    description: string;

    @Column('decimal')
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @Column({ nullable: true })
    category_id: number;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column({ nullable: true })
    image_path: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @DeleteDateColumn() // This column is used for soft deletes
    deleted_at?: Date;
}
