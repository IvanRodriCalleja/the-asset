use pdfium_render::prelude::*;

use crate::{hash::get_hash, pdf_result::PdfResult};

pub fn merge_pdfs(buffers: Vec<Vec<u8>>) -> PdfResult {
  let pdfium = Pdfium::default();

  // Crear un nuevo documento PDF vacío como destino
  let mut destination_document = pdfium.create_new_pdf().unwrap();

  for vec_buffer in buffers {
    // Cargar el documento PDF desde el buffer
    let source_document = pdfium.load_pdf_from_byte_vec(vec_buffer, None).unwrap();

    // Copiar todas las páginas del documento fuente al destino
    destination_document
      .pages_mut()
      .append(&source_document)
      .unwrap();
  }

  PdfResult::new(
    destination_document.save_to_bytes().unwrap(),
    get_hash(&destination_document).unwrap(),
  )
}
