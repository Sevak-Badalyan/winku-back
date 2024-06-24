
import multer from 'multer';
import { extname, join } from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import uploadModel from '../../models/upload.model'; 
// import knex from '../../../knex.configs';

import { log } from 'console';
import { PostsModel } from '../../models';

class ImageUploadMiddleware {
    static upload() {
        try {
            const baseUploadDir = 'src/storage/upload';

            const storage = multer.diskStorage({
                destination(req, file, cb) {
                    // Ensure the base upload directory exists
                    fs.mkdirSync(baseUploadDir, { recursive: true });
                    const id = req.body.id;
                    const type = req.body.type;

                    if (!id ) {
                        return cb(new Error('No ID provided'), false);
                    }

                    if (!['profile', 'cover', 'posts'].includes(type)) {
                        return cb(new Error('Invalid type provided'), false);
                    }
                    let newFolder;
                    if (type === 'posts') {
                        newFolder = `${baseUploadDir}/${id}`;
                    } else {
                        newFolder = `${baseUploadDir}/${id}/${type}`;
                    }
                    fs.mkdirSync(newFolder, { recursive: true });

                    if (type === 'profile' || type === 'cover') {
                        fs.readdir(newFolder, (err, files) => {
                            if (err) {
                                return cb(new Error('Error reading folder'), false);
                            }
                            for (const file of files) {
                                fs.unlink(join(newFolder, file), err => {
                                    if (err) {
                                        return cb(new Error('Error deleting old file'), false);
                                    }
                                });
                            }
                        });
                    }

                    // Set the destination to the new folder
                    cb(null, newFolder);
                },
                filename(req, file, cb) {
                    if (file && file.mimetype.split('/')[0] !== 'image') {
                        return cb(new Error('File format error'), false);
                    }
                    const ext = extname(file.originalname).toLowerCase();
                    const fileName = uuidv4() + ext;
                    req.uploadedFileName = fileName; 
                    cb(null, fileName);
                    // Return the path of the uploaded image
                    const imagePath = `${baseUploadDir}/${req.body.id}/${req.body.type}/${fileName}`;
                    req.uploadedImagePath = imagePath; // Attach imagePath to request object
                }
            });

           

            const upload = multer({ storage });
            return (req, res, next) => {
                upload.single('image')(req, res, async err => {
                    if (err) {
                        return res.status(400).json({ error: err.message });
                    }

                    // Build the imagePath to be stored in the database
                    const { id, type } = req.body;
                    const imagePath = `upload/${id}/${type}/${req.uploadedFileName}`;
                    console.log("type", type);
                    console.log(`Image path: ${imagePath}`);
                    console.log(`User ID: ${id}`);

            try {
                await uploadModel.updateImagePath(id, type, imagePath);
                res.json({ imagePath });

            } catch (dbError) {
                return res.status(500).json({ error: 'Database update failed' });
            }


                });
            };

        } catch (error) {
            throw new Error("Cannot upload file");
        }
    }
    
    static uploadPost() {
        try {
            const baseUploadDir = 'src/storage/upload';

            const storage = multer.diskStorage({
                destination(req, file, cb) {
                    // Ensure the base upload directory exists
                    fs.mkdirSync(baseUploadDir, { recursive: true });
                    const user_id = req.body.user_id;
                    const type = req.body.type;

                    if (!user_id ) {
                        return cb(new Error('No ID provided'), false);
                    }

                  
                    let newFolder;
                    if (type === 'posts') {
                        newFolder = `${baseUploadDir}/${user_id}`;
                    } 
                    fs.mkdirSync(newFolder, { recursive: true });

                    cb(null, newFolder);
                },
                filename(req, file, cb) {
                    if (file && file.mimetype.split('/')[0] !== 'image') {
                        return cb(new Error('File format error'), false);
                    }
                    const ext = extname(file.originalname).toLowerCase();
                    const fileName = uuidv4() + ext;
                    req.uploadedFileName = fileName; 
                    cb(null, fileName);
                    // Return the path of the uploaded image
                    const imagePath = `${baseUploadDir}/${req.body.user_id}/${req.body.type}/${fileName}`;
                    req.uploadedImagePath = imagePath; // Attach imagePath to request object
                }
            });

           

            const upload = multer({ storage });
            return (req, res, next) => {
                upload.single('postPhoto')(req, res, async err => {
                    if (err) {
                        return res.status(400).json({ error: err.message });
                    }

                    // Build the imagePath to be stored in the database
                    const { user_id, type ,postText} = req.body;
                    const imagePath = `upload/${user_id}/${req.uploadedFileName}`;
                    console.log("type", type);
                    console.log("postText", postText);

                    console.log(`Image path: ${imagePath}`);
                    console.log(`User ID: ${user_id}`);

            try {
                // await PostsModel.addPosts(user_id, type, postText,imagePath);
                // res.json({ imagePath ,postText});
                await PostsModel.addPosts({
                    user_id: user_id,
                    postText: postText,
                    postPhoto: imagePath
                });
                res.json({ imagePath, postText });
            } catch (dbError) {
                return res.status(500).json({ error: 'Database update failed' });
            }


                });
            };

        } catch (error) {
            throw new Error("Cannot upload file");
        }
    }
}

export default ImageUploadMiddleware;


