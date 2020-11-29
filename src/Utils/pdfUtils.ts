import * as pdfJs from 'pdfjs-dist';

const BASE64_PREFIX = ';base64,';

export const loadPdfText = (
  base64pdf: string,
  pdfTextCallback: (finalPdfText: string) => any
) => {
  const parsedPdf = base64ToArrayBuffer(base64pdf);
  const pdfLoader = pdfJs.getDocument(parsedPdf).promise;

  pdfLoader.then((pdf) => {
    setTextForAllPdfPages(pdf, pdfTextCallback);
  });
};

const setTextForAllPdfPages = (
  pdf: pdfJs.PDFDocumentProxy,
  pdfTextCallback: (finalPdfText: string) => any
) => {
  const pagesPromises = [];

  for (let i = 0; i < pdf.numPages; i++) {
    pagesPromises.push(getPageText(i + 1, pdf));
  }

  Promise.all(pagesPromises).then((pagesText) => {
    let finalPdfText = '';
    for (let i = 0; i < pagesText.length; i++) {
      finalPdfText += pagesText[i];
    }

    pdfTextCallback(finalPdfText);
  });
};

const getPageText = (pageNum: number, pdf: pdfJs.PDFDocumentProxy) => {
  return new Promise(async (resolve, reject) => {
    const pdfPage = await pdf.getPage(pageNum);
    const textContent = await pdfPage.getTextContent();
    const textItems = textContent.items;
    let finalPdfText = '';

    for (let i = 0; i < textItems.length; i++) {
      finalPdfText += textItems[i].str;
    }

    resolve(finalPdfText);
  });
};

const base64ToArrayBuffer = (base64: string) => {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
};

export const isValidPdf = (uploadedFiles: FileList | null) => {
  const fileExists = uploadedFiles && uploadedFiles.length > 0;

  if (!fileExists) {
    return false;
  }

  const fileName = uploadedFiles![0].name;
  const fileExtension = getFileExtension(fileName);
  return fileExtension?.toLowerCase() === 'pdf';
};

const getFileExtension = (fileName: string) => {
  return fileName.split('.').pop();
};

export const stripPrefixFromBase64String = (base64String: string) => {
  const base64Index =
    base64String.indexOf(BASE64_PREFIX) + BASE64_PREFIX.length;
  return base64String.substr(base64Index);
};
