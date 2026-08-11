import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Health") // Groups this controller under "health" tag in Swagger
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  @ApiOperation({ summary: "Check application health" }) // Description of the endpoint
  @ApiResponse({ status: 200, description: "Application is healthy" })
  @ApiResponse({ status: 503, description: "Service unavailable" })
  getHello(): string {
    return this.appService.getHello();
  }
}
