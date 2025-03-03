use crate::{
  models::{
    add_file::{AddFileInput, AddFileResult},
    file_operation_result::FileOperationResult,
    pdf_pages_range::PdfPagesRange,
    pdf_result::PdfResult,
    pdf_tools_error::{PdfToolsError, PdfToolsErrorCodes},
    the_asset_file::TheAssetFile,
    thumbnail_result::ThumbnailResult,
  },
  operations::{
    decrypt::decrypt_pdf,
    file_size::get_file_size,
    hash::get_buffer_hash,
    merge::merge_pdfs,
    page::get_total_pages,
    remove::remove_pdf_page,
    rotate::{rotate_pdf, rotate_pdf_page, Direction},
    split::split_into_individual_pdfs,
    thumbnail::get_thumbnail,
  },
};
use pdfium_render::prelude::PdfPageIndex;
use pdfium_render::prelude::*;
use wasm_bindgen::prelude::*;

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

  fn find_file(&self, id: u16) -> Result<&TheAssetFile, JsValue> {
    self
      .files
      .iter()
      .find(|f| f.id == id)
      .ok_or_else(|| return PdfToolsError::new(PdfToolsErrorCodes::FileNotFound).into())
  }

  fn find_file_mut(&mut self, id: u16) -> Result<&mut TheAssetFile, JsValue> {
    self
      .files
      .iter_mut()
      .find(|f| f.id == id)
      .ok_or_else(|| return PdfToolsError::new(PdfToolsErrorCodes::FileNotFound).into())
  }

  pub fn get_file_buffer(&self, id: u16) -> Result<Vec<u8>, JsValue> {
    let file = self.find_file(id)?;

    Ok(file.buffer.clone())
  }

  pub fn replace_file(&mut self, id: u16, buffer: Vec<u8>) -> Result<AddFileResult, JsValue> {
    self.files.retain(|f| f.id != id);

    let hash = get_buffer_hash(&buffer);

    let file = TheAssetFile {
      id: id,
      hash: hash.clone(),
      buffer: buffer,
    };

    self.files.push(file);

    Ok(AddFileResult::new(id, hash))
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
      hash: file.id().to_string(),
      buffer: buffer,
    };
    self.files.push(file);
  }

  pub fn add_file_as_page(&mut self, file: AddFileInput) -> Vec<AddFileResult> {
    let pdfium = Pdfium::default();

    // This means is encrypted
    let files = match pdfium.load_pdf_from_byte_vec(file.buffer(), None) {
      Ok(doc) => split_into_individual_pdfs(doc, &pdfium),
      Err(_) => vec![file.buffer()],
    };

    let files = files
      .iter()
      .enumerate()
      .map(|(index, buffer)| {
        let id = file.id() + index as u16;
        let hash = id.to_string();

        let file = TheAssetFile {
          id: id,
          hash: hash.clone(),
          buffer: buffer.to_vec(),
        };

        self.files.push(file);

        AddFileResult::new(id, hash)
      })
      .collect();

    files
  }

  pub fn get_thumbnail(&self, id: u16, page: PdfPageIndex) -> Result<ThumbnailResult, JsValue> {
    let file = self.find_file(id)?;
    let thumbnail = get_thumbnail(&file.buffer, page)?;

    Ok(thumbnail)
  }

  pub fn remove_file(&mut self, id: u16) {
    self.files.retain(|f| f.id != id);
  }

  pub fn get_total_pages(&self, id: u16) -> Result<usize, JsValue> {
    let file = self.find_file(id)?;

    Ok(get_total_pages(&file.buffer))
  }

  pub fn rotate_pdf(
    &mut self,
    id: u16,
    direction: Direction,
  ) -> Result<FileOperationResult, JsValue> {
    let file = self.find_file_mut(id)?;

    let buffer = rotate_pdf(&file.buffer, direction);
    let hash = get_buffer_hash(&buffer);

    file.buffer = buffer;
    file.hash = hash.clone();

    Ok(FileOperationResult::new(file.id, hash))
  }

  pub fn rotate_pdf_page(
    &mut self,
    id: u16,
    page: u32,
    direction: Direction,
  ) -> Result<FileOperationResult, JsValue> {
    let file = self.find_file_mut(id)?;

    let buffer = rotate_pdf_page(&file.buffer, page, direction);
    let hash = get_buffer_hash(&buffer);

    file.buffer = buffer;
    file.hash = hash.clone();

    Ok(FileOperationResult::new(file.id.clone(), hash))
  }

  pub fn remove_pdf_page(
    &mut self,
    id: u16,
    page: PdfPageIndex,
  ) -> Result<FileOperationResult, JsValue> {
    let file = self.find_file_mut(id)?;

    let buffer = remove_pdf_page(&file.buffer, page);
    let hash = get_buffer_hash(&buffer);

    file.buffer = buffer;
    file.hash = hash.clone();

    Ok(FileOperationResult::new(file.id.clone(), hash))
  }

  pub fn decrypt_pdf(&mut self, id: u16, password: String) -> Result<FileOperationResult, JsValue> {
    let file = self.find_file_mut(id)?;

    let buffer = decrypt_pdf(&file.buffer, &password)?;
    let hash = get_buffer_hash(&buffer);

    file.buffer = buffer;
    file.hash = hash.clone();

    Ok(FileOperationResult::new(file.id.clone(), hash))
  }

  pub fn merge_files(&self, ids: &[u16]) -> PdfResult {
    let files: Vec<&[u8]> = ids
      .iter()
      .filter_map(|id| {
        self
          .files
          .iter()
          .find(|f| &f.id == id)
          .map(|f| f.buffer.as_slice())
      })
      .collect();

    let buffer = merge_pdfs(files);
    let hash = get_buffer_hash(&buffer);

    PdfResult::new(buffer, hash)
  }

  pub fn split_pdf(&self, ranges: Vec<PdfPagesRange>) -> Result<Vec<PdfResult>, JsValue> {
    let results: Vec<PdfResult> = ranges
      .iter()
      .map(|range| {
        let pages: Vec<u16> = range.pages().iter().map(|s| s.parse().unwrap()).collect();
        self.merge_files(&pages)
      })
      .collect();

    Ok(results)
  }

  pub fn get_file_size(&self, id: u16) -> Result<String, JsValue> {
    let file = self.find_file(id)?;

    Ok(get_file_size(&file.buffer))
  }

  pub fn get_file(self, id: u16) -> Result<Vec<u8>, JsValue> {
    let file = self.find_file(id)?;

    Ok(file.buffer.clone())
  }
}
