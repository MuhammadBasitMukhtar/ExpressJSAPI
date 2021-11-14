const multer = require('multer');
const multerConfig = {
    destination: (req,file,cb) => {
        cb(null,"./uploads/")
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + "-" + file.originalname;
        cb(null, fileName);
    }
}

const storage = multer.diskStorage(multerConfig);
const upload = multer({storage});

module.exports = upload;