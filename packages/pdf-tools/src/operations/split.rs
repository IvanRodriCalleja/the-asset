use pdfium_render::prelude::*;

pub fn split_into_individual_pdfs(document: PdfDocument, pdfium: &Pdfium) -> Vec<Vec<u8>> {
  let mut pdfs_by_page = Vec::new();

  for index in 0..document.pages().len() {
    let mut destination_document = pdfium.create_new_pdf().unwrap();
    destination_document
      .pages_mut()
      .copy_page_from_document(&document, index, 0)
      .unwrap();
    let pdf_page = destination_document.save_to_bytes().unwrap();

    pdfs_by_page.push(pdf_page);
  }

  pdfs_by_page
}
