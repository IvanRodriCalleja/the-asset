use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct PdfToolsError {
  code: PdfToolsErrorCodes,
}

#[wasm_bindgen]
impl PdfToolsError {
  #[wasm_bindgen(constructor)]
  pub fn new(code: PdfToolsErrorCodes) -> PdfToolsError {
    PdfToolsError { code }
  }

  #[wasm_bindgen(getter)]
  pub fn code(&self) -> PdfToolsErrorCodes {
    self.code
  }
}

#[wasm_bindgen]
#[derive(Copy, Clone, Debug)]
pub enum PdfToolsErrorCodes {
  Unknown = 0,
  PasswordError = 1,
  LoadError = 2,
  WrongPassword = 3,
  DecryptionError = 4,
}
