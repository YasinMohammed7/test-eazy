import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from "class-validator";

export class CreatePolicyDto {
  @ApiProperty({ description: "Full name of the policyholder" })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  policyholderName!: string;

  @ApiProperty({ description: "City where the property is located" })
  @IsString()
  @IsNotEmpty()
  propertyCity!: string;

  @ApiProperty({ description: "Premium amount in RON (strictly positive)" })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  premiumAmount!: number;

  @ApiProperty({
    description: "Policy start date (ISO date)",
    example: "2026-01-01",
  })
  @IsDateString()
  startDate!: string;

  @ApiProperty({
    description: "Policy end date (ISO date, after startDate)",
    example: "2026-12-31",
  })
  @IsDateString()
  endDate!: string;
}
