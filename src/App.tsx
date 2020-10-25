import React from 'react';
import './App.css';
import * as pdfJs from 'pdfjs-dist';

pdfJs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfJs.version}/pdf.worker.js`;

const PDF_DATA_BASE64 =
  'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
  'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
  'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
  'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
  'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
  'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
  'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
  'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
  'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
  'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
  'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
  'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
  'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';

const App = () => {
  const [pdfText, setPdfText] = React.useState('');
  React.useEffect(() => {
    const pdfLoader = pdfJs.getDocument(base64ToArrayBuffer(PDF_DATA_BASE64)).promise;
    pdfLoader.then((pdf) => {
      const pdfDocument: pdfJs.PDFDocumentProxy = pdf;
      const pagesPromises = [];

      for (let i = 0; i < pdf.numPages; i++) {
        pagesPromises.push(getPageText(i + 1, pdfDocument));
      }

      Promise.all(pagesPromises).then((pagesText) => {
        for (let i = 0; i < pagesText.length; i++) {
          setPdfText(pdfText + pagesText[i]);
        }
      });
    });
  }, [])

  return (
    <div className="App">
      <h1>PDF</h1>
      <p>{pdfText}</p>
    </div>
  );
}

const base64ToArrayBuffer = (base64: string) => {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

const getPageText = (pageNum: number, pdf: pdfJs.PDFDocumentProxy) => {
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

export default App;
