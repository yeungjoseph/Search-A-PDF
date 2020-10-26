import React from 'react';
import './App.css';
import * as pdfJs from 'pdfjs-dist';
import {
  base64ToArrayBuffer,
  BASE64_PREFIX,
  getPageText,
} from './Utils/pdfUtils';

pdfJs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfJs.version}/pdf.worker.js`;

const App = () => {
  const [pdfText, setPdfText] = React.useState('');

  const loadPdfText = (base64pdf: string) => {
    setPdfText('');

    const parsedPdf = base64ToArrayBuffer(base64pdf);
    const pdfLoader = pdfJs.getDocument(parsedPdf).promise;

    pdfLoader.then((pdf) => {
      setTextForAllPdfPages(pdf);
    });
  };

  const setTextForAllPdfPages = (pdf: pdfJs.PDFDocumentProxy) => {
    const pagesPromises = [];

    for (let i = 0; i < pdf.numPages; i++) {
      pagesPromises.push(getPageText(i + 1, pdf));
    }

    Promise.all(pagesPromises).then((pagesText) => {
      let finalPdfText = '';
      for (let i = 0; i < pagesText.length; i++) {
        finalPdfText += pagesText[i];
      }

      setPdfText(finalPdfText);
    });
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e.currentTarget.files || e.currentTarget.files.length <= 0) return;

    const reader = new FileReader();
    const file = e.currentTarget.files[0];

    reader.onload = async (fileLoadedEvent: ProgressEvent<FileReader>) => {
      const text = fileLoadedEvent.target?.result;

      if (typeof text === 'string') {
        const base64Index = text.indexOf(BASE64_PREFIX) + BASE64_PREFIX.length;
        const base64String = text.substr(base64Index);
        loadPdfText(base64String);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="App">
      <h1>Search a PDF</h1>
      <input type="file" name="pdfUploader" onChange={uploadFile} />
      <br />
      <div contentEditable={true}>{pdfText}</div>
    </div>
  );
};

export default App;
