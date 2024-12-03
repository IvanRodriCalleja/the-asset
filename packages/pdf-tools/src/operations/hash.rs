use pdfium_render::prelude::*;

use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

pub fn get_pdf_hash(buffer: &Vec<u8>) -> String {
  let mut hasher = DefaultHasher::new();
  buffer.hash(&mut hasher);
  let hash = hasher.finish();

  hash.to_string()
}

pub fn get_hash(document: &PdfDocument) -> Result<String, Box<dyn std::error::Error>> {
  let mut hasher = DefaultHasher::new();

  for page_index in 0..document.pages().len() {
    let page = document.pages().get(page_index)?;
    let text = page.text().unwrap().all();

    // Usar el texto como entrada para el hasher
    text.hash(&mut hasher);
  }

  // Retornar el hash como un u64
  Ok(hasher.finish().to_string())
}
