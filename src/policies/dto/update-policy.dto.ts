import { ApiPropertyOptional } from "@nestjs/swagger";
import { PartialType } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { CreatePolicyDto } from "./create-policy.dto";
import { PolicyStatus } from "../entities/policy.entity";

export class UpdatePolicyDto extends PartialType(CreatePolicyDto) {
  @ApiPropertyOptional({ enum: PolicyStatus })
  @IsOptional()
  @IsEnum(PolicyStatus)
  status?: PolicyStatus;
}
