use std::io::Cursor;

use lopdf::{encryption::DecryptionError, Document, Error};
use wasm_bindgen::prelude::*;

use crate::{
  hash::get_pdf_hash,
  models::pdf_tools_error::{PdfToolsError, PdfToolsErrorCodes},
  pdf_result::PdfResult,
};

#[wasm_bindgen]
pub fn decrypt_pdf(buffer: Vec<u8>, password: &str) -> Result<PdfResult, JsValue> {
  let mut document = Document::load_mem(&buffer).unwrap();

  match document.decrypt(password) {
    Ok(doc) => doc,
    Err(Error::Decryption(DecryptionError::IncorrectPassword)) => {
      return Err(PdfToolsError::new(PdfToolsErrorCodes::WrongPassword).into())
    }
    Err(_) => return Err(PdfToolsError::new(PdfToolsErrorCodes::DecryptionError).into()),
  };

  let mut buffer = Cursor::new(Vec::new());
  document.save_to(&mut buffer).unwrap();

  let buffer = buffer.into_inner();

  Ok(PdfResult::new(buffer.clone(), get_pdf_hash(buffer)))
}
