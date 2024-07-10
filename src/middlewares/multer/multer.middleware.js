

import multer from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import uploadModel from '../../models/upload.model';
import supabase from './supabase';
import { PostsModel } from '../../models';

class ImageUploadMiddleware {
    static upload() {
        const storage = multer.memoryStorage(); 

        const upload = multer({ storage });

        return (req, res, next) => {
            upload.single('image')(req, res, async err => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }

                const { id, type } = req.body;
                if (!id) {
                    return res.status(400).json({ error: 'No ID provided' });
                }

                if (!['profile', 'cover', 'posts'].includes(type)) {
                    return res.status(400).json({ error: 'Invalid type provided' });
                }

                const file = req.file;
                if (!file) {
                    return res.status(400).json({ error: 'No file provided' });
                }

                const ext = extname(file.originalname).toLowerCase();
                const fileName = uuidv4() + ext;
                const filePath = `${id}/${type}/${fileName}`;

                try {

                    if (type === 'profile' || type === 'cover') {
                        const { data, error: listError } = await supabase.storage
                            .from('upload')
                            .list(`${id}/${type}`, { limit: 1 });

                        if (listError) {
                            throw listError;
                        }

                        if (data.length > 0) {
                            const oldFilePath = `${id}/${type}/${data[0].name}`;
                            const { error: deleteError } = await supabase.storage
                                .from('upload')
                                .remove([oldFilePath]);

                            if (deleteError) {
                                throw deleteError;
                            }
                        } 
                       
                    }

                    const { error: uploadError } = await supabase.storage
                        .from('upload')
                        .upload(filePath, file.buffer);

                    if (uploadError) {
                        throw uploadError;
                    }

                    const { data: { publicUrl }, error: publicUrlError } = supabase.storage
                        .from('upload')
                        .getPublicUrl(filePath);

                    if (publicUrlError) {
                        throw publicUrlError;
                    }

                    await uploadModel.updateImagePath(id, type, publicUrl);
                    res.json({ imagePath: publicUrl });
                } catch (dbError) {
                    return res.status(500).json({ error: 'Database update failed' });
                }
            });
        };
    }



    
    static uploadPost() {
        const storage = multer.memoryStorage();
    
        const upload = multer({ storage });
    
        return (req, res, next) => {
            upload.single('postPhoto')(req, res, async err => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
    
                const { user_id, postText } = req.body;
    
                if (!user_id) {
                    return res.status(400).json({ error: 'No user ID provided' });
                }
    
                const file = req.file;
                let publicUrl = null;
    
                if (file) {
                    const ext = extname(file.originalname).toLowerCase();
                    const fileName = uuidv4() + ext;
                    const filePath = `${user_id}/${fileName}`;
    
                    try {
                        const { error: uploadError } = await supabase.storage
                            .from('upload')
                            .upload(filePath, file.buffer);
    
                        if (uploadError) {
                            throw uploadError;
                        }
    
                        const { data: { publicUrl: url }, error: publicUrlError } = supabase.storage
                            .from('upload')
                            .getPublicUrl(filePath);
    
                        if (publicUrlError) {
                            throw publicUrlError;
                        }
    
                        publicUrl = url;
                    } catch (uploadError) {
                        return res.status(500).json({ error: 'File upload failed' });
                    }
                }
    
                try {
                    const post = {
                        user_id: user_id,
                        postText: postText || null,
                        postPhoto: publicUrl || null
                    };
    
                    await PostsModel.addPosts(post);
    
                    res.json({ imagePath: publicUrl, postText });
                } catch (dbError) {
                    return res.status(500).json({ error: 'Database update failed' });
                }
            });
        };
    }
    
}

export default ImageUploadMiddleware;








//  fs    fs convert to supabse ^

// import multer from 'multer';
// import { extname, join } from 'path';
// import fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';
// import uploadModel from '../../models/upload.model'; 
// // import knex from '../../../knex.configs';

// import { log } from 'console';
// import { PostsModel } from '../../models';

// class ImageUploadMiddleware {
//     static upload() {
//         try {
//             const baseUploadDir = 'src/storage/upload';

//             const storage = multer.diskStorage({
//                 destination(req, file, cb) {
//                     fs.mkdirSync(baseUploadDir, { recursive: true });
//                     const id = req.body.id;
//                     const type = req.body.type;

//                     if (!id ) {
//                         return cb(new Error('No ID provided'), false);
//                     }

//                     if (!['profile', 'cover', 'posts'].includes(type)) {
//                         return cb(new Error('Invalid type provided'), false);
//                     }
//                     let newFolder;
//                     if (type === 'posts') {
//                         newFolder = `${baseUploadDir}/${id}`;
//                     } else {
//                         newFolder = `${baseUploadDir}/${id}/${type}`;
//                     }
//                     fs.mkdirSync(newFolder, { recursive: true });

//                     if (type === 'profile' || type === 'cover') {
//                         fs.readdir(newFolder, (err, files) => {
//                             if (err) {
//                                 return cb(new Error('Error reading folder'), false);
//                             }
//                             for (const file of files) {
//                                 fs.unlink(join(newFolder, file), err => {
//                                     if (err) {
//                                         return cb(new Error('Error deleting old file'), false);
//                                     }
//                                 });
//                             }
//                         });
//                     }

//                     cb(null, newFolder);
//                 },
//                 filename(req, file, cb) {
//                     if (file && file.mimetype.split('/')[0] !== 'image') {
//                         return cb(new Error('File format error'), false);
//                     }
//                     const ext = extname(file.originalname).toLowerCase();
//                     const fileName = uuidv4() + ext;
//                     req.uploadedFileName = fileName; 
//                     cb(null, fileName);
//                     const imagePath = `${baseUploadDir}/${req.body.id}/${req.body.type}/${fileName}`;
//                     req.uploadedImagePath = imagePath; 
//                 }
//             });

           

//             const upload = multer({ storage });
//             return (req, res, next) => {
//                 upload.single('image')(req, res, async err => {
//                     if (err) {
//                         return res.status(400).json({ error: err.message });
//                     }

//                     const { id, type } = req.body;
//                     const imagePath = `upload/${id}/${type}/${req.uploadedFileName}`;
//                     console.log("type", type);
//                     console.log(`Image path: ${imagePath}`);
//                     console.log(`User ID: ${id}`);

//             try {
//                 await uploadModel.updateImagePath(id, type, imagePath);
//                 res.json({ imagePath });

//             } catch (dbError) {
//                 return res.status(500).json({ error: 'Database update failed' });
//             }


//                 });
//             };

//         } catch (error) {
//             throw new Error("Cannot upload file");
//         }
//     }
    
//     static uploadPost() {
//         try {
//             const baseUploadDir = 'src/storage/upload';

//             const storage = multer.diskStorage({
//                 destination(req, file, cb) {
//                     fs.mkdirSync(baseUploadDir, { recursive: true });
//                     const user_id = req.body.user_id;
//                     const type = req.body.type;

//                     if (!user_id ) {
//                         return cb(new Error('No ID provided'), false);
//                     }

                  
//                     let newFolder;
//                     if (type === 'posts') {
//                         newFolder = `${baseUploadDir}/${user_id}`;
//                     } 
//                     fs.mkdirSync(newFolder, { recursive: true });

//                     cb(null, newFolder);
//                 },
//                 filename(req, file, cb) {
//                     if (file && file.mimetype.split('/')[0] !== 'image') {
//                         return cb(new Error('File format error'), false);
//                     }
//                     const ext = extname(file.originalname).toLowerCase();
//                     const fileName = uuidv4() + ext;
//                     req.uploadedFileName = fileName; 
//                     cb(null, fileName);
//                     const imagePath = `${baseUploadDir}/${req.body.user_id}/${req.body.type}/${fileName}`;
//                     req.uploadedImagePath = imagePath; 
//                 }
//             });

           

//             const upload = multer({ storage });
//             return (req, res, next) => {
//                 upload.single('postPhoto')(req, res, async err => {
//                     if (err) {
//                         return res.status(400).json({ error: err.message });
//                     }

//                     const { user_id, type ,postText} = req.body;
//                     const imagePath = `upload/${user_id}/${req.uploadedFileName}`;
//                     console.log("type", type);
//                     console.log("postText", postText);

//                     console.log(`Image path: ${imagePath}`);
//                     console.log(`User ID: ${user_id}`);

//             try {
//                 await PostsModel.addPosts({
//                     user_id: user_id,
//                     postText: postText,
//                     postPhoto: imagePath
//                 });
//                 res.json({ imagePath, postText });
//             } catch (dbError) {
//                 return res.status(500).json({ error: 'Database update failed' });
//             }


//                 });
//             };

//         } catch (error) {
//             throw new Error("Cannot upload file");
//         }
//     }
// }

// export default ImageUploadMiddleware;


