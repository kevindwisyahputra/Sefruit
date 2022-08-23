// PHONE VALIDATOR
// 1. Nomor harus diawali dengan 0
// 2. Nomor harus memiliki panjang karakter 9-12 digit

function PhoneValidator(inputUser) {
  if (inputUser[0] !== "0") return "Nomor Harus Diawali dengan 0";

  if (inputUser.length >= 9 && inputUser.length <= 12) {
    for (let i = 0; i < inputUser.length; i++) {
      if (!(inputUser[i] >= 0)) {
        return "Nomor Harus Berupa Angka";
      } else if (inputUser[i] === " ") {
        return "Nomor Tanpa Spasi";
      }
    }
  } else {
    return "Nomor Harus 9-12 Digit";
  }

  return true;
}

export default PhoneValidator;
