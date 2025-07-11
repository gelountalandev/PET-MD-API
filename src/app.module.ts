import { ExecutionContext, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data_source';
import { UserModule } from './modules/user/user.module';
import { PetModule } from './modules/pet/pet.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { ConsultationModule } from './modules/consultation/consultation.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CatchEverythingFilter } from './exception-filter/catch-everything-exception';
import { AuthUser } from './middlewares/auth.middleware';
import { AccessTokenModel } from './models/access_token.model';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    PetModule,
    AppointmentModule,
    ConsultationModule,
    FeedbackModule,
    TypeOrmModule.forFeature([AccessTokenModel]),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: 10 * 1000,
          limit: 3,
        },
        {
          name: 'default',
          ttl: 60 * 1000,
          limit: 5,
        },
        {
          name: 'long',
          ttl: 60 * 60 * 1000,
          limit: 10,
        }
      ],
      errorMessage: 'Too many requests, please try again later.',
      getTracker:(req: Record<string, any>, context:ExecutionContext) => {
        console.log(req.headers['authorization']);
        return req.headers['authorization']; // or any other identifier you want to use for tracking requests
      },
      generateKey: (
        context: ExecutionContext,
        trackerString: string,
        throttlerName: string,
      ) => {
        return trackerString
      },
      // storage: new ThrottlerStorageRedisService()
    }), 
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
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