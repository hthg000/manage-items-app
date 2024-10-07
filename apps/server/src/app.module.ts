import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as fs from 'fs'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UPLOAD_PATH } from './common/constants'
import { CategoryModule } from './modules/category/category.module'
import { ProductModule } from './modules/product/product.module'

// create upload directory if not exists
if (!fs.existsSync(UPLOAD_PATH)) {
	fs.mkdirSync(UPLOAD_PATH, { recursive: true })
}

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.get('MYSQL_HOST'),
				port: +configService.get('MYSQL_PORT'),
				username: configService.get('MYSQL_USERNAME'),
				password: configService.get('MYSQL_PASSWORD'),
				database: configService.get('MYSQL_NAME'),
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
				synchronize: true
			}),
			inject: [ConfigService]
		}),
		MulterModule.register({
			dest: UPLOAD_PATH
		}),

		ProductModule,
		CategoryModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
