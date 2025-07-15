import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data_source';
import { UserModule } from './modules/user/user.module';
import { PetModule } from './modules/pet/pet.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { ConsultationModule } from './modules/consultation/consultation.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from './exception-filter/catch-everything-exception';
import { AuthUser } from './middlewares/auth.middleware';
import { AccessTokenModel } from './models/access_token.model';
import { ThrottlerGuardModule } from './throttler-guard/throttler-guard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    PetModule,
    AppointmentModule,
    ConsultationModule,
    FeedbackModule,
    TypeOrmModule.forFeature([AccessTokenModel]),
    ThrottlerGuardModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthUser)
      .exclude(
        {
          path: 'users/login',
          method: RequestMethod.POST
        },
        {
          path: 'users/register/pet-owner',
          method: RequestMethod.POST,
        },
        {
          path: 'users/register/pet-owner',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*')
  }
}