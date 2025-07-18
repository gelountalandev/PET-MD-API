import { ExecutionContext, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports:[
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
            return req.headers['authorization'];
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
      provide: APP_GUARD,
      useClass:ThrottlerGuard
    }
  ]
})
export class ThrottlerGuardModule {}
