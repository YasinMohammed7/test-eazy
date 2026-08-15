import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { PoliciesService } from "./policies.service";
import { CreatePolicyDto } from "./dto/create-policy.dto";
import { UpdatePolicyDto } from "./dto/update-policy.dto";
import { QueryPolicyDto } from "./dto/query-policy.dto";

@Controller("policies")
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Post()
  create(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.create(createPolicyDto);
  }

  @Get()
  findAll(@Query() query: QueryPolicyDto) {
    return this.policiesService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.policiesService.findOne(id);
  }

  @Post(":id/cancel")
  @HttpCode(HttpStatus.OK)
  cancel(@Param("id", ParseUUIDPipe) id: string) {
    return this.policiesService.cancel(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updatePolicyDto: UpdatePolicyDto
  ) {
    return this.policiesService.update(id, updatePolicyDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.policiesService.remove(id);
  }
}
