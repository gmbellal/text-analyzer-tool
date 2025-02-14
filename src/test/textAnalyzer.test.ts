import request from 'supertest';
import { app } from '../app';









describe('Text Analyzer API Tests', () => {

  //word count test case
  it('Should return word count', async () => {
    const response = await request(app)
      .post('/api/texts/word-count')
      .send({ content: 'The quick brown fox jumps over the lazy dog.' });
    expect(response.status).toBe(200);
    expect(response.body.wordCount).toBe(9);
  });

  //character count test case
  it('Should return character count', async () => {
    const response = await request(app)
      .post('/api/texts/character-count')
      .send({ content: 'The quick brown fox jumps over the lazy dog.' });
    expect(response.status).toBe(200);
    expect(response.body.charCount).toBe(36);
  });

  //sentence count test case
  it('Should return sentence count', async () => {
    const response = await request(app)
      .post('/api/texts/sentence-count')
      .send({ content: 'The quick brown fox jumps over the lazy dog.' });
    expect(response.status).toBe(200);
    expect(response.body.sentenceCount).toBe(1);
  });

  //paragraph count test case
  it('Should return paragraph count', async () => {
    const response = await request(app)
      .post('/api/texts/paragraph-count')
      .send({ content: 'The quick brown fox jumps over the lazy dog.' });
    expect(response.status).toBe(200);
    expect(response.body.paragraphCount).toBe(1);
  });

  //longest words test case
  it('Should return longest words in paragraphs', async () => {
    const response = await request(app)
      .post('/api/texts/longest-word')
      .send({ content: 'The quick brown fox jumps over the lazy dog.' });
    expect(response.status).toBe(200);
    expect(response.body.longestWord).toBe('quick');
  });

  
});