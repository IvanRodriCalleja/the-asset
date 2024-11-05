use std::io::Cursor;

use lopdf::Document;
use wasm_bindgen::prelude::*;

use crate::{hash::get_pdf_hash, pdf_result::PdfResult};

#[wasm_bindgen]
pub fn decrypt_pdf(buffer: Vec<u8>, password: &str) -> PdfResult {
  let mut document = Document::load_mem(&buffer).unwrap();
  document.decrypt(password).unwrap();

  let mut buffer = Cursor::new(Vec::new());
  document.save_to(&mut buffer).unwrap();

  let buffer = buffer.into_inner();

  PdfResult::new(buffer.clone(), get_pdf_hash(buffer))
}
