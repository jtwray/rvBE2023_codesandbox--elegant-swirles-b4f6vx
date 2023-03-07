const request = require('supertest');
const server = require('../server');
const db = require('../../data/dbConfig');

describe('auth-router', () => {

    beforeEach(async () => {
        await db('landowner').truncate();//                    -----reset DB before running test-----
    });
    //     //****************************************\\
    //    //----test register/   type|status|data-----\\
    describe('.post(/register', () => {
        it('should add provided user into the db on registration', async () => {
            await db('landowner').truncate();

            const newUser = await request(server).post(`/auth/register/landowner`).send({ username: "bigJohn", password: "password", email: "t@w.com" });

            expect(newUser.type).toEqual("application/json");
            expect(newUser.text).toMatch(/.+\..+\..+/); //-----DATA-----post/auth/login/landowner
            expect(newUser.text).toMatch(/"id"/); //-----DATA-----post/auth/login/landowner
            expect(newUser.text).toMatch(/username/); //-----DATA-----post/auth/login/landowner
            expect(newUser.text).toMatch(/token/); //-----DATA-----post/auth/login/landowner
            expect(newUser.status).toBe(201);

        });
        //    \\----test register/   type|status|data-----  //
        //     \\******************************************//
        //************************************************************************
        //************************************************************************



        //************************************************************************
        //************************************************************************
        //            //******************************************\\
        //           //----test register post/ status|data|type----\\
        //
        describe('server.js', () => {

            describe('register', () => {
                it('should return an OK status code from the register route', async () => {
                    await db('landowner').truncate();
                    const expectedStatusCode = 201;
                    const response = await request(server).post('/auth/register/landowner/').send({ username: "bigJohn", password: "password", email: "t@w.com" });

                    expect(response.status).toEqual(expectedStatusCode);                //-----STATUS-----post/auth/login/landowner
                });


                it('should return a JSON object with DATA from the register route', async () => {
                    await db('landowner').truncate();
                    const response = await request(server).post('/auth/register/landowner').send({ username: "bigJohn", password: "password", email: "t@w.com" });
                    expect(response.body.token).toMatch(/.+\..+\..+/); //-----DATA-----post/auth/login/landowner
                    expect(response.body.username).toMatch(/bigJohn/); //-----DATA-----post/auth/login/landowner
                    expect(response.body.id).toMatch(/1/); //-----DATA-----post/auth/login/landowner


                });

                it('should return a JSON object from the register route', async () => {
                    await db('landowner').truncate();
                    const response = await request(server).post('/auth/register/landowner').send({ username: "bigJohn", password: "password", email: "t@w.com" });
                    expect(response.type).toEqual('application/json');                  //-----TYPE-----post/auth/login/landowner
                });
            });


            //           \\----test register post/ type|status|data-----//
            //            \\*******************************************//
            //            //*******************************************\\
            //           //---- test login post/ status|data|type  ---- \\
            //

            describe('login', () => {
                it('should return an OK status code on log-in', () => {
                    return db('landowner').truncate() //                    -----reset DB before running test-----
                        .then(() => {
                            //                                          -----register a new USER|PW combo for LOGIN-----
                            return request(server).post('/auth/register/landowner').send({ username: "bigJohn", password: "password", email: "t@w.com" });
                        })
                        .then(() => {
                            return request(server).post('/auth/login/landowner').send({ username: "bigJohn", password: "password" });
                        })
                        .then((response) => {

                            const expectedStatusCode = 200;
                            expect(response.status).toEqual(expectedStatusCode);//-----STATUS-----post/auth/login/landowner
                        })

                });

                it('should return DATA from the login route', async () => {
                    return db('landowner').truncate() //                    -----reset DB before running test-----
                        .then(() => {
                            //                                          -----register a new USER|PW combo for LOGIN-----
                            return request(server).post('/auth/register/landowner').send({ username: "bigJohn", password: "password", email: "t@w.com" });
                        })
                    const expectedBody = { id: 1, username: "bigJohn", token }; //------DATA----- post/auth/login/landowner

                    const response = await request(server).post('/auth/login/landowner', { username: "bigJohn", password: "password" });

                    expect(response.body).toEqual(expectedBody);
                });

                it('should return a JSON object from the login route', async () => {
                    return db('landowner').truncate() //                    -----reset DB before running test-----
                        .then(() => {
                            //                                          -----register a new USER|PW combo for LOGIN-----
                            return request(server).post('/auth/register/landowner').send({ username: "bigJohn", password: "password", email: "t@w.com" });
                        })
                    const response = await request(server).post('/auth/login/landowner', { username: "bigJohn", password: "password" });

                    expect(response.type).toEqual('application/json');          //------TYPE----- post/auth/login/landowner
                });
            });
        });

    });

    describe('/ get index', () => {
        it('should return an OK status code from the index route', async () => {

            const expectedStatusCode = 200;

            const response = await request(server).get('/');

            expect(response.status).toEqual(expectedStatusCode);   //-----STATUS---- get index/

        });

        it('should return DATA: server launched message from the index route', async () => {
            const expectedBody = { api: 'uppp' };

            const response = await request(server).get('/');

            expect(response.body).toEqual(expectedBody);           //----DATA---- get index/
        });

        it('should return a JSON object from the index route', async () => {
            const response = await request(server).get('/');

            expect(response.type).toEqual('application/json');     //---TYPE----  get index/
        });
    })
})