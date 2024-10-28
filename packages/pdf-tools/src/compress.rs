use crate::{hash::get_hash, pdf_result::PdfResult};
use image::{DynamicImage, Rgb, RgbImage};
use pdfium_render::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn compress_pdf(buffer: Vec<u8>) -> PdfResult {
  use web_sys::console;
  console_error_panic_hook::set_once();

  let pdfium = Pdfium::default();
  let document = pdfium.load_pdf_from_byte_vec(buffer, None).unwrap();

  let mut compressed_document = pdfium.create_new_pdf().unwrap();

  for page in document.pages().iter() {
    let page_size = page.paper_size();

    let mut new_page = compressed_document
      .pages_mut()
      .create_page_at_end(page_size)
      .unwrap();

    for object in page.objects().iter() {
      match object {
        PdfPageObject::Image(ref image_object) => {
          let dynamic_image = image_object.get_processed_image(&document).unwrap();

          let width = image_object.width().unwrap();
          let height = image_object.height().unwrap();

          let mut new_image_object =
            PdfPageImageObject::new_with_size(&compressed_document, &dynamic_image, width, height)
              .unwrap();

          let horizontal = image_object.get_horizontal_translation();
          let vertical = image_object.get_vertical_translation();

          new_image_object.translate(horizontal, vertical).unwrap();

          new_page
            .objects_mut()
            .add_image_object(new_image_object)
            .unwrap();
        }
        _ => {
          //new_page.objects_mut().add_object(object).unwrap();
        }
      }
    }
  }

  PdfResult::new(
    compressed_document.save_to_bytes().unwrap(),
    get_hash(&compressed_document).unwrap(),
  )
}

//let mut page = document.pages_mut().first().unwrap();
//let mut object = page.objects_mut().get(1).unwrap();

/*for page_index in 0..document.pages().len() {
  let page = document.pages().get(page_index).unwrap();

  for object_index in 0..page.objects().len() {
    let object = page.objects().get(object_index).unwrap();

    match object {
      PdfPageObject::Image(ref image_object) => {
        let width = image_object.width().unwrap();
        let height = image_object.height().unwrap();
        let mut red_image = RgbImage::new(width.value as u32, height.value as u32);
        for x in 0..width.value as u32 {
          for y in 0..height.value as u32 {
            red_image.put_pixel(x, y, Rgb([255, 0, 0]));
          }
        }

        let dynamic_red_image = DynamicImage::ImageRgb8(red_image);

        let mut new_image_object = PdfPageImageObject::new_with_size(
          &document,
          &dynamic_red_image, // nueva imagen
          width,
          height,
        )
        .unwrap();

        let horizontal = image_object.get_horizontal_translation();
        let vertical = image_object.get_vertical_translation();

        new_image_object.translate(horizontal, vertical).unwrap();

        new_image_object.set_image(&dynamic_red_image).unwrap();

        let mut page = document.pages_mut().get(page_index).unwrap();

        page
          .objects_mut()
          .add_image_object(new_image_object)
          .unwrap();

        page
          .objects_mut()
          .remove_object_at_index(object_index)
          .unwrap();
      }
      _ => {}
    }
  }
}*/
