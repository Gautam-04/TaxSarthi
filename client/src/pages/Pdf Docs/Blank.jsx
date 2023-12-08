import React from 'react'
import { PDFViewer } from '@react-pdf/renderer';
import OldDoc from './Old Regin/OldDoc';

function Blank() {
  return (
    <>
      <PDFViewer>
        <OldDoc />
      </PDFViewer>
    </>
  );
}

export default Blank