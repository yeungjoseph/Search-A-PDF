import * as pdfJs from 'pdfjs-dist';

export const getPageText = (pageNum: number, pdf: pdfJs.PDFDocumentProxy) => {
  return new Promise(async (resolve, reject) => {
    const pdfPage = await pdf.getPage(pageNum);
    const textContent = await pdfPage.getTextContent();
    const textItems = textContent.items;
    let finalPdfText = "";

    for (let i = 0; i < textItems.length; i++) {
      finalPdfText += textItems[i].str + " ";
    }

    resolve(finalPdfText);
  });
}

export const base64ToArrayBuffer = (base64: string) => {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}