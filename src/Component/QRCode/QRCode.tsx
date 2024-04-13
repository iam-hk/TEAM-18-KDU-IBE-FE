import React from 'react';
import QRCode from 'react-qr-code';
import "./QRCode.scss"
const QRCodeGenerator = ({ link }) => {
  return (
    <div className='qr-wrapper'>
      <QRCode value={link} />
    </div>
  );
};

export default QRCodeGenerator;