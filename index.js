const express = require('express');
const app = express();
const port = 3000;

const multer = require('multer');
// const upload = new multer (); /// config multer to upload file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const bodyParser = require('body-parser');

app.set("view engine", 'hbs');

const PDFDocument = require('pdfkit');
const fs = require('fs');

app.get('/', (req, res) => {
    res.render('main');
});

app.post('/imageToPdf', upload.array('images'), (req, res) => {
    // Get the uploaded image files from req.files
    const images = req.files.map((file) => file.buffer);

    // Create a new PDF document
    const doc = new PDFDocument();

    images.forEach((imageBuffer, index) => {
        if (index > 0) {
            doc.addPage(); // Start a new page for all images except the first one
        }
        doc.image(imageBuffer, 0, 0, { width: 600 });
    });

    // Finalize the PDF
    doc.end();

    // Set the appropriate response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="converted_pdf.pdf"');

    // Pipe the PDF content to the response
    doc.pipe(res);
});



app.post('/pdfToImage', upload.single('pdfFile'), (req, res) => {
    // if (!req.file) {
    //     return res.status(400).send('No PDF file uploaded.');
    // }
    res.end("Listining to PdfToImage");
});

const PDF2Pic = require('pdf2pic');
const archiver = require('archiver');

// app.post('/pdfToImage', upload.single('pdfFile'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).send('No PDF file uploaded.');
//     }

//     const pdfBuffer = req.file.buffer;

//     // Create a temporary directory for image files
//     const tempDir = 'temp';
//     if (!fs.existsSync(tempDir)) {
//         fs.mkdirSync(tempDir);
//     }

//     // Configure pdf2pic options
//     const pdf2pic = new PDF2Pic({
//         density: 300,           // output image quality
//         savename: 'pdf',        // name for the output images
//         savedir: tempDir,       // save directory
//         format: "jpg",          // output image format
//         size: "1000x1000"       // output size
//     });

//     // Convert PDF to images
//     const imagePaths = await pdf2pic.convertBuffer(pdfBuffer, -1);

//     if (!imagePaths || imagePaths.length === 0) {
//         return res.status(500).send('PDF to Image conversion failed.');
//     }

//     // Create a zip archive
//     const output = fs.createWriteStream('pdf_images.zip');
//     const archive = archiver('zip', {
//         zlib: { level: 9 } // Set compression level
//     });

//     // Pipe archive data to the response
//     output.on('close', () => {
//         res.download('pdf_images.zip', 'pdf_images.zip', (err) => {
//             if (err) {
//                 console.error(err);
//                 res.status(500).send('Zip creation error');
//             }
//             // Clean up the temporary directory and zip file
//             fs.rmdirSync(tempDir, { recursive: true });
//             fs.unlinkSync('pdf_images.zip');
//         });
//     });

//     archive.pipe(output);

//     // Add image files to the zip archive
//     imagePaths.forEach((imagePath, index) => {
//         const imageName = `page_${index + 1}.jpg`; // Naming images serially
//         archive.file(imagePath, { name: imageName });
//     });

//     archive.finalize();
// });
app.listen(port, () => console.log(`App listening on port ${port}!`));