use std::env;
use std::process::Command;
use std::{fs, path::Path};
use walrus::{Module, ModuleConfig};

fn main() {
  let current_dir = env::current_dir().unwrap();
  println!("El programa se está ejecutando en: {:?}", current_dir);

  let wasm_path = current_dir.join("pdfium/pdfium.wasm");

  let optimized_wasm_path = "pdfium/pdfium_optimized.wasm";

  // Cargar el archivo .wasm y analizarlo con walrus
  let wasm_bytes = fs::read(wasm_path.clone()).expect("No se pudo leer el archivo .wasm");
  let module = ModuleConfig::default()
    .parse(&wasm_bytes)
    .expect("No se pudo parsear el archivo .wasm");

  let mut funciones_a_eliminar = Vec::new();

  module.exports.iter().for_each(|export| {
    funciones_a_eliminar.push(export.name.clone());
  });

  if !funciones_a_eliminar.is_empty() {
    let output = Command::new("wasm-snip")
      .arg(wasm_path)
      .arg("-o")
      .arg(optimized_wasm_path)
      .args(&["--functions"])
      .args(&funciones_a_eliminar)
      .output()
      .expect("Fallo al ejecutar wasm-snip");

    if output.status.success() {
      println!(
        "wasm-snip ejecutado con éxito. Archivo optimizado guardado en {}",
        optimized_wasm_path
      );
    } else {
      eprintln!(
        "Error en wasm-snip: {}",
        String::from_utf8_lossy(&output.stderr)
      );
    }
  } else {
    println!("No se seleccionaron funciones para eliminar.");
  }

  // Listar todas las funciones y preparar una lista de nombres a eliminar
  //println!("Lista de funciones en el archivo .wasm:");
  //let mut funciones_a_eliminar = Vec::new();

  //for func in module.funcs.iter() {
  //func.name.as_ref().map(|name| println!("Función: {}", name));
  /*if let Some(name) = module.names.get(&func.id()) {
    println!("Función: {}", name);

    // Aquí puedes agregar lógica para decidir cuáles funciones deseas eliminar.
    // Ejemplo: elimina funciones que empiecen con "unused_"
    if name.starts_with("unused_") {
      funciones_a_eliminar.push(name.clone());
    }
  } else {
    println!("Función sin nombre (id: {})", func.id().index());
  }*/
  //}

  // Imprimir las funciones seleccionadas para eliminar
  /*println!("Funciones seleccionadas para eliminar:");
  for func in &funciones_a_eliminar {
    println!("{}", func);
  }

  // Ejecutar wasm-snip para eliminar las funciones no utilizadas
  if !funciones_a_eliminar.is_empty() {
    let output = Command::new("wasm-snip")
      .arg(wasm_path)
      .arg("-o")
      .arg(optimized_wasm_path)
      .args(&["--functions"])
      .args(&funciones_a_eliminar)
      .output()
      .expect("Fallo al ejecutar wasm-snip");

    if output.status.success() {
      println!(
        "wasm-snip ejecutado con éxito. Archivo optimizado guardado en {}",
        optimized_wasm_path
      );
    } else {
      eprintln!(
        "Error en wasm-snip: {}",
        String::from_utf8_lossy(&output.stderr)
      );
    }
  } else {
    println!("No se seleccionaron funciones para eliminar.");
  }*/
}
