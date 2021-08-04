import { dbConnection } from '../config/db';
import { Connection } from 'typeorm';
import { RolesPermissions } from '../entity/RolePermissions';
import { Roles } from '../entity/Roles';
import { Permissions } from '../entity/Permissions';

export default class RolePermissionsModel {
    getRolePermissionsByParams(params: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let rolePermissions = await connect.getRepository('RolesPermissions').createQueryBuilder('RolesPermissions').where(params).select(['RolesPermissions.id_role', 'RolesPermissions.id_permission']).execute();
                resolve(rolePermissions);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    saveRolePermissions(id_permission: number, id_role: number) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                let roles: Roles = await connect.getRepository('Roles').findOne({ id: id_role }) as Roles;
                let permissions: Permissions = await connect.getRepository('Permissions').findOne({ id: id_permission }) as Permissions;

                let rolePermissions = new RolesPermissions();
                rolePermissions.id_role = roles;
                rolePermissions.id_permission = permissions;
                rolePermissions.created_at = new Date();

                let rolesPermissionsRepository = await connect.getRepository('RolesPermissions');
                let rolesPermissions = await rolesPermissionsRepository.findOne({ id_role: id_role, id_permission: id_permission });

                if (rolesPermissions) {
                    await rolesPermissionsRepository.delete({ id_role: id_role, id_permission: id_permission }).then(() => {
                        resolve({
                            success: true
                        });
                    }).catch(error => reject(error));;
                } else {
                    await rolesPermissionsRepository.save(rolePermissions).then(() => {
                        resolve({
                            success: true
                        });
                    }).catch(error => reject(error));
                }
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }

    getRolePermission(role: any) {
        try {
            return new Promise(async (resolve, reject) => {
                const connect: Connection = await dbConnection();

                const rolePermission = await connect.getRepository('RolesPermissions').createQueryBuilder("RolesPermissions")
                    .leftJoinAndSelect("RolesPermissions.id_permission", "Permissions")
                    .where("RolesPermissions.id_role = :role", { role: role['id'] })
                    .getMany();

                var rolesPermissionArray = [];
                if (rolePermission)
                    for (let i in rolePermission) {
                        rolesPermissionArray.push(rolePermission[i]['id_permission']['name']);
                    }
             
                resolve(rolesPermissionArray);
            });
        } catch (e) {
            let error = (e as Error).message
            return error
        }
    }
}