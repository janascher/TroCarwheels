import multer, {diskStorage} from "multer";
import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../../views/uploads'))
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

