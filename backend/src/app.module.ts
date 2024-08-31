import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AreasModule } from './areas/areas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SUPABASE_URL,
      port: 5432,
      username: process.env.SUPABASE_USER,
      password: process.env.SUPABASE_PASSWORD,
      database: process.env.SUPABASE_DB,
      synchronize: true,
      autoLoadEntities: true,
    }), 
    UsuariosModule,
    AreasModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
