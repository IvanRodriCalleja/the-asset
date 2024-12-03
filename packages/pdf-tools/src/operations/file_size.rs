pub fn get_file_size(bytes: &[u8]) -> String {
  let size_in_bytes = bytes.len();
  const KB: f64 = 1024.0;
  const MB: f64 = KB * 1024.0;
  const GB: f64 = MB * 1024.0;

  let mut size = size_in_bytes as f64;
  let mut unit = "Bytes";

  if size >= GB {
    size /= GB;
    unit = "GB";
  } else if size >= MB {
    size /= MB;
    unit = "MB";
  } else if size >= KB {
    size /= KB;
    unit = "KB";
  }

  if size > 99.0 {
    match unit {
      "KB" => {
        size /= KB;
        unit = "MB";
      }
      "MB" => {
        size /= KB;
        unit = "GB";
      }
      _ => {}
    }
  }

  format!("{:.2} {}", size, unit)
}
