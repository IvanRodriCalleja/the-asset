use pdfium_render::prelude::PdfPageIndex;
use wasm_bindgen::JsValue;

use crate::thumbnail::GetThumbnailResult;

pub trait Thumbnail {
  fn get_thumbnail(&self, id: String, page: PdfPageIndex) -> Result<GetThumbnailResult, JsValue>;
}
