use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
#[derive(Clone)]
pub struct AddFileInput {
  id: String,
  buffer: Vec<u8>,
  name: String,
}

#[wasm_bindgen]
impl AddFileInput {
  #[wasm_bindgen(constructor)]
  pub fn new(id: String, buffer: Vec<u8>, name: String) -> AddFileInput {
    AddFileInput { id, buffer, name }
  }

  #[wasm_bindgen(getter)]
  pub fn id(&self) -> String {
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
pub trait AddFile {
  fn add_file(&mut self, file: AddFileInput);
}
