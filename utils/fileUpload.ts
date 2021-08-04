const formidable = require('formidable-serverless');

export default async function fileUpload(request: any) {
    return await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm()
        form.encoding = 'utf-8';
        form.uploadDir = process.cwd() + "/public/uploads";
        form.keepExtensions = true;
        form.on('file', function (name, file) { });
        form.on('error', function (err) { console.log(err); });
        form.on('aborted', function () { console.log('Aborted'); });
        form.parse(request, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files })
        })
    });;
}