use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub struct PdfPagesRange {
  pages: Vec<String>,
}

#[wasm_bindgen]
impl PdfPagesRange {
  #[wasm_bindgen(constructor)]
  pub fn new(pages: Vec<String>) -> PdfPagesRange {
    PdfPagesRange { pages }
  }

  #[wasm_bindgen(getter)]
  pub fn pages(&self) -> Vec<String> {
    self.pages.clone()
  }
}
