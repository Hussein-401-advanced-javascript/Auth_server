const { server } = require('../src/server.js');
const Users = require('../src/auth/models/users/usersmodel.js');
const supergoose = require('@code-fellows/supergoose');
const agent = supergoose(server);
const base64 = require('base-64');

describe('basic-auth middlleware', () => {
  let trueTestObj = {
    username: 'hussain1',
    password: '12345',
  };

  let trueTestObj2 = {
    username: 'hussain2',
    password: '54321',
  };

  let falseObj = {
    notUsername: false,
    password: '404',
  };

  it('allow a new user to signup', async() => {
    let signupResponse = await agent.post('/signup').send(trueTestObj);
    expect(signupResponse.status).toBe(200);
    expect(!!signupResponse.text).toBeTruthy();
  });


  it('invalid signup', async() => {
    jest.spyOn(global.console, 'error');
    console.log = jest.fn();
    let signupResponse = await agent.post('/signup').send(falseObj);
    expect(console.log).toHaveBeenCalled();
    expect(signupResponse.status).toBe(403);
  });

  it('can allow an existing user to sign in', async() => {
    let authHeader = base64.encode(
      `${trueTestObj.username}:${trueTestObj.password}`,
    );

    let signinResponse = await agent
      .post('/signin')
      .set('authorization', `Basic ${authHeader}`);

    expect(signinResponse.status).toBe(200);
    expect(!!signinResponse.text).toBeTruthy();
  });

  it('will return a 500 error for incorrect login credentials', async() => {

    let realBadAuthHeader = base64.encode(
      `testingbobred:wrong-password1234`,
    );

    let signinResponse = await agent
      .post('/signin')
      .set('authorization', `Basic ${realBadAuthHeader}`);

    expect(signinResponse.statusCode).toBe(500);
    expect(signinResponse.body).toEqual({});

    let wrongPasswordHeader = base64.encode(
      `${trueTestObj.username}:wrong-password1234-again-555`,
    );

    let signinResponse2 = await agent
      .post('/signin')
      .set('authorization', `Basic ${wrongPasswordHeader}`);
    expect(signinResponse2.statusCode).toBe(500);
    expect(signinResponse2.body).toEqual({});
  });

  // it('can return all users', async() => {
  //   await Users.create(trueTestObj2);

  //   let autHeader = base64.encode(
  //     `${trueTestObj.username}:${trueTestObj.password}`,
  //   );

  //   let getResponse = await agent
  //     .get('/users')
  //     .set('authorization', `Basic ${autHeader}`);
  //   expect(getResponse.status).toEqual(200);
  //   expect(getResponse.body[0].username).toEqual('hussain1');
  //   expect(getResponse.body[1].username).toEqual('hussain2');
  // });

  // it('will return a 200 and an array of objects when called get users', async() => {

  //   let getResponse = await agent.get('/users');
  //   expect(getResponse.status).toEqual(200);
  //   expect(getResponse.body).not.toEqual({});
  // });

});