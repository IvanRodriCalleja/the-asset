use wasm_bindgen::prelude::*;

use crate::hash::get_pdf_hash;

#[wasm_bindgen]
pub struct PdfResult {
  buffer: Vec<u8>,
  hash: String,
}

#[wasm_bindgen]
impl PdfResult {
  #[wasm_bindgen(constructor)]
  pub fn new(buffer: Vec<u8>, hash: String) -> PdfResult {
    PdfResult { buffer, hash }
  }

  #[wasm_bindgen(getter)]
  pub fn buffer(&self) -> Vec<u8> {
    self.buffer.clone()
  }

  #[wasm_bindgen(getter)]
  pub fn hash(&self) -> String {
    self.hash.clone()
  }
}
