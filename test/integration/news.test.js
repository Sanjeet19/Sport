const request = require('supertest');
const { app } = require('../../index');

describe('News API Integration Tests', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  // Create News API Tests
  describe('/news POST endpoint', () => {
    // Functional tests
    it('should return 201 Created for valid news creation', async () => {
      const data = {
        title: 'Test News Title',
        description: 'Test news description',
        match: 1, 
      };
      const response = await request(server)
        .post('/news')
        .send(data);
      expect(response.status).toBe(201);
    });

    it('should return 400 Bad Request for missing title', async () => {
      const data = {
        description: 'Test news description',
        match: 1,
      };
      const response = await request(server)
        .post('/news')
        .send(data);
      expect(response.status).toBe(400);
    });

    it('should return 400 Bad Request for missing description', async () => {
      const data = {
        title: 'Test News Title',
        match: 1,
      };
      const response = await request(server)
        .post('/news')
        .send(data);
      expect(response.status).toBe(400);
    });

    it('should return 400 Bad Request for invalid data types', async () => {
      const data = {
        title: 123, // Should be string
        description: 'Test news description',
        match: 'invalid_match_id', // Should be integer
      };
      const response = await request(server)
        .post('/news')
        .send(data);
      expect(response.status).toBe(400);
    });

    it('should return 201 Created for news with only one of match, sport, or tour', async () => {
      const data = {
        title: 'Test News Title',
        description: 'Test news description',
        sport: 1, // Replace with actual sport ID
      };
      const response = await request(server)
        .post('/news')
        .send(data);
      expect(response.status).toBe(201);
    });

    it('should return 400 Bad Request for news with none of match, sport, or tour', async () => {
      const data = {
        title: 'Test News Title',
        description: 'Test news description',
      };
      const response = await request(server)
        .post('/news')
        .send(data);
      expect(response.status).toBe(400);
    });
  });

  // Fetch News API Tests
  describe('/news/search GET endpoint', () => {
    // Functional tests
    it('should return 200 OK with news for a valid match ID', async () => {
      const id = 1; // Replace with actual match ID
      const name = 'match';
      const response = await request(server)
        .get(`/news/search?id=<span class="math-inline">\{id\}&name\=</span>{name}`);
      expect(response.status).toBe(200);
    });

    it('should return 200 OK with news for a valid tour ID', async () => {
      const id = 1; // Replace with actual tour ID
      const name = 'tour';
      const response = await request(server)
        .get(`/news/search?id=<span class="math-inline">\{id\}&name\=</span>{name}`);
      expect(response.status).toBe(200);
    });

    it('should return 200 OK with news for a valid sport ID', async () => {
      const id = 1; // Replace with actual sport ID
      const name = 'sport';
      const response = await request(server)
        .get(`/news/search?id=<span class="math-inline">\{id\}&name\=</span>{name}`);
      expect(response.status).toBe(200);
    });

    it('should return 400 Bad Request for missing ID', async () => {
        const name = 'match';
        const response = await request(server)
          .get(`/news/search?name=${name}`);
        expect(response.status).toBe(400);
      });
  
      it('should return 400 Bad Request for invalid ID format', async () => {
        const id = 'invalid_id';
        const name = 'match';
        const response = await request(server)
          .get(`/news/search?id=${id}&name=${name}`);
        expect(response.status).toBe(400);
      });
  
      it('should return 400 Bad Request for invalid name parameter', async () => {
        const id = 1;
        const name = 'invalid_name';
        const response = await request(server)
          .get(`/news/search?id=${id}&name=${name}`);
        expect(response.status).toBe(400);
      });
  
      it('should return 200 OK with an empty array if no news found', async () => {
        const id = -1; 
        const name = 'match';
        const response = await request(server)
          .get(`/news/search?id=${id}&name=${name}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });
    });
  });