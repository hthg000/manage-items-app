import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { PaginationDto } from 'src/common/dtos/pagination.dto'
import BaseResponse from 'src/common/interfaces/baseResponse'
import { buildPaginationOptions } from 'src/common/utils/pagination.util'
import { CreateCategoryDto } from '../dtos/create-category.dto'
import { UpdateCategoryDto } from '../dtos/update-category.dto'
import { Category } from '../entities'
import { CategoryService } from '../services/category.service'

@Controller('categories')
export class CategoryController {
	constructor(private readonly _categoryService: CategoryService) {}

	@Post()
	async create(@Body() createCategoryDto: CreateCategoryDto): Promise<BaseResponse> {
		console.log(createCategoryDto, 'createCategoryDto')
		return this._categoryService.create(createCategoryDto)
	}

	@Get()
	async findAll(@Query() paginationDto: PaginationDto): Promise<{ data: Category[]; total: number }> {
		const options = buildPaginationOptions(paginationDto)
		return this._categoryService.findAll(options)
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Category> {
		return this._categoryService.findOne(+id)
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<BaseResponse> {
		return this._categoryService.update(+id, updateCategoryDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<BaseResponse> {
		return this._categoryService.remove(+id)
	}
}
