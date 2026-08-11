import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as os from "os";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Bootstrap");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    exposedHeaders: ["X-Access-Token", "X-Refresh-Token"],
  });

  app.setGlobalPrefix("api");

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Eazy test API")
    .setDescription("API documentation for Eazy test project")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      "access-token"
    )
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "UUID",
      },
      "refresh-token"
    )
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("api/docs", app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  const ip =
    Object.values(os.networkInterfaces())
      .flat()
      .find((n) => n?.family === "IPv4" && !n.internal)?.address ?? "127.0.0.1";
  logger.log(`App running on: http://localhost:${port}`);
  logger.log(`Network access:  http://${ip}:${port}`);
  logger.log(`Documentation found on: http://localhost:${port}/api/docs`);
}
void bootstrap();
