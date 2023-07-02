import { Router } from 'express';
import store from '../storage';
import { body, param, validationResult } from 'express-validator';

const router = Router({ mergeParams: true });

router.post(
  '/',
  body(['username', 'firstname', 'lastname']).notEmpty(),
  async (req: any, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ ok: false, errors: result.array()});
    }
    
    store.createUser(req.body);
    return res.send({ ok: true });
  }
);

router.get(
  '/',
  async (_, res) => {
    res.send({
      ok: true,
      data: store.fetchAll() 
    });
  }
);

router.get(
  '/:userId',
  async (req: any, res) => {
    const user = store.getUser(parseInt(req.params.userId));
    
    res.send({
      ok: typeof user !== 'undefined',
      data: user
    });
  }
);

router.put(
  '/:userId',
  param('userId').isInt(),
  async (req: any, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ ok: false, errors: result.array()});
    }

    const user = store.updateUser(parseInt(req.params.userId), req.body);

    return res.send({
      ok: typeof user !== 'undefined',
      data: user
    });
  }
);

router.delete(
  '/:userId',
  param('userId').isInt(),
  async (req: any, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ ok: false, errors: result.array()});
    }

    const success = store.deleteUser(parseInt(req.params.userId));

    return res.send({
      ok: success
    });
  }
);

export default router;