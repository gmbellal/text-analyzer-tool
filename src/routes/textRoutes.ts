import { Router } from 'express';
import { TextController } from '../controllers/textController';
const router = Router();

//CRUD text
router.post('/create', TextController.createText);
router.get('/list', TextController.getTextList);
router.get('/get/:id', TextController.getTextById);
router.put('/update/:id', TextController.updateTextById);
router.delete('/delete/:id', TextController.deleteTextById);

//Analize text
router.post('/word-count', TextController.getWordCount);
router.post('/character-count', TextController.getCharacterCount);
router.post('/sentence-count', TextController.getSentenceCount);
router.post('/paragraph-count', TextController.getParagraphCount);
router.post('/longest-word', TextController.getLongestWord);

declare module "express-serve-static-core" {
    interface Request {
      user?: any
    }
}

export { router as textRoutes };
