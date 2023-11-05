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



// app.post('/pdfToImage', (req,res)=>{
//     res.end("Listining to PdfToImage");
// });
app.listen(port, () => console.log(`App listening on port ${port}!`));