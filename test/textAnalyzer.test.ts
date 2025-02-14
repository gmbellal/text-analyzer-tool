import request from 'supertest';
import { app } from '../src/app';



let accessToken: string;

beforeAll(async () => {
  // Step 1: Authenticate and get JWT token
  const authResponse = await request(app)
    .post('/api/auth/login')
    .send({ 
      username: 'gmbellal',  // Use a valid username
      password: '123456' // Replace with the correct password
    });
  // Step 2: Validate response and extract the token
  expect(authResponse.status).toBe(200);
  expect(authResponse.body).toHaveProperty('data.signData.token');
  accessToken = authResponse.body.data.signData.token; // Extract token correctly
});



describe('Text Analyzer API Tests', () => {

  //word count test case
  it('Should return word count', async () => {
    const response = await request(app)
      .post('/api/texts/word-count')
      .set('Authorization', `Bearer ${accessToken}`) 
      .send({ content: 'The quick brown fox jumps over the lazy dog.' });
    expect(response.status).toBe(200);
    expect(response.body.wordCount).toBe(9);
  });

  //character count test case
  it('Should return character count', async () => {
    const response = await request(app)
      .post('/api/texts/character-count')
      .set('Authorization', `Bearer ${accessToken}`) 
      .send({ content: 'The quick brown fox jumps over the lazy dog.' });
    expect(response.status).toBe(200);
    expect(response.body.charCount).toBe(36);
  });

  //sentence count test case
  it('Should return sentence count', async () => {
    const response = await request(app)
      .post('/api/texts/sentence-count')
      .set('Authorization', `Bearer ${accessToken}`) 
      .send({ content: 'The quick brown fox jumps over the lazy dog.' });
    expect(response.status).toBe(200);
    expect(response.body.sentenceCount).toBe(1);
  });

  //paragraph count test case
  it('Should return paragraph count', async () => {
    const response = await request(app)
      .post('/api/texts/paragraph-count')
      .set('Authorization', `Bearer ${accessToken}`) 
      .send({ content: 'The quick brown fox jumps over the lazy dog.' });
    expect(response.status).toBe(200);
    expect(response.body.paragraphCount).toBe(1);
  });

  //longest words test case
  it('Should return longest words in paragraphs', async () => {
    const response = await request(app)
      .post('/api/texts/longest-word')
      .set('Authorization', `Bearer ${accessToken}`) 
      .send({ content: 'The quick brown fox jumps over the lazy dog.' });
    expect(response.status).toBe(200);
    expect(response.body.longestWord).toBe('quick');
  });

  
});