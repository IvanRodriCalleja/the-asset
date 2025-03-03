let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getCachedStringFromWasm0(ptr, len) {
    if (ptr === 0) {
        return getObject(len);
    } else {
        return getStringFromWasm0(ptr, len);
    }
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getDataViewMemory0();
    for (let i = 0; i < array.length; i++) {
        mem.setUint32(ptr + 4 * i, addHeapObject(array[i]), true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(takeObject(mem.getUint32(i, true)));
    }
    return result;
}
/**
* @param {Uint8Array} buffer
* @param {string} password
* @returns {Uint8Array}
*/
export function decrypt_pdf(buffer, password) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_export_0);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(password, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len1 = WASM_VECTOR_LEN;
        wasm.decrypt_pdf(retptr, ptr0, len0, ptr1, len1);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
        if (r3) {
            throw takeObject(r2);
        }
        var v3 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_export_2(r0, r1 * 1, 1);
        return v3;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let cachedUint16ArrayMemory0 = null;

function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

function passArray16ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 2, 2) >>> 0;
    getUint16ArrayMemory0().set(arg, ptr / 2);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_export_3(addHeapObject(e));
    }
}
/**
* Establishes a binding between an external Pdfium WASM module and `pdfium-render`'s WASM module.
* This function should be called from Javascript once the external Pdfium WASM module has been loaded
* into the browser. It is essential that this function is called _before_ initializing
* `pdfium-render` from within Rust code. For an example, see:
* <https://github.com/ajrcarey/pdfium-render/blob/master/examples/index.html>
* @param {any} pdfium_wasm_module
* @param {any} local_wasm_module
* @param {boolean} debug
* @returns {boolean}
*/
export function initialize_pdfium_render(pdfium_wasm_module, local_wasm_module, debug) {
    const ret = wasm.initialize_pdfium_render(addHeapObject(pdfium_wasm_module), addHeapObject(local_wasm_module), debug);
    return ret !== 0;
}

/**
* A callback function that can be invoked by Pdfium's `FPDF_LoadCustomDocument()` function,
* wrapping around `crate::utils::files::read_block_from_callback()` to shuffle data buffers
* from our WASM memory heap to Pdfium's WASM memory heap as they are loaded.
* @param {number} param
* @param {number} position
* @param {number} pBuf
* @param {number} size
* @returns {number}
*/
export function read_block_from_callback_wasm(param, position, pBuf, size) {
    const ret = wasm.read_block_from_callback_wasm(param, position, pBuf, size);
    return ret;
}

/**
* A callback function that can be invoked by Pdfium's `FPDF_SaveAsCopy()` and `FPDF_SaveWithVersion()`
* functions, wrapping around `crate::utils::files::write_block_from_callback()` to shuffle data buffers
* from Pdfium's WASM memory heap to our WASM memory heap as they are written.
* @param {number} param
* @param {number} buf
* @param {number} size
* @returns {number}
*/
export function write_block_from_callback_wasm(param, buf, size) {
    const ret = wasm.write_block_from_callback_wasm(param, buf, size);
    return ret;
}

/**
*/
export const Direction = Object.freeze({ Left:0,"0":"Left",Right:1,"1":"Right", });
/**
*/
export const PdfToolsErrorCodes = Object.freeze({ Unknown:0,"0":"Unknown",PasswordError:1,"1":"PasswordError",LoadError:2,"2":"LoadError",WrongPassword:3,"3":"WrongPassword",DecryptionError:4,"4":"DecryptionError",MalformedPdf:5,"5":"MalformedPdf",FileNotFound:6,"6":"FileNotFound", });
/**
* Chroma subsampling format
*/
export const ChromaSampling = Object.freeze({
/**
* Both vertically and horizontally subsampled.
*/
Cs420:0,"0":"Cs420",
/**
* Horizontally subsampled.
*/
Cs422:1,"1":"Cs422",
/**
* Not subsampled.
*/
Cs444:2,"2":"Cs444",
/**
* Monochrome.
*/
Cs400:3,"3":"Cs400", });

const AddFileInputFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_addfileinput_free(ptr >>> 0, 1));
/**
*/
export class AddFileInput {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AddFileInputFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_addfileinput_free(ptr, 0);
    }
    /**
    * @param {number} id
    * @param {Uint8Array} buffer
    * @param {string} name
    */
    constructor(id, buffer, name) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_export_0);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(name, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.addfileinput_new(id, ptr0, len0, ptr1, len1);
        this.__wbg_ptr = ret >>> 0;
        AddFileInputFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
    * @returns {number}
    */
    get id() {
        const ret = wasm.addfileinput_id(this.__wbg_ptr);
        return ret;
    }
    /**
    * @returns {Uint8Array}
    */
    get buffer() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.addfileinput_buffer(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_2(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    get name() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.addfileinput_name(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getCachedStringFromWasm0(r0, r1);
        if (r0 !== 0) { wasm.__wbindgen_export_2(r0, r1, 1); }
        return v1;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}
}

const AddFileResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_addfileresult_free(ptr >>> 0, 1));
/**
*/
export class AddFileResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AddFileResult.prototype);
        obj.__wbg_ptr = ptr;
        AddFileResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AddFileResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_addfileresult_free(ptr, 0);
    }
    /**
    * @param {number} id
    * @param {string} hash
    */
    constructor(id, hash) {
        const ptr0 = passStringToWasm0(hash, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.addfileresult_new(id, ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        AddFileResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
    * @returns {number}
    */
    get id() {
        const ret = wasm.addfileresult_id(this.__wbg_ptr);
        return ret;
    }
    /**
    * @returns {string}
    */
    get hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.addfileresult_hash(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getCachedStringFromWasm0(r0, r1);
        if (r0 !== 0) { wasm.__wbindgen_export_2(r0, r1, 1); }
        return v1;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}
}

const FileOperationResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fileoperationresult_free(ptr >>> 0, 1));
/**
*/
export class FileOperationResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FileOperationResult.prototype);
        obj.__wbg_ptr = ptr;
        FileOperationResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FileOperationResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fileoperationresult_free(ptr, 0);
    }
    /**
    * @param {number} id
    * @param {string} hash
    */
    constructor(id, hash) {
        const ptr0 = passStringToWasm0(hash, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.addfileresult_new(id, ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        FileOperationResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
    * @returns {number}
    */
    get id() {
        const ret = wasm.addfileresult_id(this.__wbg_ptr);
        return ret;
    }
    /**
    * @returns {string}
    */
    get hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.addfileresult_hash(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getCachedStringFromWasm0(r0, r1);
        if (r0 !== 0) { wasm.__wbindgen_export_2(r0, r1, 1); }
        return v1;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}
}

const PdfPagesRangeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pdfpagesrange_free(ptr >>> 0, 1));
/**
*/
export class PdfPagesRange {

    static __unwrap(jsValue) {
        if (!(jsValue instanceof PdfPagesRange)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PdfPagesRangeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pdfpagesrange_free(ptr, 0);
    }
    /**
    * @param {(string)[]} pages
    */
    constructor(pages) {
        const ptr0 = passArrayJsValueToWasm0(pages, wasm.__wbindgen_export_0);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.pdfpagesrange_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        PdfPagesRangeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
    * @returns {(string)[]}
    */
    get pages() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.pdfpagesrange_pages(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}

const PdfResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pdfresult_free(ptr >>> 0, 1));
/**
*/
export class PdfResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PdfResult.prototype);
        obj.__wbg_ptr = ptr;
        PdfResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PdfResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pdfresult_free(ptr, 0);
    }
    /**
    * @param {Uint8Array} buffer
    * @param {string} hash
    */
    constructor(buffer, hash) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_export_0);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(hash, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.pdfresult_new(ptr0, len0, ptr1, len1);
        this.__wbg_ptr = ret >>> 0;
        PdfResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
    * @returns {Uint8Array}
    */
    get buffer() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.pdfresult_buffer(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_2(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {string}
    */
    get hash() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.pdfresult_hash(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getCachedStringFromWasm0(r0, r1);
        if (r0 !== 0) { wasm.__wbindgen_export_2(r0, r1, 1); }
        return v1;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}
}

const PdfToolsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pdftools_free(ptr >>> 0, 1));
/**
*/
export class PdfTools {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PdfToolsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pdftools_free(ptr, 0);
    }
    /**
    */
    constructor() {
        const ret = wasm.pdftools_new();
        this.__wbg_ptr = ret >>> 0;
        PdfToolsFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
    * @param {number} id
    * @returns {Uint8Array}
    */
    get_file_buffer(id) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.pdftools_get_file_buffer(retptr, this.__wbg_ptr, id);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_2(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} id
    * @param {Uint8Array} buffer
    * @returns {AddFileResult}
    */
    replace_file(id, buffer) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_export_0);
            const len0 = WASM_VECTOR_LEN;
            wasm.pdftools_replace_file(retptr, this.__wbg_ptr, id, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return AddFileResult.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {AddFileInput} file
    */
    add_file(file) {
        _assertClass(file, AddFileInput);
        var ptr0 = file.__destroy_into_raw();
        wasm.pdftools_add_file(this.__wbg_ptr, ptr0);
    }
    /**
    * @param {AddFileInput} file
    * @returns {(AddFileResult)[]}
    */
    add_file_as_page(file) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(file, AddFileInput);
            var ptr0 = file.__destroy_into_raw();
            wasm.pdftools_add_file_as_page(retptr, this.__wbg_ptr, ptr0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v2 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_2(r0, r1 * 4, 4);
            return v2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} id
    * @param {number} page
    * @returns {ThumbnailResult}
    */
    get_thumbnail(id, page) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.pdftools_get_thumbnail(retptr, this.__wbg_ptr, id, page);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return ThumbnailResult.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} id
    */
    remove_file(id) {
        wasm.pdftools_remove_file(this.__wbg_ptr, id);
    }
    /**
    * @param {number} id
    * @returns {number}
    */
    get_total_pages(id) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.pdftools_get_total_pages(retptr, this.__wbg_ptr, id);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return r0 >>> 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} id
    * @param {Direction} direction
    * @returns {FileOperationResult}
    */
    rotate_pdf(id, direction) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.pdftools_rotate_pdf(retptr, this.__wbg_ptr, id, direction);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return FileOperationResult.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} id
    * @param {number} page
    * @param {Direction} direction
    * @returns {FileOperationResult}
    */
    rotate_pdf_page(id, page, direction) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.pdftools_rotate_pdf_page(retptr, this.__wbg_ptr, id, page, direction);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return FileOperationResult.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} id
    * @param {number} page
    * @returns {FileOperationResult}
    */
    remove_pdf_page(id, page) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.pdftools_remove_pdf_page(retptr, this.__wbg_ptr, id, page);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return FileOperationResult.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} id
    * @param {string} password
    * @returns {FileOperationResult}
    */
    decrypt_pdf(id, password) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(password, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
            const len0 = WASM_VECTOR_LEN;
            wasm.pdftools_decrypt_pdf(retptr, this.__wbg_ptr, id, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return FileOperationResult.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {Uint16Array} ids
    * @returns {PdfResult}
    */
    merge_files(ids) {
        const ptr0 = passArray16ToWasm0(ids, wasm.__wbindgen_export_0);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.pdftools_merge_files(this.__wbg_ptr, ptr0, len0);
        return PdfResult.__wrap(ret);
    }
    /**
    * @param {(PdfPagesRange)[]} ranges
    * @returns {(PdfResult)[]}
    */
    split_pdf(ranges) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayJsValueToWasm0(ranges, wasm.__wbindgen_export_0);
            const len0 = WASM_VECTOR_LEN;
            wasm.pdftools_split_pdf(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            if (r3) {
                throw takeObject(r2);
            }
            var v2 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_2(r0, r1 * 4, 4);
            return v2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} id
    * @returns {string}
    */
    get_file_size(id) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.pdftools_get_file_size(retptr, this.__wbg_ptr, id);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getCachedStringFromWasm0(r0, r1);
        if (r0 !== 0) { wasm.__wbindgen_export_2(r0, r1, 1); }
        return v1;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}
/**
* @param {number} id
* @returns {Uint8Array}
*/
get_file(id) {
    try {
        const ptr = this.__destroy_into_raw();
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.pdftools_get_file(retptr, ptr, id);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
        var r3 = getDataViewMemory0().getInt32(retptr + 4 * 3, true);
        if (r3) {
            throw takeObject(r2);
        }
        var v1 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_export_2(r0, r1 * 1, 1);
        return v1;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}
}

const PdfToolsErrorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pdftoolserror_free(ptr >>> 0, 1));
/**
*/
export class PdfToolsError {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PdfToolsError.prototype);
        obj.__wbg_ptr = ptr;
        PdfToolsErrorFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PdfToolsErrorFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pdftoolserror_free(ptr, 0);
    }
    /**
    * @param {PdfToolsErrorCodes} code
    */
    constructor(code) {
        const ret = wasm.pdftoolserror_new(code);
        this.__wbg_ptr = ret >>> 0;
        PdfToolsErrorFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
    * @returns {PdfToolsErrorCodes}
    */
    get code() {
        const ret = wasm.pdftoolserror_code(this.__wbg_ptr);
        return ret;
    }
}

const ThumbnailResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_thumbnailresult_free(ptr >>> 0, 1));
/**
*/
export class ThumbnailResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ThumbnailResult.prototype);
        obj.__wbg_ptr = ptr;
        ThumbnailResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ThumbnailResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_thumbnailresult_free(ptr, 0);
    }
    /**
    * @param {string} src
    * @param {number} width
    * @param {number} height
    * @param {number} rotation
    */
    constructor(src, width, height, rotation) {
        const ptr0 = passStringToWasm0(src, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.thumbnailresult_new(ptr0, len0, width, height, rotation);
        this.__wbg_ptr = ret >>> 0;
        ThumbnailResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
    * @returns {string}
    */
    get src() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.thumbnailresult_src(retptr, this.__wbg_ptr);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getCachedStringFromWasm0(r0, r1);
        if (r0 !== 0) { wasm.__wbindgen_export_2(r0, r1, 1); }
        return v1;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}
/**
* @returns {number}
*/
get width() {
    const ret = wasm.thumbnailresult_width(this.__wbg_ptr);
    return ret;
}
/**
* @returns {number}
*/
get height() {
    const ret = wasm.thumbnailresult_height(this.__wbg_ptr);
    return ret;
}
/**
* @returns {number}
*/
get rotation() {
    const ret = wasm.thumbnailresult_rotation(this.__wbg_ptr);
    return ret;
}
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_pdftoolserror_new = function(arg0) {
        const ret = PdfToolsError.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_addfileresult_new = function(arg0) {
        const ret = AddFileResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_pdfpagesrange_unwrap = function(arg0) {
        const ret = PdfPagesRange.__unwrap(takeObject(arg0));
        return ret;
    };
    imports.wbg.__wbg_pdfresult_new = function(arg0) {
        const ret = PdfResult.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
        var v0 = getCachedStringFromWasm0(arg0, arg1);
    if (arg0 !== 0) { wasm.__wbindgen_export_2(arg0, arg1, 1); }
    console.error(v0);
};
imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};
imports.wbg.__wbg_self_3093d5d1f7bcb682 = function() { return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
}, arguments) };
imports.wbg.__wbg_window_3bcfc4d31bc012f8 = function() { return handleError(function () {
    const ret = window.window;
    return addHeapObject(ret);
}, arguments) };
imports.wbg.__wbg_globalThis_86b222e13bdf32ed = function() { return handleError(function () {
    const ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };
imports.wbg.__wbg_global_e5a3fe56f8be9485 = function() { return handleError(function () {
    const ret = global.global;
    return addHeapObject(ret);
}, arguments) };
imports.wbg.__wbindgen_is_undefined = function(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};
imports.wbg.__wbg_newnoargs_76313bd6ff35d0f2 = function(arg0, arg1) {
    var v0 = getCachedStringFromWasm0(arg0, arg1);
    const ret = new Function(v0);
    return addHeapObject(ret);
};
imports.wbg.__wbg_call_1084a111329e68ce = function() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };
imports.wbg.__wbg_get_224d16597dbbfd96 = function() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
}, arguments) };
imports.wbg.__wbg_length_8339fcf5d8ecd12e = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};
imports.wbg.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return addHeapObject(ret);
};
imports.wbg.__wbg_buffer_b7b08af79b0b0974 = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};
imports.wbg.__wbg_new_ea1883e1e5e86686 = function(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};
imports.wbg.__wbg_set_d1e79e2388520f18 = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};
imports.wbg.__wbindgen_number_new = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};
imports.wbg.__wbg_call_89af060b4e1523f2 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };
imports.wbg.__wbg_isArray_8364a5371e9737d8 = function(arg0) {
    const ret = Array.isArray(getObject(arg0));
    return ret;
};
imports.wbg.__wbg_from_0791d740a9d37830 = function(arg0) {
    const ret = Array.from(getObject(arg0));
    return addHeapObject(ret);
};
imports.wbg.__wbg_length_ae22078168b726f5 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};
imports.wbg.__wbg_get_3baa728f9d58d3f6 = function(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
};
imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};
imports.wbg.__wbg_new_a220cf903aa02ca2 = function() {
    const ret = new Array();
    return addHeapObject(ret);
};
imports.wbg.__wbg_push_37c89022f34c01ca = function(arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
};
imports.wbg.__wbg_of_5d71c4c026eebdde = function(arg0, arg1, arg2, arg3) {
    const ret = Array.of(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3));
    return addHeapObject(ret);
};
imports.wbg.__wbg_apply_353f4c9ca391d52b = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).apply(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };
imports.wbg.__wbg_newwithbyteoffsetandlength_8a2cb9ca96b27ec9 = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};
imports.wbg.__wbg_getindex_43ea930a1286d573 = function(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return ret;
};
imports.wbg.__wbg_slice_b698b331b2ab7d72 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).slice(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};
imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
    const ret = getObject(arg0) === getObject(arg1);
    return ret;
};
imports.wbg.__wbg_get_7f556c7911ba29ab = function() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).get(arg1 >>> 0);
    return addHeapObject(ret);
}, arguments) };
imports.wbg.__wbg_set_557ee95e2495a4e4 = function() { return handleError(function (arg0, arg1, arg2) {
    getObject(arg0).set(arg1 >>> 0, getObject(arg2));
}, arguments) };
imports.wbg.__wbg_of_af8ba693729c6d02 = function(arg0, arg1, arg2, arg3, arg4) {
    const ret = Array.of(getObject(arg0), getObject(arg1), getObject(arg2), getObject(arg3), getObject(arg4));
    return addHeapObject(ret);
};
imports.wbg.__wbg_of_4a1c869ef05b4b73 = function(arg0) {
    const ret = Array.of(getObject(arg0));
    return addHeapObject(ret);
};
imports.wbg.__wbg_of_61f336d7eeabfca8 = function(arg0, arg1, arg2) {
    const ret = Array.of(getObject(arg0), getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};
imports.wbg.__wbg_of_99c2a118200b1e62 = function(arg0, arg1) {
    const ret = Array.of(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
};
imports.wbg.__wbg_newwithlabel_0cfb9441a658c28e = function() { return handleError(function (arg0, arg1) {
    var v0 = getCachedStringFromWasm0(arg0, arg1);
    const ret = new TextDecoder(v0);
    return addHeapObject(ret);
}, arguments) };
imports.wbg.__wbg_decode_0fa8f5a6a21ab39f = function() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = getObject(arg1).decode(getArrayU8FromWasm0(arg2, arg3));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };
imports.wbg.__wbg_newwithlength_b5660ad84eb3e8a9 = function(arg0) {
    const ret = new Array(arg0 >>> 0);
    return addHeapObject(ret);
};
imports.wbg.__wbg_set_673dda6c73d19609 = function(arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
};
imports.wbg.__wbg_subarray_7c2e3576afe181d1 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};
imports.wbg.__wbindgen_is_object = function(arg0) {
    const val = getObject(arg0);
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};
imports.wbg.__wbg_length_39ca22ed75a7f9dd = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};
imports.wbg.__wbg_length_88f3e18ac1dbbb22 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
};
imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};
imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbg_debug_5a33c41aeac15ee6 = function(arg0) {
    console.debug(getObject(arg0));
};
imports.wbg.__wbg_error_09480e4aadca50ad = function(arg0) {
    console.error(getObject(arg0));
};
imports.wbg.__wbg_info_c261acb2deacd903 = function(arg0) {
    console.info(getObject(arg0));
};
imports.wbg.__wbg_log_b103404cc5920657 = function(arg0) {
    console.log(getObject(arg0));
};
imports.wbg.__wbg_warn_2b3adb99ce26c314 = function(arg0) {
    console.warn(getObject(arg0));
};

return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint16ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;



    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined' && Object.getPrototypeOf(module) === Object.prototype)
    ({module} = module)
    else
    console.warn('using deprecated parameters for `initSync()`; pass a single object instead')

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined' && Object.getPrototypeOf(module_or_path) === Object.prototype)
    ({module_or_path} = module_or_path)
    else
    console.warn('using deprecated parameters for the initialization function; pass a single object instead')

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('pdf_tools_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
