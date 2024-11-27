use crate::{
  decrypt::decrypt_pdf,
  file_size::get_file_size,
  hash::get_pdf_hash,
  merge::merge_pdfs,
  models::the_asset_file::TheAssetFile,
  page::get_total_pages,
  pdf_result::PdfResult,
  remove::remove_pdf_page,
  rotate::{rotate_pdf, rotate_pdf_page, Direction},
  thumbnail::{get_thumbnail, GetThumbnailResult},
  traits::add_file::AddFileInput,
};
use pdfium_render::prelude::PdfPageIndex;
use pdfium_render::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct FileOperationResult {
  id: String,
  hash: String,
}

#[wasm_bindgen]
impl FileOperationResult {
  #[wasm_bindgen(constructor)]
  pub fn new(id: String, hash: String) -> FileOperationResult {
    FileOperationResult { id, hash }
  }

  #[wasm_bindgen(getter)]
  pub fn id(&self) -> String {
    self.id.clone()
  }

  #[wasm_bindgen(getter)]
  pub fn hash(&self) -> String {
    self.hash.clone()
  }
}

#[wasm_bindgen]
pub struct MergeToolManager {
  files: Vec<TheAssetFile>,
}

#[wasm_bindgen]
impl MergeToolManager {
  #[wasm_bindgen(constructor)]
  pub fn new() -> MergeToolManager {
    MergeToolManager { files: Vec::new() }
  }

  pub fn add_file(&mut self, file: AddFileInput) {
    let pdfium = Pdfium::default();

    // This means is encrypted
    let buffer = match pdfium.load_pdf_from_byte_vec(file.buffer(), None) {
      Ok(doc) => doc.save_to_bytes().unwrap(),
      Err(_) => file.buffer(),
    };

    let file = TheAssetFile {
      id: file.id(),
      hash: file.id(),
      buffer: buffer,
      name: file.name(),
      is_encrypted: false,
    };
    self.files.push(file);
  }

  pub fn get_thumbnail(
    &self,
    id: String,
    page: PdfPageIndex,
  ) -> Result<GetThumbnailResult, JsValue> {
    let file = self.files.iter().find(|f| f.id == id).unwrap();

    let thumbnail = match get_thumbnail(file.buffer.clone(), page) {
      Ok(doc) => doc,
      Err(e) => return Err(e),
    };

    Ok(thumbnail)
  }

  pub fn get_total_pages(&self, id: String) -> u16 {
    let file = self.files.iter().find(|f| f.id == id).unwrap();

    get_total_pages(file.buffer.clone())
  }

  pub fn rotate_pdf(&mut self, id: String, direction: Direction) -> FileOperationResult {
    let file = self.files.iter_mut().find(|f| f.id == id).unwrap();

    let result = rotate_pdf(file.buffer.clone(), direction);
    file.buffer = result.buffer();
    file.hash = result.hash();

    FileOperationResult::new(file.id.clone(), file.hash.clone())
  }

  pub fn rotate_pdf_page(
    &mut self,
    id: String,
    page: u32,
    direction: Direction,
  ) -> FileOperationResult {
    let file = self.files.iter_mut().find(|f| f.id == id).unwrap();

    let result = rotate_pdf_page(file.buffer.clone(), page, direction);
    file.buffer = result.buffer();
    file.hash = result.hash();

    FileOperationResult::new(file.id.clone(), file.hash.clone())
  }

  pub fn remove_pdf_page(&mut self, id: String, page: PdfPageIndex) -> FileOperationResult {
    let file = self.files.iter_mut().find(|f| f.id == id).unwrap();

    let result = remove_pdf_page(file.buffer.clone(), page);

    file.buffer = result.buffer();
    file.hash = result.hash();

    FileOperationResult::new(file.id.clone(), file.hash.clone())
  }

  pub fn decrypt_pdf(
    &mut self,
    id: String,
    password: String,
  ) -> Result<FileOperationResult, JsValue> {
    let file = self.files.iter_mut().find(|f| f.id == id).unwrap();

    let result = decrypt_pdf(file.buffer.clone(), &password).map_err(|err| JsValue::from(err))?;
    file.buffer = result.buffer();
    file.hash = result.hash();

    Ok(FileOperationResult::new(file.id.clone(), file.hash.clone()))
  }

  pub fn merge_files(&self, ids: Vec<String>) -> PdfResult {
    let files = self
      .files
      .iter()
      .filter(|f| ids.contains(&f.id))
      .map(|f| f.buffer.clone())
      .collect();

    let result = merge_pdfs(files);

    result
  }

  pub fn get_file_size(&self, id: String) -> String {
    let file = self.files.iter().find(|f| f.id == id).unwrap();

    get_file_size(&file.buffer)
  }

  pub fn get_file(self, id: String) -> Vec<u8> {
    let file = self.files.iter().find(|f| f.id == id).unwrap();

    file.buffer.clone()
  }
}
