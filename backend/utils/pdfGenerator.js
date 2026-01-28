const PDFDocument = require("pdfkit");

exports.generatePDF = (res, title, rows) => {
  const doc = new PDFDocument({ margin: 30 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${title}.pdf`);

  doc.pipe(res);

  doc.fontSize(18).text(title, { align: "center" });
  doc.moveDown();

  rows.forEach((row, index) => {
    doc.fontSize(12).text(`${index + 1}. ${row}`);
    doc.moveDown(0.5);
  });

  doc.end();
};
