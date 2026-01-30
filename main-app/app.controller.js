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
import { Controller } from "../common/controller/Controller.js";
import { Get, Post, Put, Patch, Delete } from "../common/http-layers/HttpLayers.js";
import { UserCheck, UserService } from "./app.service.js";
import { User } from "./dto/userDTO.js";
import { Query, Body } from "../common/params/params.js";
import { Guard } from "../common/guard/Guard.js";
let UsersController = class UsersController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    findAll() {
        return this.userService.retreiveAllUsers();
    }
    createNewUser(newUser) {
        this.userService.addNewUser(newUser);
    }
    replaceUser(newUser) {
        this.userService.replaceUser(newUser);
    }
    updateUser(newUser) {
        this.userService.updateUser(newUser);
    }
    deleteUserByEmail(email) {
        this.userService.deleteUser(email);
    }
};
__decorate([
    Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], UsersController.prototype, "findAll", null);
__decorate([
    Post('/'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createNewUser", null);
__decorate([
    Put('/'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "replaceUser", null);
__decorate([
    Patch('/'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    Delete('/'),
    __param(0, Query('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUserByEmail", null);
UsersController = __decorate([
    Guard(UserCheck),
    Controller(''),
    __metadata("design:paramtypes", [UserService])
], UsersController);
export { UsersController };
//# sourceMappingURL=app.controller.js.map