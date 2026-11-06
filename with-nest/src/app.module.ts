import { Module } from "@nestjs/common";
import { createObserveModule } from "@nestjs/observe";
import { ResilienceModule } from "@nestjs/resilience";

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ResilienceModule.forRoot({
      defaults: {
        timeout: "5s",
        retry: { attempts: 3, backoff: { delay: "200ms", maxDelay: "2s" } },
      },
      presets: {
        carrier: {
          timeout: "2s",
          retry: { attempts: 2 },
          circuitBreaker: { failureRateThreshold: 50, minimumCalls: 10, openDuration: "30s" },
        },
      },
    }),
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY,
      appSecret: process.env.OBSERVE_APP_SECRET,
      serviceId: "with-nest",
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
