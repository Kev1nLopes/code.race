import { ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'
import * as cron from 'node-cron';
import { VerificarClimaSemanal } from 'utils/tomorrow'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  const config = new DocumentBuilder()
    .setTitle('Code race api')
    .setDescription('API para o code race')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))
  await app.listen(3000)

  cron.schedule('0 6 * * *', () => {
    console.log('Executando tarefa agendada');
  })
}
bootstrap()
