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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const CreatePatientDto_1 = require("../patients/dto/CreatePatientDto");
const swagger_1 = require("@nestjs/swagger");
const LoginDto_1 = require("./dto/LoginDto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(loginDto) {
        if (loginDto.role === 'doctor') {
            return this.authService.loginDoctor(loginDto);
        }
        return this.authService.loginPatient(loginDto);
    }
    registerPatient(createPatientDto) {
        return this.authService.registerPatient(createPatientDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Авторизация (доктор и пациент)' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Регистрация пациента' }),
    (0, common_1.Post)('patient/registration'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePatientDto_1.CreatePatientDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerPatient", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map