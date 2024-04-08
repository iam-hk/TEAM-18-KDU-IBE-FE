export function encodeCardNumber(cardNumber:string) {
    const shift = 3;
    let encoded = '';
    for (let i = 0; i < cardNumber.length; i++) {
      let charCode = cardNumber.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        encoded += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        encoded += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
      } else if (charCode >= 48 && charCode <= 57) {
        encoded += String.fromCharCode(((charCode - 48 + shift) % 10) + 48);
      } else {
        encoded += cardNumber[i]; 
      }
    }
    return encoded;
  }