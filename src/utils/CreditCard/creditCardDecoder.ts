export function decodeCardNumber(encoded:string) {
    const shift = 3;
    let decoded = '';
    for (let i = 0; i < encoded.length; i++) {
      let charCode = encoded.charCodeAt(i);
      if (charCode >= 65 && charCode <= 90) {
        decoded += String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
        decoded += String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
      } else if (charCode >= 48 && charCode <= 57) {
        decoded += String.fromCharCode(((charCode - 48 - shift + 10) % 10) + 48);
      } else {
        decoded += encoded[i]; 
      }
    }
    return decoded;
  }