use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct ThumbnailResult {
  src: String,
  width: i32,
  height: i32,
  rotation: i32,
}

#[wasm_bindgen]
impl ThumbnailResult {
  #[wasm_bindgen(constructor)]
  pub fn new(src: String, width: i32, height: i32, rotation: i32) -> ThumbnailResult {
    ThumbnailResult {
      src,
      width,
      height,
      rotation,
    }
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

  #[wasm_bindgen(getter)]
  pub fn rotation(&self) -> i32 {
    self.rotation
  }
}
