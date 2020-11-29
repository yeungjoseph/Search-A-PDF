import * as React from 'react';
import emptyPdfTextImg from '../../Assets/duckmagnifyspeech-trans.png';

export const PdfEmptyState = () => (
  <>
    <h2 className="empty-pdf-text__header">
      Your PDF will show up as text here
    </h2>
    <img src={emptyPdfTextImg} alt="duck" />
  </>
);
