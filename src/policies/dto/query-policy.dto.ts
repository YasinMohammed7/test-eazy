import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { PolicyStatus } from "../entities/policy.entity";

export class QueryPolicyDto {
  @ApiPropertyOptional({ description: "Filter policies by property city" })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    enum: PolicyStatus,
    description: "Filter policies by status",
  })
  @IsOptional()
  @IsEnum(PolicyStatus)
  status?: PolicyStatus;
}
