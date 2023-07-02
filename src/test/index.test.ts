import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';

//  @ts-ignore
let should = chai.should();
chai.use(chaiHttp);

let testUser: any;

describe("User", () => {
  before(() => {
    testUser = {
      "username": "foobar",
      "firstname": "foo",
      "lastname": "bar"
    }
  });
  describe("POST /api/users", () => {
    it('saves user to storage', (done) => {
      chai.request(server)
        .post('/api/users')
        .set('content-type', 'application/json')
        .send(testUser)
        .end((err: any, res: any) => {
          if (err) {}
          res.should.have.status(200);
          res.body.ok.should.be.true;

          done();
        });
    });
    
    it('show error message on missing properties', (done) => {
      chai.request(server)
        .post('/api/users')
        .set('content-type', 'application/json')
        .send({
          "username": "foobar",
          "firstname": "foo"
        })
        .end((err: any, res: any) => {
          if (err) {}
          res.body.ok.should.be.false;
          res.body.errors.should.exist;
          
          done();
        });
    });
  });
  
  describe("GET /api/users", () => {
    it('return list of users', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err: any, res: any) => {
          if (err) {}
          res.should.have.status(200);
          res.body.data.should.be.an('array');

          done();
        });
    });
  });

  describe("GET /api/users/:userId", () => {
    it('return expected user', (done) => {
      chai.request(server)
        .get('/api/users/1')
        .end((err: any, res: any) => {
          if (err) {}
          res.body.data.username.should.equal(testUser.username);
          res.body.data.firstname.should.equal(testUser.firstname);
          res.body.data.lastname.should.equal(testUser.lastname);

          done();
        });
    });
    
    it('return an error on non-existent user', (done) => {
      chai.request(server)
        .get('/api/users/2')
        .end((err: any, res: any) => {
          if (err) {}
          res.body.ok.should.be.false;

          done();
        });
    });
  });

  describe("PUT /api/users/:userId", () => {
    it('returns correct response', (done) => {
      const newLastname = 'bar2';
      chai.request(server)
        .put('/api/users/1')
        .set('content-type', 'application/json')
        .send({
          "lastname": newLastname
        })
        .end((err: any, res: any) => {
          if (err) {}
          res.should.have.status(200);
          res.body.data.lastname.should.equal(newLastname);

          done();
        });
    });

    it('user data in storage is updated', (done) => {
      const newLastname = 'bar2';
      chai.request(server)
        .get('/api/users/1')
        .end((err: any, res: any) => {
          if (err) {}
          res.body.data.lastname.should.equal(newLastname);

          done();
        });
    });
    
    it('return an error on non-existent user', (done) => {
      const newLastname = 'bar2';
      chai.request(server)
        .put('/api/users/2')
        .set('content-type', 'application/json')
        .send({
          "lastname": newLastname
        })
        .end((err: any, res: any) => {
          if (err) {}
          res.body.ok.should.be.false;

          done();
        });
    });
  });

  describe("DELETE /api/users/:userId", () => {
    it('returns correct response on deletion', (done) => {
      chai.request(server)
        .delete('/api/users/1')
        .end((err: any, res: any) => {
          if (err) {}
          res.body.ok.should.be.true;

          done();
        });
    });
    it('user is removed from storage', (done) => {
      chai.request(server)
        .get('/api/users/1')
        .end((err: any, res: any) => {
          if (err) {}
          res.body.ok.should.be.false;

          done();
        });
    });
    it('return error on non-existent user', (done) => {
      chai.request(server)
        .delete('/api/users/2')
        .end((err: any, res: any) => {
          if (err) {}
          res.body.ok.should.be.false;

          done();
        });
    });
  });
});