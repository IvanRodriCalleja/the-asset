use crate::models::{
  pdf_tools_error::{PdfToolsError, PdfToolsErrorCodes},
  thumbnail_result::ThumbnailResult,
};
use base64::{engine::general_purpose, Engine as _};
use image::ImageFormat;
use pdfium_render::prelude::*;
use std::io::Cursor;
use wasm_bindgen::JsValue;

pub fn get_thumbnail(buffer: Vec<u8>, index: PdfPageIndex) -> Result<ThumbnailResult, JsValue> {
  let pdfium = Pdfium::default();
  let document = match pdfium.load_pdf_from_byte_vec(buffer, None) {
    Ok(doc) => doc,
    Err(PdfiumError::PdfiumLibraryInternalError(PdfiumInternalError::PasswordError)) => {
      return Err(PdfToolsError::new(PdfToolsErrorCodes::PasswordError).into())
    }
    Err(_) => return Err(PdfToolsError::new(PdfToolsErrorCodes::LoadError).into()),
  };
  let page = document.pages().get(index).unwrap();

  let image = page
    .render_with_config(&PdfRenderConfig::new().render_form_data(true))
    .unwrap();

  let mut buffer = Cursor::new(Vec::new());
  image
    .as_image()
    .write_to(&mut buffer, ImageFormat::Png)
    .unwrap();

  let src = general_purpose::STANDARD.encode(buffer.get_ref());
  let base64_src = format!("data:image/png;base64, {}", src);

  let rotation = get_current_rotation(&page);

  Ok(ThumbnailResult::new(
    base64_src,
    image.width(),
    image.height(),
    rotation,
  ))
}

pub fn get_current_rotation(page: &PdfPage) -> i32 {
  let current_rotation = page.rotation().unwrap_or(PdfPageRenderRotation::None);

  match current_rotation {
    PdfPageRenderRotation::None => 0,
    PdfPageRenderRotation::Degrees90 => 90,
    PdfPageRenderRotation::Degrees180 => 180,
    PdfPageRenderRotation::Degrees270 => 270,
  }
}
