import { Request, Response } from 'express';
import {logError } from '../utils/logVisualizer';
import { TextService } from '../services/textServiceCaching';


export class TextController {

  static async createText(req: Request, res: Response) {
    const { content } = req.body;
    const createdBy: any = { id: req.user.id, name: req.user.name }; 
    const text = await TextService.createText(content, createdBy );
    res.json(text);
  }


  static async getTextList(req: Request, res: Response) {
    TextService.getTextList(req.user.id).then((texts) => {
      res.status(200).json(texts);
    }).catch((err) => {
      logError('Error getting text list'+err.message);
      res.status(404).json({ error: 'Opps! Something went wrong.' });
    });
  }


  static async getTextById(req: Request, res: Response) {
    TextService.getTextById(req.params.id).then((text) => {
      if(`${text.createdBy.id}` !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized to view this text' });
      }else{
        res.status(200).json(text);
      }
    }).catch((err) => {
      logError('Error getting text by id'+err.message);
      res.status(404).json({ error: 'Opps! Something went wrong.' });
    });
  }



  static async updateTextById(req: Request, res: Response) {
    TextService.getTextById(req.params.id).then((text) => {
      if(`${text.createdBy.id}` !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized to update this text' });
      }else{
        text.content = req.body.content;
        text.save();
        res.status(200).json({message: 'Text updated successfully'});
      }
    }).catch((err) => {
      logError('Error updating text'+err.message);
      res.status(404).json({ error: 'Opps! Something went wrong.' });
    });
  }



  static async deleteTextById(req: Request, res: Response) {
    TextService.getTextById(req.params.id).then((text) => {
      if(`${text.createdBy.id}` !== req.user.id) {
        return res.status(403).json({ error: 'Unauthorized to delete this text' });
      }else{
        text.remove();
        res.status(200).json({message: 'Text deleted successfully'});
      }
    }).catch((err) => {
      logError('Error deleting text'+err.message);
      res.status(404).json({ error: 'Opps! Something went wrong.' });
    });
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
