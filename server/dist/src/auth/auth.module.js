"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const process = require("node:process");
const patients_module_1 = require("../patients/patients.module");
const patients_service_1 = require("../patients/patients.service");
const typeorm_1 = require("@nestjs/typeorm");
const patient_entity_1 = require("../patients/entities/patient.entity");
const dotenv = require("dotenv");
const doctor_entity_1 = require("../doctors/entities/doctor.entity");
const doctors_module_1 = require("../doctors/doctors.module");
const doctors_service_1 = require("../doctors/doctors.service");
dotenv.config();
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, patients_service_1.PatientsService, doctors_service_1.DoctorsService],
        imports: [
            (0, common_1.forwardRef)(() => patients_module_1.PatientsModule),
            (0, common_1.forwardRef)(() => doctors_module_1.DoctorsModule),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secret',
                signOptions: { expiresIn: '30d' },
            }),
            typeorm_1.TypeOrmModule.forFeature([patient_entity_1.Patient]),
            typeorm_1.TypeOrmModule.forFeature([doctor_entity_1.Doctor]),
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map