import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { DatabaseService } from '@shared/service';

import { sync, teardown } from '../../shared.test.module';
import { EmailServiceTestModule } from './module/emailService.test.module';

describe('Email service module', () => {
    let app: INestApplication;
 
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [EmailServiceTestModule],
      }).compile();
   
      app = moduleFixture.createNestApplication();
      await app.init();
    });
   
    beforeAll(() => {
      sync();
    });
   
    afterAll(async () => {
      await teardown(app.get<DatabaseService>(DatabaseService));
    });

    const user = {
      username: "ignacio",
      email: "ignaciochalub@gmail.com",
      password: "password",
      isAdmin: false
    };

    let output: any;
    it('/user (POST)', async () => {
        output = await request(app.getHttpServer()).post('/user').send(user);

        expect(output.status).toBe(201);
        expect(output.body.username).toBe(user.username);
        expect(output.body.email).toBe(user.email);
        expect(output.body.isAdmin).toBe(user.isAdmin);
    });

    const loginCredentials = {
        username: user.username,
        password: user.password
    }

    let token: string;
    it('/login (POST)', async () => {
        output = await request(app.getHttpServer()).post('/user/login').send(loginCredentials)
        
        expect(output.status).toBe(201);
        token = output.body.token;
    });

    it('/user (GET)', async () => {
        output = await request(app.getHttpServer()).get('/user').auth(token, {type: 'bearer'});

        expect(output.status).toBe(200);
        expect(output.body.username).toBe(user.username);
        expect(output.body.email).toBe(user.email);
        expect(output.body.isAdmin).toBe(user.isAdmin);

    });

    const emailInfo = {
        to: "ignaciochalub2001@gmail.com",
        subject: "integration test",
        text: "some tests",
        date: "2022-07-27T13:28:06.419Z"
    }

    it('/email (POST)', async () => {
        output = await request(app.getHttpServer()).post('/email').auth(token, {type: 'bearer'}).send(emailInfo);
        
        expect(output.status).toBe(201);
        expect(output.body.amount).toBe(1);
    });

    it('/stats (GET)', async () => {
        output = await request(app.getHttpServer()).get('/email/stats').auth(token, {type: 'bearer'});
        
        expect(output.status).toBe(403);
    });

    const adminUser = {
        username: "alejo",
        email: "alejo@alejo.com",
        password: "password",
        isAdmin: true
    };

    it('/user (POST)(ADMIN)', async () => {
        output = await request(app.getHttpServer()).post('/user').send(adminUser);

        expect(output.status).toBe(201);
        expect(output.body.username).toBe(adminUser.username);
        expect(output.body.email).toBe(adminUser.email);
        expect(output.body.isAdmin).toBe(adminUser.isAdmin);
    });

    const adminLoginCredentials = {
        username: adminUser.username,
        password: adminUser.password
    }

    let adminToken: string;
    it('/login (POST)(ADMIN)', async () => {
        output = await request(app.getHttpServer()).post('/user/login').send(adminLoginCredentials)
        
        expect(output.status).toBe(201);
        adminToken = output.body.token;
    });    
    
    it('/stats (GET)(ADMIN)', async () => {
        output = await request(app.getHttpServer()).get('/email/stats').auth(adminToken, {type: 'bearer'});
        
        expect(output.status).toBe(200);
        expect(output.body[0].amount).toBe(1);
        expect(output.body[0].user.username).toBe(user.username);
        expect(output.body[0].user.email).toBe(user.email);
        expect(output.body[0].user.isAdmin).toBe(user.isAdmin);
    });
});
