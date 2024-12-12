use std::io::Cursor;

use lopdf::Document;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Copy, Clone, Debug, PartialEq)]
pub enum Direction {
  Left,
  Right,
}

pub fn rotate_pdf_page(buffer: &[u8], index: u32, direction: Direction) -> Vec<u8> {
  let angle = match direction {
    Direction::Right => 90,
    Direction::Left => -90,
  };

  let mut doc = Document::load_mem(buffer).unwrap();

  if let Some(&page_id) = doc.get_pages().get(&index) {
    // Obtiene el diccionario de la página
    let page_dict = doc
      .get_object_mut(page_id)
      .and_then(|obj| obj.as_dict_mut())
      .expect("¡Falta la página!");

    // Obtiene la rotación actual si existe; el valor predeterminado es 0
    let current_rotation = page_dict
      .get(b"Rotate")
      .and_then(|obj| obj.as_i64())
      .unwrap_or(0);

    // Suma el ángulo y actualiza
    page_dict.set("Rotate", (current_rotation + angle) % 360);
  }

  let mut buffer = Cursor::new(Vec::new());
  doc.save_to(&mut buffer).unwrap();

  buffer.into_inner()
}

pub fn rotate_pdf(buffer: &[u8], direction: Direction) -> Vec<u8> {
  let angle = match direction {
    Direction::Right => 90,
    Direction::Left => -90,
  };

  let mut doc = Document::load_mem(buffer).unwrap();

  for (_, page_id) in doc.get_pages() {
    let page_dict = doc
      .get_object_mut(page_id)
      .and_then(|obj| obj.as_dict_mut())
      .expect("Missing page!");

    // Get the current rotation if any; the default is 0
    let current_rotation = page_dict
      .get(b"Rotate")
      .and_then(|obj| obj.as_i64())
      .unwrap_or(0);

    // Add the angle and update
    page_dict.set("Rotate", (current_rotation + angle) % 360);
  }

  let mut buffer = Cursor::new(Vec::new());
  doc.save_to(&mut buffer).unwrap();

  buffer.into_inner()
}
