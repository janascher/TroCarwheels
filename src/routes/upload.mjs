import multer, {diskStorage} from "multer"; 

const storage = diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'upload')
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];           
            const newName = `${Math.random().toString(36).slice(-10)}-${Date.now()}.${ext}`;

            req.newName = newName;
            cb(null, newName)
        },
    });

const fileFilter = (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    if (ext === 'jpeg' || ext === 'png'){
        cb(null, true);
    } else {
        cb(new Error(`Not a JPEG or PNG file!`), false);
    }    
}

const multerUpload = multer({storage, fileFilter});

export { multerUpload };

