var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { TUser } from "./TUser";
let TUserRoles = class TUserRoles {
    idp;
    roleName;
    userIdp;
};
__decorate([
    PrimaryGeneratedColumn({ type: "integer", name: "idp" }),
    __metadata("design:type", Number)
], TUserRoles.prototype, "idp", void 0);
__decorate([
    Column("character varying", {
        name: "role_name",
        nullable: true,
        length: 50,
        default: () => "''''''",
    }),
    __metadata("design:type", Object)
], TUserRoles.prototype, "roleName", void 0);
__decorate([
    ManyToOne(() => TUser, (tUser) => tUser.tUserRoles, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    JoinColumn([{ name: "user_idp", referencedColumnName: "idp" }]),
    __metadata("design:type", typeof (_a = typeof TUser !== "undefined" && TUser) === "function" ? _a : Object)
], TUserRoles.prototype, "userIdp", void 0);
TUserRoles = __decorate([
    Index("t_user_roles_pkey", ["idp"], { unique: true }),
    Entity("t_user_roles", { schema: "public" })
], TUserRoles);
export { TUserRoles };
