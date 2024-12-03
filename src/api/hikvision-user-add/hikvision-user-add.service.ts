import { BadGatewayException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HikvisionUserAddEntity } from './hikvision-user-add.entity';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/users.entity';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
const urlUserInfo = (api: string) =>
  `http://${api}/ISAPI/AccessControl/UserInfo/Record?format=json`;
const urlUserInfoDelete = (api: string) =>
  `http://${api}/ISAPI/AccessControl/UserInfo/Delete?format=json`;
const urlUserInfoUpdate = (api: string) =>
  `http://${api}/ISAPI/AccessControl/UserInfo/Modify?format=json`;
@Injectable()
export class HikvisionUserAddService {
  private passwordIn: string;
  private passwordOut: string;
  private hikvisionApiIn: string;
  private hikvisionApiOut: string;

  constructor(
    private userService: UsersService,
    @InjectRepository(HikvisionUserAddEntity)
    private readonly hikvisionUserAddRepository: Repository<HikvisionUserAddEntity>,
    private readonly authService: AuthService,
  ) {
    this.passwordIn = process.env.HIKVISION_PASSWORD_IN;
    this.passwordOut = process.env.HIKVISION_PASSWORD_OUT;
    this.hikvisionApiIn = process.env.HIKVISION_API_IN;
    this.hikvisionApiOut = process.env.HIKVISION_API_OUT;
  }
  async createEmployeesHikvision(data: any): Promise<any> {
    // const reqBody = {
    //     UserInfo: {
    //       employeeNo: String(empDeviceId), // Ensure employeeNo is a string
    //       name: `${firstName}${lastName ? " " + lastName : ""}`,
    //       userType: "normal",
    //       Valid: {
    //         enable: true,
    //         beginTime: `${currentYear}-01-01T00:00:00`,
    //         endTime: `${currentYear + hikvisionUserExp}-01-01T00:00:00`,
    //       },
    //       RightPlan: [{doorNo: 1, planTemplateNo: "1"}],
    //       doorRight: "1",
    //     },
    //   };
    // const response = await axios.post(urlUserInfo(this.hikvisionApiIn), {
    //     digestAuth: `admin:${this.passwordIn}`,
    //     method: "POST",
    //     // data: reqBody,
    //     headers: {"Content-Type": "application/json"},
    //   });
    //   if (response.status !== 200) {
    //     // strapi.log.error("error in function createHikvisionEmployee while creating hikvision user, error: ", String(response));
    //     // return {isSuccess: false, errCode: connError};
    //   }
    //   return {isSuccess: true, errCode: null};
  }
  async updateEmployeesHikvision(): Promise<any> {}

  async deleteEmployeesHikvision(): Promise<any> {
    // try {
    //     const {empDeviceId} = req;
    //     // const settings = await strapi.service('api::setting.setting').find();
    //     // const {ip} = settings;
    //     const password = process.env.PASSWORD;
    //     // console.log(ip, password, empDeviceId)
    //     const reqBody = {
    //       UserInfoDelCond: {
    //         EmployeeNoList: [
    //           {
    //             employeeNo: empDeviceId,
    //           },
    //         ],
    //       },
    //     };
    //     const url = `http://${ip}/ISAPI/AccessControl/UserInfo/Delete?format=json`;
    //     const response = await axios.put(urlUserInfo(this.hikvisionApiIn), {
    //       digestAuth: `admin:${password}`,
    //       method: "PUT",
    //       headers: {"Content-Type": "application/json"},
    //       data: reqBody,
    //     });
    //     if (response.statusCode !== 200) {
    //       strapi.log.error("error in function deleteHikvisionSingleUser while deleting hikvision user, error: ", String(response.data));
    //     }
    //     return true;
    //   } catch (err) {
    //     return false;
    //   }
  }

  async updateUserHikvision(): Promise<any> {
    // try {
    //     const {employee} = req;
    //     const {firstName, lastName, empDeviceId} = employee;
    //     // const settings = await strapi.service('api::setting.setting').find();
    //     // const {ip} = settings;
    //     const password = process.env.PASSWORD;
    //     const currentYear = new Date().getFullYear();
    //     const hikvisionUserExp = +process.env.HIKVISION_USER_EXP; // in years
    //     const url = `http://${ip}/ISAPI/AccessControl/UserInfo/Modify?format=json`;
    //     const reqBody = {
    //       UserInfo: {
    //         employeeNo: empDeviceId,
    //         name: `${firstName} + ${lastName ? " " + lastName : ""}`,
    //         userType: "normal",
    //         Valid: {
    //           enable: true,
    //           beginTime: `${currentYear}-01-01T00:00:00`,
    //           endTime: `${currentYear + hikvisionUserExp}-01-01T00:00:00`,
    //         },
    //         RightPlan: [{doorNo: 1, planTemplateNo: "1"}],
    //         doorRight: "1",
    //       },
    //     };
    //     const response = await axios.put(urlUserInfo(this.hikvisionApiIn), {
    //       digestAuth: `admin:${password}`,
    //       method: "PUT",
    //       data: reqBody,
    //       headers: {"Content-Type": "application/json"},
    //     });
    //     if (response.statusCode !== 200) {
    //       return false;
    //     }
    //     return true;
    //   } catch (err) {
    //     return false
    //   }
  }

  async fetchData(): Promise<any> {
    const token = await this.authService.fetchToken();
    const items = await fetch(`${process.env.FETCH_USERS}/child/get/register`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = items.json();

    return data;
  }

  async userCreateInline(data: UserDto): Promise<UserEntity | boolean> {
    const user = await this.userService.findByEmployeeNoString({
      employeeNoString: data.employeeNoString,
    });

    if (!user) {
      const userCreate = await this.userService.create(data);
      return userCreate;
    }
    return true;
  }
  async userFindById(id: string): Promise<UserEntity> {
    const user = await this.userService.findById(id);
    return user;
  }
}
