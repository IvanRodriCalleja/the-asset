use pdfium_render::prelude::*;
use wasm_bindgen::prelude::*;

use crate::{hash::get_hash, pdf_result::PdfResult};

#[wasm_bindgen]
#[derive(Copy, Clone, Debug, PartialEq)]
pub enum Direction {
  Left,
  Right,
}

#[wasm_bindgen]
pub fn rotate_pdf_page(buffer: Vec<u8>, index: PdfPageIndex, direction: Direction) -> PdfResult {
  let pdfium = Pdfium::default();
  let document = pdfium.load_pdf_from_byte_vec(buffer, None).unwrap();

  let mut page = document.pages().get(index).unwrap();
  let current_rotation = page.rotation().unwrap_or(PdfPageRenderRotation::None);

  let new_rotation = calculate_new_rotation(current_rotation, direction);

  page.set_rotation(new_rotation);

  PdfResult::new(
    document.save_to_bytes().unwrap(),
    get_hash(&document).unwrap(),
  )
}

#[wasm_bindgen]
pub fn rotate_pdf(buffer: Vec<u8>, direction: Direction) -> PdfResult {
  let pdfium = Pdfium::default();
  let document = pdfium.load_pdf_from_byte_vec(buffer, None).unwrap();

  for mut page in document.pages().iter() {
    let current_rotation = page.rotation().unwrap_or(PdfPageRenderRotation::None);
    let new_rotation = calculate_new_rotation(current_rotation, direction);

    page.set_rotation(new_rotation);
  }

  PdfResult::new(
    document.save_to_bytes().unwrap(),
    get_hash(&document).unwrap(),
  )
}

fn calculate_new_rotation(
  current_rotation: PdfPageRenderRotation,
  direction: Direction,
) -> PdfPageRenderRotation {
  match direction {
    Direction::Right => match current_rotation {
      PdfPageRenderRotation::None => PdfPageRenderRotation::Degrees90,
      PdfPageRenderRotation::Degrees90 => PdfPageRenderRotation::Degrees180,
      PdfPageRenderRotation::Degrees180 => PdfPageRenderRotation::Degrees270,
      PdfPageRenderRotation::Degrees270 => PdfPageRenderRotation::None,
    },
    Direction::Left => match current_rotation {
      PdfPageRenderRotation::None => PdfPageRenderRotation::Degrees270,
      PdfPageRenderRotation::Degrees90 => PdfPageRenderRotation::None,
      PdfPageRenderRotation::Degrees180 => PdfPageRenderRotation::Degrees90,
      PdfPageRenderRotation::Degrees270 => PdfPageRenderRotation::Degrees180,
    },
  }
}
