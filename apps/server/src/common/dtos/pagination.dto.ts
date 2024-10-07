import { IsOptional, IsString } from 'class-validator';

export class PaginationDto {
    @IsString()
    @IsOptional()
    page: string;

    @IsString()
    @IsOptional()
    limit: string;

    @IsString()
    @IsOptional()
    sort: string;

    @IsString()
    @IsOptional()
    filter: string;

    @IsOptional()
    @IsString()
    search?: string
}
