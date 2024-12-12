use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

pub fn get_buffer_hash(buffer: &Vec<u8>) -> String {
  let mut hasher = DefaultHasher::new();
  buffer.hash(&mut hasher);
  let hash = hasher.finish();

  hash.to_string()
}
