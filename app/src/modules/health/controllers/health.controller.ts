import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
@ApiTags('Health')
export class HealthController {
  constructor(
    private healthCheck: HealthCheckService,
    private mongooseHealth: MongooseHealthIndicator,
  ) {}

  @Get()
  @ApiOkResponse()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.healthCheck.check([
      () => this.mongooseHealth.pingCheck('mongoDB'),
    ]);
  }
}
