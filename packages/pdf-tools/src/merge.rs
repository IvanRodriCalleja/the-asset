use js_sys::Uint8Array;
use pdfium_render::prelude::*;
use wasm_bindgen::prelude::*;

/// Fusión de múltiples PDFs en uno solo.
///
/// `buffers` es un vector de `Uint8Array`, donde cada elemento es un PDF en formato binario.
/// Devuelve un único PDF fusionado como un `Uint8Array`.
#[wasm_bindgen]
pub fn merge_pdfs(buffers: Vec<Uint8Array>) -> Vec<u8> {
  let pdfium = Pdfium::default();

  // Crear un nuevo documento PDF vacío como destino
  let mut destination_document = pdfium.create_new_pdf().unwrap();

  for uint8_array in buffers {
    // Convertir el Uint8Array de JavaScript en un Vec<u8> de Rust
    let mut vec_buffer = vec![0; uint8_array.length() as usize];
    uint8_array.copy_to(&mut vec_buffer);

    // Cargar el documento PDF desde el buffer
    let source_document = pdfium.load_pdf_from_byte_vec(vec_buffer, None).unwrap();

    // Copiar todas las páginas del documento fuente al destino
    destination_document
      .pages_mut()
      .append(&source_document)
      .unwrap();
  }

  destination_document.save_to_bytes().unwrap()
}
