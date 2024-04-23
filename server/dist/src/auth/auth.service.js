"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const patients_service_1 = require("../patients/patients.service");
const bcrypt = require("bcryptjs");
const doctors_service_1 = require("../doctors/doctors.service");
let AuthService = class AuthService {
    constructor(jwtService, patientService, doctorsService) {
        this.jwtService = jwtService;
        this.patientService = patientService;
        this.doctorsService = doctorsService;
    }
    async loginPatient(loginDto) {
        const patient = await this.validatePatient(loginDto);
        return this.generateToken(patient.id, patient.email, patient.role);
    }
    async loginDoctor(loginDto) {
        const doctor = await this.validateDoctor(loginDto);
        return this.generateToken(doctor.id, doctor.email, doctor.role);
    }
    async registerPatient(createPatientDto) {
        const candidate = await this.patientService.getPatientByEmail(createPatientDto.email);
        if (candidate) {
            throw new common_1.HttpException('Patient already exists!', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(createPatientDto.password, 5);
        const patient = await this.patientService.createPatient({ ...createPatientDto, password: hashPassword });
        return this.generateToken(patient.id, patient.email, patient.role);
    }
    async generateToken(id, email, role) {
        const payload = { id: id, email: email, role: role };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    async validatePatient(loginDto) {
        try {
            const patient = await this.patientService.getPatientByEmail(loginDto.email);
            const passwordEquals = await bcrypt.compare(loginDto.password, patient.password);
            if (patient && passwordEquals) {
                return patient;
            }
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Wrong email or password');
        }
    }
    async validateDoctor(loginDto) {
        try {
            const doctor = await this.doctorsService.getDoctorByEmail(loginDto.email);
            const passwordEquals = await bcrypt.compare(loginDto.password, doctor.password);
            if (doctor && passwordEquals) {
                return doctor;
            }
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Wrong email or password');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        patients_service_1.PatientsService,
        doctors_service_1.DoctorsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map