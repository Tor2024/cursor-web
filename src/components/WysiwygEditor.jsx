import { useRef, useEffect, useCallback, useState } from "react";
import { useUpload } from "../utils/useUpload";

export default function WysiwygEditor({ value, onChange }) {
  const ref = useRef();
  const [upload] = useUpload();
  const lastValueRef = useRef();
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    if (ref.current && value !== lastValueRef.current) {
      ref.current.innerHTML = value || "";
      lastValueRef.current = value;
      // Move cursor to the end
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [value]);

  // Update uploadedImages from value
  useEffect(() => {
    if (!value) {
      setUploadedImages([]);
      return;
    }
    const div = document.createElement('div');
    div.innerHTML = value;
    const imgs = div.querySelectorAll('img');
    const images = Array.from(imgs).map(img => img.src).filter(src => src.startsWith('data:'));
    setUploadedImages(images);
  }, [value]);

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true; // Allow multiple files
    input.onchange = async (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        const newImages = [];

        for (const file of files) {
          const reader = new FileReader();
          await new Promise((resolve) => {
            reader.onload = (event) => {
              newImages.push(event.target.result);
              resolve();
            };
            reader.readAsDataURL(file);
          });
        }

        setUploadedImages(prev => [...prev, ...newImages]);
      }
    };
    input.click();
  };

  const deleteImage = useCallback((imageDataUrl) => {
    // Remove from uploadedImages
    setUploadedImages(prev => prev.filter(img => img !== imageDataUrl));
    // Remove from HTML
    if (ref.current) {
      const html = ref.current.innerHTML.replace(new RegExp(`<img[^>]*src="${imageDataUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`, 'g'), '');
      ref.current.innerHTML = html;
      onChange(html);
    }
  }, [onChange]);

  const insertImageAtCursor = useCallback((imageDataUrl) => {
    const editor = ref.current;
    if (!editor) return;

    editor.focus();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    // Create image element
    const img = document.createElement('img');
    img.src = imageDataUrl;
    img.alt = 'Uploaded Image';
    img.style.width = '100%';
    img.style.height = 'auto';

    range.insertNode(img);

    // Move cursor after inserted image
    range.setStartAfter(img);
    range.setEndAfter(img);
    selection.removeAllRanges();
    selection.addRange(range);

    // Trigger onChange
    setTimeout(() => {
      if (editor) {
        onChange(editor.innerHTML);
      }
    }, 0);
  }, [onChange]);

  const insertHtmlAtCursor = useCallback((html) => {
    const editor = ref.current;
    if (!editor) return;

    editor.focus();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }

    range.insertNode(fragment);

    // Move cursor after inserted content
    range.setStartAfter(fragment.lastChild || fragment);
    range.setEndAfter(fragment.lastChild || fragment);
    selection.removeAllRanges();
    selection.addRange(range);

    // Trigger onChange with a small delay to ensure DOM is updated
    setTimeout(() => {
      if (editor) {
        onChange(editor.innerHTML);
      }
    }, 0);
  }, [onChange]);

  return (
    <div>
      <button
        type="button"
        onClick={handleImageUpload}
        className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Загрузить изображения
      </button>

      {/* Image gallery */}
      {uploadedImages.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded border">
          <div className="text-sm text-gray-600 mb-2">Кликните на изображение, чтобы вставить в текст:</div>
          <div className="flex flex-wrap gap-2">
            {uploadedImages.map((imageDataUrl, index) => (
              <div key={index} className="relative">
                <img
                  src={imageDataUrl}
                  alt={`Image ${index + 1}`}
                  className="w-16 h-16 object-cover rounded border cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                  onClick={() => insertImageAtCursor(imageDataUrl)}
                  title="Кликните, чтобы вставить в текст"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center hover:bg-red-600"
                  onClick={() => deleteImage(imageDataUrl)}
                  title="Удалить изображение"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        ref={ref}
        contentEditable
        className="border rounded px-2 py-1 min-h-[120px] bg-white focus:outline-[#A8D5BA]"
        onKeyUp={e => onChange(e.currentTarget.innerHTML)}
        suppressContentEditableWarning
        dir="ltr"
        lang="ru"
        style={{
          whiteSpace: "pre-wrap",
          textAlign: "left"
        }}
      />
    </div>
  );
}
