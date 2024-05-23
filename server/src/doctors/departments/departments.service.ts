import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {
  }

  async createDepartment(dto: CreateDepartmentDto): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { name: dto.name }
    });
    if (department) {
      throw new BadRequestException('Department already exists');
    }
    return await this.departmentRepository.save(dto);
  }

  async getDepartmentById(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOneBy({ id });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department;
  }

  async getAllDepartments(): Promise<Department[]> {
    const departments = await this.departmentRepository.find();
    if (departments.length === 0) {
      throw new NotFoundException('Departments not found');
    }
    return departments;
  }

  async updateDepartmentById(id: number, dto: UpdateDepartmentDto): Promise<Department> {
    const department = await this.departmentRepository.findOneBy({ id });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    Object.assign(department, dto);
    return await this.departmentRepository.save(department);
  }

}
