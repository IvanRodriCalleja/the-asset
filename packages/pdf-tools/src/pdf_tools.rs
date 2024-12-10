use crate::{
  models::{
    add_file::AddFileInput,
    pdf_result::PdfResult,
    pdf_tools_error::{PdfToolsError, PdfToolsErrorCodes},
    the_asset_file::TheAssetFile,
  },
  operations::{
    decrypt::decrypt_pdf,
    file_size::get_file_size,
    merge::merge_pdfs,
    page::get_total_pages,
    remove::remove_pdf_page,
    rotate::{rotate_pdf, rotate_pdf_page, Direction},
    thumbnail::{get_thumbnail, GetThumbnailResult},
  },
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
pub struct PdfTools {
  files: Vec<TheAssetFile>,
}

#[wasm_bindgen]
impl PdfTools {
  #[wasm_bindgen(constructor)]
  pub fn new() -> PdfTools {
    PdfTools { files: Vec::new() }
  }

  fn find_file(&self, id: &str) -> Result<&TheAssetFile, JsValue> {
    self
      .files
      .iter()
      .find(|f| f.id == id)
      .ok_or_else(|| return PdfToolsError::new(PdfToolsErrorCodes::FileNotFound).into())
  }

  fn find_file_mut(&mut self, id: &str) -> Result<&mut TheAssetFile, JsValue> {
    self
      .files
      .iter_mut()
      .find(|f| f.id == id)
      .ok_or_else(|| return PdfToolsError::new(PdfToolsErrorCodes::FileNotFound).into())
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
    };
    self.files.push(file);
  }

  pub fn get_thumbnail(
    &self,
    id: String,
    page: PdfPageIndex,
  ) -> Result<GetThumbnailResult, JsValue> {
    let file = self.find_file(&id)?;
    let thumbnail = get_thumbnail(file.buffer.clone(), page)?;

    Ok(thumbnail)
  }

  pub fn remove_file(&mut self, id: String) {
    self.files.retain(|f| f.id != id);
  }

  pub fn get_total_pages(&self, id: String) -> Result<usize, JsValue> {
    let file = self.find_file(&id)?;

    Ok(get_total_pages(&file.buffer))
  }

  pub fn rotate_pdf(
    &mut self,
    id: String,
    direction: Direction,
  ) -> Result<FileOperationResult, JsValue> {
    let file = self.find_file_mut(&id)?;

    let result = rotate_pdf(file.buffer.clone(), direction);
    file.buffer = result.buffer();
    file.hash = result.hash();

    Ok(FileOperationResult::new(file.id.clone(), file.hash.clone()))
  }

  pub fn rotate_pdf_page(
    &mut self,
    id: String,
    page: u32,
    direction: Direction,
  ) -> Result<FileOperationResult, JsValue> {
    let file = self.find_file_mut(&id)?;

    let result = rotate_pdf_page(file.buffer.clone(), page, direction);
    file.buffer = result.buffer();
    file.hash = result.hash();

    Ok(FileOperationResult::new(file.id.clone(), file.hash.clone()))
  }

  pub fn remove_pdf_page(
    &mut self,
    id: String,
    page: PdfPageIndex,
  ) -> Result<FileOperationResult, JsValue> {
    let file = self.find_file_mut(&id)?;

    let result = remove_pdf_page(file.buffer.clone(), page);

    file.buffer = result.buffer();
    file.hash = result.hash();

    Ok(FileOperationResult::new(file.id.clone(), file.hash.clone()))
  }

  pub fn decrypt_pdf(
    &mut self,
    id: String,
    password: String,
  ) -> Result<FileOperationResult, JsValue> {
    let file = self.find_file_mut(&id)?;

    let result = decrypt_pdf(file.buffer.clone(), &password)?;
    file.buffer = result.buffer();
    file.hash = result.hash();

    Ok(FileOperationResult::new(file.id.clone(), file.hash.clone()))
  }

  pub fn merge_files(&self, ids: Vec<String>) -> PdfResult {
    let files: Vec<Vec<u8>> = ids
      .iter()
      .filter_map(|id| {
        self
          .files
          .iter()
          .find(|f| &f.id == id)
          .map(|f| f.buffer.clone())
      })
      .collect();

    let result = merge_pdfs(files);

    result
  }

  pub fn get_file_size(&self, id: String) -> Result<String, JsValue> {
    let file = self.find_file(&id)?;

    Ok(get_file_size(&file.buffer))
  }

  pub fn get_file(self, id: String) -> Result<Vec<u8>, JsValue> {
    let file = self.find_file(&id)?;

    Ok(file.buffer.clone())
  }
}
