use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
#[derive(Clone)]
pub struct AddFileInput {
  id: u16,
  buffer: Vec<u8>,
  name: String,
}

#[wasm_bindgen]
impl AddFileInput {
  #[wasm_bindgen(constructor)]
  pub fn new(id: u16, buffer: Vec<u8>, name: String) -> AddFileInput {
    AddFileInput { id, buffer, name }
  }

  #[wasm_bindgen(getter)]
  pub fn id(&self) -> u16 {
    self.id.clone()
  }

  #[wasm_bindgen(getter)]
  pub fn buffer(&self) -> Vec<u8> {
    self.buffer.clone()
  }

  #[wasm_bindgen(getter)]
  pub fn name(&self) -> String {
    self.name.clone()
  }
}

#[wasm_bindgen]
pub struct AddFileResult {
  id: u16,
  hash: String,
}

#[wasm_bindgen]
impl AddFileResult {
  #[wasm_bindgen(constructor)]
  pub fn new(id: u16, hash: String) -> AddFileResult {
    AddFileResult { id, hash }
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
