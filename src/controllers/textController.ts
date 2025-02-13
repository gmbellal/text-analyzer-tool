import { Request, Response } from 'express';
import { TextService } from '../services/textServiceCaching';


export class TextController {

  static async createText(req: Request, res: Response) {
    const { content } = req.body;
    const createdBy: any = { id: req.user.id, name: req.user.name }; 
    const text = await TextService.createText(content, createdBy );
    res.json(text);

  }


  static async getWordCount(req: Request, res: Response) {
    const { content } = req.body;
    const wordCount = await TextService.getWordCount(content);
    res.json({ wordCount });
  }

  static async getCharacterCount(req: Request, res: Response) {
    const { content } = req.body;
    const charCount = await TextService.getCharacterCount(content);
    res.json({ charCount });
  }

  static async getSentenceCount(req: Request, res: Response) {
    const { content } = req.body;
    const sentenceCount = await TextService.getSentenceCount(content);
    res.json({ sentenceCount });
  }

  static async getParagraphCount(req: Request, res: Response) {
    const { content } = req.body;
    const paragraphCount = await TextService.getParagraphCount(content);
    res.json({ paragraphCount });
  }

  static async getLongestWord(req: Request, res: Response) {
    const { content } = req.body;
    const longestWord = await TextService.getLongestWord(content);
    res.json({ longestWord });
  }

  
}
