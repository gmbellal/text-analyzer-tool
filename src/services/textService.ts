import { Text } from '../models/textModel';
import { cache } from '../utils/caching'; 
import {logError } from '../utils/logVisualizer';


export class TextService {

  // Method to create a new text record
  static async createText(content: string, createdBy: string): Promise<any> {
    const newText: any = new Text({ content, createdBy });
    return newText.save();
  }



  // Method to get text list
  static async getTextList(userId: string): Promise<any> {
    const cacheKey = `textList:${userId}`;
    try {
      // Try fetching from cache
      const cachedData = await cache.get(cacheKey);
      if (cachedData) {
        console.log('Cache hit');
        return JSON.parse(cachedData);
      }
      console.log('Cache miss, fetching from DB');
      const textList = await Text.find({ "createdBy.id": userId });
      // Store the data in cache for future requests (1 hour)
      await cache.set(cacheKey, JSON.stringify(textList), 3600);
      return textList;
    } catch (error: any) {
      throw new Error(`Error fetching text list: ${error.message}`);
    }
  }




  // Method to get text by ID
  static async getTextById(id: string): Promise<any> {
    const text = Text.findById(id);
    return text;
  }


  static async getTextAnalysisReport(userId: []): Promise<any> {
    try {
      const  userIds: []  = userId;
      const cacheKey = `textAnalysisReport:${userIds.join(',')}`;
      const cachedReport = await cache.get(cacheKey);
      if (cachedReport) {
        return JSON.parse(cachedReport);
      }
      // Fetch texts from the database for the given users
      const texts = await Text.find({ "createdBy.id": { $in: userIds } });
      if (!texts.length) {
        return null;
      }
      // Generate report
      const report = texts.map((textDoc) => {
        const text = textDoc.content;
        return {
          textId: textDoc._id,
          createdBy: textDoc.createdBy,
          wordCount: text.split(/\s+/).filter(Boolean).length,
          characterCount: text.replace(/\s+/g, '').length,
          sentenceCount: text.split('.').filter(Boolean).length,
          paragraphCount: text.split('\n').filter(Boolean).length,
          longestWord: text.split(/\s+/).reduce((longest, current) => 
          current.length > longest.length ? current : longest, ''),
          createdAt: textDoc.createdAt
        };
      });
      // Cache the report for 1 hour
      await cache.set(cacheKey, JSON.stringify(report), 3600);

      return report
    } catch (err: any) {
      logError('Error getting text analysis report'+err.message);
      return err;
    }
  }


  
  // Method to get the word count
  static async getWordCount(text: string): Promise<number> {
    const cacheKey = `wordCount:${text}`;
    // Check if the result is in cache
    const cachedWordCount = await cache.get(cacheKey);
    if (cachedWordCount) {
      return parseInt(cachedWordCount, 10);  // Return cached word count
    }
    // If not cached, calculate the word count
    const wordCount = text.split(/\s+/).filter(word => word).length;
    
    // Cache the result
    await cache.set(cacheKey, wordCount.toString(), 3600);  // Cache for 1 hour
    return wordCount;
  }

  // Method to get the character count
  static async getCharacterCount(text: string): Promise<number> {
    const cacheKey = `charCount:${text}`;

    // Check if the result is in cache
    const cachedCharCount = await cache.get(cacheKey);
    if (cachedCharCount) {
      return parseInt(cachedCharCount, 10);  // Return cached character count
    }

    // If not cached, calculate the character count
    const charCount = text.replace(/\s+/g, '').length;
    
    // Cache the result
    await cache.set(cacheKey, charCount.toString(), 3600);  // Cache for 1 hour
    return charCount;
  }

  // Method to get the sentence count
  static async getSentenceCount(text: string): Promise<number> {
    const cacheKey = `sentenceCount:${text}`;

    // Check if the result is in cache
    const cachedSentenceCount = await cache.get(cacheKey);
    if (cachedSentenceCount) {
      return parseInt(cachedSentenceCount, 10);  // Return cached sentence count
    }

    // If not cached, calculate the sentence count
    const sentenceCount = text.split('.').filter(sentence => sentence.trim()).length;
    
    // Cache the result
    await cache.set(cacheKey, sentenceCount.toString(), 3600);  // Cache for 1 hour
    return sentenceCount;
  }

  // Method to get the paragraph count
  static async getParagraphCount(text: string): Promise<number> {
    const cacheKey = `paragraphCount:${text}`;

    // Check if the result is in cache
    const cachedParagraphCount = await cache.get(cacheKey);
    if (cachedParagraphCount) {
      return parseInt(cachedParagraphCount, 10);  // Return cached paragraph count
    }

    // If not cached, calculate the paragraph count
    const paragraphCount = text.split('\n').filter(paragraph => paragraph.trim()).length;
    
    // Cache the result
    await cache.set(cacheKey, paragraphCount.toString(), 3600);  // Cache for 1 hour
    return paragraphCount;
  }

  // Method to get the longest word
  static async getLongestWord(text: string): Promise<string> {
    const cacheKey = `longestWord:${text}`;

    // Check if the result is in cache
    const cachedLongestWord = await cache.get(cacheKey);
    if (cachedLongestWord) {
      return cachedLongestWord;  // Return cached longest word
    }

    // If not cached, calculate the longest word
    const words = text.split(/\s+/);
    const longestWord = words.reduce((longest, current) => current.length > longest.length ? current : longest, '');

    // Cache the result
    await cache.set(cacheKey, longestWord, 3600);  // Cache for 1 hour
    return longestWord;
  }

}
