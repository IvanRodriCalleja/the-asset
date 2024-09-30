use base64::{engine::general_purpose, Engine as _};
use image::ImageFormat;
use pdfium_render::prelude::*;
use std::io::Cursor;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct GetThumbnailResult {
  src: String,
  width: i32,
  height: i32,
}

#[wasm_bindgen]
impl GetThumbnailResult {
  #[wasm_bindgen(constructor)]
  pub fn new(src: String, width: i32, height: i32) -> GetThumbnailResult {
    GetThumbnailResult { src, width, height }
  }

  #[wasm_bindgen(getter)]
  pub fn src(&self) -> String {
    self.src.clone()
  }

  #[wasm_bindgen(getter)]
  pub fn width(&self) -> i32 {
    self.width
  }

  #[wasm_bindgen(getter)]
  pub fn height(&self) -> i32 {
    self.height
  }
}

#[wasm_bindgen]
pub fn get_thumbnail(buffer: Vec<u8>, index: PdfPageIndex) -> GetThumbnailResult {
  let pdfium = Pdfium::default();
  let document = pdfium.load_pdf_from_byte_vec(buffer, None).unwrap();
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

  GetThumbnailResult::new(base64_src, image.width(), image.height())
}
