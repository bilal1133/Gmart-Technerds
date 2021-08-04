import fs from 'fs';

export default async function removeImage(image_path: string) {
    let image_url = process.cwd() + "/public" + image_path;
    fs.unlinkSync(image_url);
}