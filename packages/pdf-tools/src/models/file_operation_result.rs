use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct FileOperationResult {
  id: u16,
  hash: String,
}

#[wasm_bindgen]
impl FileOperationResult {
  #[wasm_bindgen(constructor)]
  pub fn new(id: u16, hash: String) -> FileOperationResult {
    FileOperationResult { id, hash }
  }

  #[wasm_bindgen(getter)]
  pub fn id(&self) -> u16 {
    self.id.clone()
  }

  #[wasm_bindgen(getter)]
  pub fn hash(&self) -> String {
    self.hash.clone()
  }
}
