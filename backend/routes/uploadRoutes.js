import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.originalname.replace(path.extname(file.originalname), '')}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

function checkFileType(file, cb) {
	const filetypes = /jpeg|png|jpg/;
	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = filetypes.test(file.mimetype);
	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb('Images Only!');
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

router.post('/', upload.single('image'), (req,res) => {
	// console.log('reached')
	// console.log(req.file)
    res.send(`${req.file.path}`)
})

export default router;
