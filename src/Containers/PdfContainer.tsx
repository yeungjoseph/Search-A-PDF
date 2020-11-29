import React from 'react';
import './PdfContainer.css';
import * as pdfJs from 'pdfjs-dist';
import {
  isValidPdf,
  loadPdfText,
  stripPrefixFromBase64String,
} from '../Utils/pdfUtils';
import { DragAndDrop } from '../Components/DragAndDrop';
import { PdfEmptyState } from '../Components/PdfEmptyState';

pdfJs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfJs.version}/pdf.worker.js`;

export const PdfContainer = () => {
  const [pdfText, setPdfText] = React.useState('');

  const clearPdfText = () => {
    setPdfText('');
  };

  const handleNativeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    uploadPdf(e.currentTarget.files);
  };

  const uploadPdf = (files: FileList | null) => {
    if (!files || files.length <= 0) {
      clearPdfText();
      return;
    }

    if (!isValidPdf(files)) {
      alert('Invalid file extension: Only .pdf files are supported');
      clearPdfText();
      return;
    }

    const reader = new FileReader();
    const file = files[0];

    reader.onload = async (fileLoadedEvent: ProgressEvent<FileReader>) => {
      const text = fileLoadedEvent.target?.result;

      if (typeof text === 'string') {
        const base64String = stripPrefixFromBase64String(text);
        loadPdfText(base64String, setPdfText);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="pdf-container">
      <DragAndDrop handleDrop={uploadPdf}>
        <div className="drag-and-drop__child-container">
          Drag your PDF file here to convert it to text!
        </div>
      </DragAndDrop>

      <div className="pdf-uploader">
        <input
          type="file"
          name="pdfUploader"
          onChange={handleNativeFileUpload}
        />
      </div>
      <DragAndDrop handleDrop={uploadPdf}>
        <div className="pdf-text" contentEditable={true}>
          {pdfText ? pdfText : <PdfEmptyState />}
        </div>
      </DragAndDrop>
      <div className="clear-pdf-btn" onClick={clearPdfText}>
        Clear PDF
      </div>
    </div>
  );
};
