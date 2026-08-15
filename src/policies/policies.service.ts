import { randomUUID } from "node:crypto";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePolicyDto } from "./dto/create-policy.dto";
import { QueryPolicyDto } from "./dto/query-policy.dto";
import { UpdatePolicyDto } from "./dto/update-policy.dto";
import { Policy, PolicyStatus } from "./entities/policy.entity";

@Injectable()
export class PoliciesService {
  private readonly policies: Policy[] = [];

  create(createPolicyDto: CreatePolicyDto): Policy {
    this.validateDateOrder(createPolicyDto.startDate, createPolicyDto.endDate);

    const policy: Policy = {
      id: randomUUID(),
      ...createPolicyDto,
      status: PolicyStatus.ACTIVE,
    };

    this.policies.push(policy);
    return policy;
  }

  findAll(query: QueryPolicyDto): Policy[] {
    const { city, status } = query;

    return this.policies.filter((policy) => {
      const matchesCity =
        city !== undefined ? policy.propertyCity === city : true;
      const matchesStatus =
        status !== undefined ? policy.status === status : true;

      return matchesCity && matchesStatus;
    });
  }

  findOne(id: string): Policy {
    const policy = this.policies.find((p) => p.id === id);

    if (!policy) {
      throw new NotFoundException(`Policy with id ${id} not found`);
    }

    return policy;
  }

  update(id: string, updatePolicyDto: UpdatePolicyDto): Policy {
    const policy = this.findOne(id);

    const startDate = updatePolicyDto.startDate ?? policy.startDate;
    const endDate = updatePolicyDto.endDate ?? policy.endDate;
    this.validateDateOrder(startDate, endDate);

    Object.assign(policy, updatePolicyDto);
    return policy;
  }

  cancel(id: string): Policy {
    const policy = this.findOne(id);

    if (policy.status === PolicyStatus.CANCELLED) {
      throw new ConflictException(`Policy with id ${id} is already cancelled`);
    }

    if (new Date(policy.endDate).getTime() < Date.now()) {
      throw new ConflictException(
        `Policy with id ${id} has already expired (endDate: ${policy.endDate})`
      );
    }

    policy.status = PolicyStatus.CANCELLED;
    return policy;
  }

  remove(id: string): { deleted: boolean } {
    const index = this.policies.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new NotFoundException(`Policy with id ${id} not found`);
    }

    this.policies.splice(index, 1);
    return { deleted: true };
  }
  private validateDateOrder(startDate: string, endDate: string): void {
    if (new Date(endDate).getTime() <= new Date(startDate).getTime()) {
      throw new BadRequestException("endDate must be after startDate");
    }
  }
}
