use lopdf::Document;

pub fn get_total_pages(buffer: &[u8]) -> usize {
  let document = Document::load_mem(buffer).unwrap();

  document.get_pages().len()
}
