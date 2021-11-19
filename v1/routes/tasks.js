const router = express.Router();
const controller = require('../controllers/tasks.controller')

router.post('/add', controller.add);
router.get('/get', controller.get);
router.post('/update', controller.update);
router.post('/delete', controller.delete);
module.exports = router;