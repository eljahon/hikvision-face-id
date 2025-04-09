import { BadGatewayException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HikvisionUserAddEntity } from './hikvision-user-add.entity';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/users.entity';
import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { Cron } from '@nestjs/schedule';
import * as FormDataPackage from 'form-data';
import urlLib from 'urllib';
import { ConfigService } from '@nestjs/config';
const urlUserAdd = 'https://app.eramed.uz/app/api/v1/child/register/callback';
const urlUserInfo = (api: string) =>
  `http://${api}/ISAPI/AccessControl/UserInfo/Record?format=json`;
const urlUserInfoDelete = (api: string) =>
  `http://${api}/ISAPI/AccessControl/UserInfo/Delete?format=json`;
const urlUserInfoUpdate = (api: string) =>
  `http://${api}/ISAPI/AccessControl/UserInfo/Modify?format=json`;
const urlFaceUpload = (api: string) =>
  `http://${api}/ISAPI/Intelligent/FDLib/FDSetUp?format=json`;
const urlPhoto = (api: string) => `https://app.eramed.uz/storage/child/${api}`;

@Injectable()
export class HikvisionUserAddService {
  constructor(
    private userService: UsersService,
    @InjectRepository(HikvisionUserAddEntity)
    private readonly hikvisionUserAddRepository: Repository<HikvisionUserAddEntity>,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    // console.log(this.passwordIn, this.hikvisionApiIn, 'this.passwordIn, this.hikvisionApiIn =====>');
  }
  async createEmployeesHikvisionIn(data: any): Promise<any> {
    const { id, name, surname } = data;
    const hikvisionUserExp =
      +this.configService.get('hikvision.hikvisionUserExp') || 2;
    const currentYear = new Date().getFullYear();
    const reqBody = {
      UserInfo: {
        employeeNo: String(id),
        name: `${name}${surname ? ' ' + surname : ''}`,
        userType: 'normal',
        Valid: {
          enable: true,
          beginTime: `${currentYear}-01-01T00:00:00`,
          endTime: `${currentYear + hikvisionUserExp}-01-01T00:00:00`,
        },
        RightPlan: [{ planTemplateNo: '1' }],
        doorRight: '1',
      },
    };

    // console.log(urlUserInfo(this.configService.get('hikvision.hikvisionApiIn')), 'reqBody =====>');
    // console.log(this.configService.get('hikvision.passwordIn'), 'this.configService.get("hikvision.passwordIn") =====>');
    // console.log(reqBody, 'reqBody =====>');
    
    
    
    const response = await urlLib.request(
      urlUserInfo(this.configService.get('hikvision.hikvisionApiIn')),
      {
        digestAuth: `admin:${this.configService.get('hikvision.passwordIn')}`,
        method: 'POST',
        data: reqBody,
        headers: { 'Content-Type': 'application/json' },
      },
    );
    // console.log(response.status, 'response =====>');
    if (response.status !== 200) return { isSuccess: false, errCode: response.status };
    return { isSuccess: true, errCode: null };
  }

  async createEmployeesHikvisionOut(data: any): Promise<any> {
    const { id, name, surname } = data;
    const hikvisionUserExp =
      +this.configService.get('hikvision.hikvisionUserExp') || 2;
    const currentYear = new Date().getFullYear();
    const reqBody = {
      UserInfo: {
        employeeNo: String(id),
        name: `${name}${surname ? ' ' + surname : ''}`,
        userType: 'normal',
        Valid: {
          enable: true,
          beginTime: `${currentYear}-01-01T00:00:00`,
          endTime: `${currentYear + hikvisionUserExp}-01-01T00:00:00`,
        },
        RightPlan: [{ planTemplateNo: '1' }],
        doorRight: '1',
      },
    };

    // console.log(urlUserInfo(this.configService.get('hikvision.hikvisionApiIn')), 'reqBody =====>');
    // console.log(this.configService.get('hikvision.passwordIn'), 'this.configService.get("hikvision.passwordIn") =====>');
    // console.log(reqBody, 'reqBody =====>');
    
    
    
    const response = await urlLib.request(
      urlUserInfo(this.configService.get('hikvision.hikvisionApiOut')),
      {
        digestAuth: `admin:${this.configService.get('hikvision.passwordOut')}`,
        method: 'POST',
        data: reqBody,
        headers: { 'Content-Type': 'application/json' },
      },
    );
    // console.log(response.status, 'response =====>');
    if (response.status !== 200) return { isSuccess: false, errCode: response.status };
    return { isSuccess: true, errCode: null };
  }
  async updateEmployeesHikvision(): Promise<any> {}

  async deleteEmployeesHikvision(empDeviceId: number): Promise<any> {
    try {
      //  console.log(empDeviceId, 'empDeviceId =====>');
      const password = process.env.PASSWORD;
      // console.log(ip, password, empDeviceId)
      const reqBody = {
        UserInfoDelCond: {
          EmployeeNoList: [
            {
              employeeNo: empDeviceId,
            },
          ],
        },
      };
      // console.log(reqBody, 'reqBody =====>');
      const response = await urlLib.request(
        urlUserInfoDelete(this.configService.get('hikvision.hikvisionApiIn')),
        {
          digestAuth: `admin:${this.configService.get('hikvision.passwordIn')}`,
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          data: reqBody,
        },
      );

      if (response.status !== 200) {
        // strapi.log.error("error in function deleteHikvisionSingleUser while deleting hikvision user, error: ", String(response.data));
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  async updateUserHikvision(data: any): Promise<any> {
    const { id, name, surname } = data;
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
  @Cron('*/30 * * * * * ')
  async fetchData() {
    const object = await this.fetchUsers();
    console.log(object, 'fetch user list  =====>');
    const successUserList = [];

    

    const _addData = await object.filter((el) => el.status === 'CREATED');
    for await (const item of _addData) {

      console.log('User created for name and face  image', item);
      
      const isSuccessIn = await this.createEmployeesHikvisionIn(item);
        
        const isSuccessOut = await this.createEmployeesHikvisionOut(item);
        

      if (isSuccessOut.isSuccess&&isSuccessIn.isSuccess) {
        const isSuccessUploadIn = await this.uploadFaceHikvisionIn(item);
         const isSuccessUploadOut = await this.uploadFaceHikvisionOut(item);
         console.log('User created face image out', isSuccessOut.isSuccess);
         console.log('User created face image in', isSuccessIn.isSuccess);
        if (isSuccessUploadIn.isSuccess&&isSuccessUploadOut.isSuccess) {
          const _data = await this.userService.create({
            employeeNoString: item.id,
            name: item.name,
            type: item.type,
            status: item.status,
            image_link: item.image_link,
          });   
          
          console.log('User created database', _data);
          
          if(_data) await this.userAddResponse(item)
        }
      } else {
        // await this.deleteEmployeesHikvision(item.id)

        console.log('User not created ');
        
      }
    }

    return successUserList;
  }

  async userCreateInline(data: any): Promise<UserEntity | boolean> {
    const user = await this.userService.findByEmployeeNoString({
      employeeNoString: data.employeeNoString,
    });

    if (!user) {
      const userCreate = await this.userService.create(data);
      return userCreate;
    }
    return true;
  }

  async fetchUsers(): Promise<any> {
    try{
      const items = await fetch(
        `https://app.eramed.uz/app/api/v1/child/get/register`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Token: `${this.configService.get('hikvision.token')}`,
          },
        },
      );
      const { object } = await items.json();
      return object;
    } catch (err) {
      console.log(err, 'err =====> user fetch request to server');
    
    }
  }

  async userFindById(id: string): Promise<UserEntity> {
    const user = await this.userService.findById(id);
    return user;
  }

  async uploadFaceHikvisionOut(data: any): Promise<any> {
    const { imgError, image_link, id } = data;
    try {
      const imageBuffer = await axios
        .get(urlPhoto(image_link), { responseType: 'arraybuffer' })
        .then((response) => response.data);
      const formData = new FormDataPackage();
      formData.append(
        'FaceDataRecord',
        JSON.stringify({
          faceLibType: 'blackFD',
          FDID: '1',
          FPID: `${id}`,
        }),
      );
      formData.append('file', imageBuffer, 'face.jpg');
      const response = await urlLib.request(
        urlFaceUpload(this.configService.get('hikvision.hikvisionApiOut')),
        {
          digestAuth: `admin:${this.configService.get('hikvision.passwordOut')}`,
          method: 'PUT',
          content: formData['getBuffer'](),
          contentType:
            'multipart/form-data; boundary=' + formData['getBoundary'](),
          compressed: true,
          timeout: 10000,
        },
      );

      if (response.statusCode !== 200)
        return { isSuccess: false, errCode: imgError };

      return { isSuccess: true, errCode: null };
    } catch (err) {
      if (err) {
        return { isSuccess: false, errCode: err };
      }
    }
  }

  async uploadFaceHikvisionIn(data: any): Promise<any> {
    const { imgError, image_link, id } = data;

    try {
      const imageBuffer = await axios
        .get(urlPhoto(image_link), { responseType: 'arraybuffer' })
        .then((response) => response.data);
      const formData = new FormDataPackage();
      formData.append(
        'FaceDataRecord',
        JSON.stringify({
          faceLibType: 'blackFD',
          FDID: '1',
          FPID: `${id}`,
        }),
      );
      formData.append('file', imageBuffer, 'face.jpg');
      const response = await urlLib.request(
        urlFaceUpload(this.configService.get('hikvision.hikvisionApiIn')),
        {
          digestAuth: `admin:${this.configService.get('hikvision.passwordIn')}`,
          method: 'PUT',
          content: formData['getBuffer'](),
          contentType:
            'multipart/form-data; boundary=' + formData['getBoundary'](),
          compressed: true,
          timeout: 10000,
        },
      );

      if (response.statusCode !== 200)
        return { isSuccess: false, errCode: imgError };

      return { isSuccess: true, errCode: null };
    } catch (err) {
      if (err) {
        return { isSuccess: false, errCode: err };
      }
    }
  }

  async userAddResponse(data: any): Promise<any> {
    const { id, name, surname, type } = data;

    console.log(id, name, surname, type, 'id, name, surname, type =====>');

    try {
      const headers = {
        'Content-Type': 'application/json',
        Token: `${this.configService.get('hikvision.token')}`,
      }
      const user = await axios.post('https://app.eramed.uz/app/api/v1/child/register/callback',
       
        {
          id,
          type,
        },
      { headers });


      console.log(user, 'user callback =====>');
      
      return await user;
    } catch (err) {
      console.log('error in userAddResponse', err);
      
      return { isSuccess: false, errCode: err };
    }
    // async fetchUserImage(id: string): Promise<string> {
    //   const user = await this.userService.findById(id);
    //   return user.image;
    // }
    // async userFindByEmployeeNoString(employeeNoString: number): Promise<UserEntity> {
    //   const user = await this.userService.findByEmployeeNoString({
    //     employeeNoString: employeeNoString,
    //   });
    //   return user;
    // }
  }
}
