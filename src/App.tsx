import React from 'react';
import './App.css';
import * as pdfJs from 'pdfjs-dist';
import { base64ToArrayBuffer, getPageText } from './Utils/pdfUtils';

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
    loadPdfText();
  }, [])

  const loadPdfText = () => {
    const parsedPdf = base64ToArrayBuffer(PDF_DATA_BASE64);
    const pdfLoader = pdfJs.getDocument(parsedPdf).promise;

    pdfLoader.then((pdf) => {
      setTextForAllPdfPages(pdf);
    });
  }

  const setTextForAllPdfPages = (pdf: pdfJs.PDFDocumentProxy) => {
    const pagesPromises = [];

    for (let i = 0; i < pdf.numPages; i++) {
      pagesPromises.push(getPageText(i + 1, pdf));
    }

    Promise.all(pagesPromises).then((pagesText) => {
      for (let i = 0; i < pagesText.length; i++) {
        setPdfText(pdfText + pagesText[i]);
      }
    });
  }

  return (
    <div className="App">
      <h1>Search a PDF</h1>
      <p>{pdfText}</p>
    </div>
  );
}

export default App;