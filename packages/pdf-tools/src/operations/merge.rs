use pdfium_render::prelude::*;

use crate::models::pdf_result::PdfResult;

use super::hash::get_hash;

pub fn merge_pdfs(buffers: Vec<&[u8]>) -> PdfResult {
  let pdfium = Pdfium::default();

  // Crear un nuevo documento PDF vacío como destino
  let mut destination_document = pdfium.create_new_pdf().unwrap();
  let destination_pages = destination_document.pages_mut();

  let mut current_page_index = 0;

  for vec_buffer in buffers {
    let source_document = pdfium
      .load_pdf_from_byte_vec(vec_buffer.to_vec(), None)
      .unwrap();
    let source_pages = source_document.pages();

    let page_range = format!("1-{}", source_pages.len());

    destination_pages
      .copy_pages_from_document(&source_document, &page_range, current_page_index)
      .unwrap();

    current_page_index += source_pages.len();
  }

  PdfResult::new(
    destination_document.save_to_bytes().unwrap(),
    get_hash(&destination_document).unwrap(),
  )
}
