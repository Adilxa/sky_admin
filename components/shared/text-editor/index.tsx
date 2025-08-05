'use client';

import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import {
  Bold,
  Italic,
  Underline,
  Smile,
  Link,
  AlignLeft,
  RotateCcw,
  RotateCw,
} from 'lucide-react';

interface RichTextEditorProps {
  placeholder?: string;
  className?: string;
  onChange?: (content: string) => void;
  value?: string;
}

type FormatType = 'bold' | 'italic' | 'underline';

const RichTextEditor: React.FC<RichTextEditorProps> = ({
                                                         placeholder = 'Введите текст...',
                                                         className = '',
                                                         onChange,
                                                         value,
                                                       }) => {
  const [activeFormats, setActiveFormats] = useState<FormatType[]>([]);
  const [content, setContent] = useState<string>('');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const executeCommand = (command: string, value: string | null = null): void => {
    // @ts-ignore
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateFormatState();
  };

  const updateFormatState = (): void => {
    const formats: FormatType[] = [];
    if (document.queryCommandState('bold')) formats.push('bold');
    if (document.queryCommandState('italic')) formats.push('italic');
    if (document.queryCommandState('underline')) formats.push('underline');
    setActiveFormats(formats);
  };

  const handleInput = (): void => {
    const text = editorRef.current?.innerHTML || '';
    setContent(text);
    onChange?.(text);
    updateFormatState();
  };

  const handleSelectionChange = (): void => {
    updateFormatState();
  };

  const handleKeyUp = (): void => {
    updateFormatState();
  };

  const handleMouseUp = (): void => {
    updateFormatState();
  };

  // Сохраняем текущую позицию курсора только если она внутри редактора
  const saveSelection = (): void => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && editorRef.current) {
      const range = selection.getRangeAt(0);
      // Проверяем, что selection находится внутри нашего редактора
      if (editorRef.current.contains(range.commonAncestorContainer)) {
        setSavedSelection(range.cloneRange());
      } else {
        // Если selection вне редактора, создаем range в конце редактора
        const newRange = document.createRange();
        newRange.selectNodeContents(editorRef.current);
        newRange.collapse(false);
        setSavedSelection(newRange);
      }
    } else if (editorRef.current) {
      // Если нет selection, создаем в конце редактора
      const newRange = document.createRange();
      newRange.selectNodeContents(editorRef.current);
      newRange.collapse(false);
      setSavedSelection(newRange);
    }
  };

  // Восстанавливаем сохраненную позицию курсора
  const restoreSelection = (): void => {
    if (savedSelection) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedSelection);
    }
  };

  const toggleEmojiPicker = (): void => {
    if (!showEmojiPicker) {
      // Убеждаемся, что редактор в фокусе перед сохранением позиции
      if (editorRef.current) {
        editorRef.current.focus();
        // Небольшая задержка для корректного фокуса
        setTimeout(() => {
          saveSelection();
        }, 10);
      }
    }
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onEmojiClick = (emojiData: EmojiClickData): void => {
    const emoji = emojiData.emoji;

    // Убеждаемся, что редактор в фокусе
    if (editorRef.current) {
      editorRef.current.focus();

      // Небольшая задержка для правильного фокуса
      setTimeout(() => {
        if (!editorRef.current) return;

        const selection = window.getSelection();
        let range: Range;

        // Используем сохраненную позицию, если есть
        if (savedSelection) {
          range = savedSelection.cloneRange();
        } else {
          // Создаем новый range в конце редактора
          range = document.createRange();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
        }

        // Проверяем, что range находится внутри нашего редактора
        if (!editorRef.current.contains(range.commonAncestorContainer)) {
          // Если range вне редактора, создаем новый в конце
          range = document.createRange();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
        }

        // Вставляем эмодзи
        const textNode = document.createTextNode(emoji);
        range.deleteContents();
        range.insertNode(textNode);

        // Устанавливаем курсор после эмодзи
        range.setStartAfter(textNode);
        range.collapse(true);

        // Применяем selection
        selection?.removeAllRanges();
        selection?.addRange(range);

        setShowEmojiPicker(false);
        setSavedSelection(null);

        // Обновляем содержимое
        handleInput();
      }, 50);
    }
  };

  const insertLink = (): void => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const selectedText = selection.toString().trim();

    if (!selectedText) {
      return;
    }

    // Превращаем выделенный текст в ссылку, используя текст как URL
    const range = selection.getRangeAt(0);
    const linkElement = document.createElement('a');

    // Проверяем, начинается ли текст с http:// или https://
    const url = selectedText.startsWith('http://') || selectedText.startsWith('https://')
      ? selectedText
      : `https://${selectedText}`;

    linkElement.href = url;
    linkElement.textContent = selectedText;
    linkElement.style.color = '#3b82f6';
    linkElement.style.textDecoration = 'underline';
    linkElement.target = '_blank';
    linkElement.rel = 'noopener noreferrer';

    range.deleteContents();
    range.insertNode(linkElement);

    // Устанавливаем курсор после ссылки
    range.setStartAfter(linkElement);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    editorRef.current?.focus();
    handleInput();
  };

  const toggleTextAlign = (): void => {
    const nextAlign = textAlign === 'left' ? 'center' : textAlign === 'center' ? 'right' : 'left';
    setTextAlign(nextAlign);

    if (editorRef.current) {
      editorRef.current.style.textAlign = nextAlign;
    }

    editorRef.current?.focus();
  };

  const handleUndo = (): void => {
    executeCommand('undo');
  };

  const handleRedo = (): void => {
    executeCommand('redo');
  };

  const handleToggleFormat = (format: FormatType): void => {
    executeCommand(format);
  };

  // Закрытие emoji picker при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.emoji-picker-container') && !target.closest('.emoji-button')) {
        setShowEmojiPicker(false);
        setSavedSelection(null);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  useEffect(() => {
    if (value !== undefined && editorRef.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
        setContent(value);
      }
    }
  }, [value]);

  // Обработка клика по ссылкам в редакторе
  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        // Открываем ссылку при Ctrl+клик
        window.open((target as HTMLAnchorElement).href, '_blank');
      } else {
        // Обычный клик - просто помещаем курсор
        const selection = window.getSelection();
        const range = document.createRange();
        range.setStartAfter(target);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  };

  return (
    <div
      className={`w-full max-w-4xl mx-auto border border-gray-200 rounded-3xl bg-white shadow-sm relative ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 rounded-t-3xl bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleToggleFormat('bold')}
            className={`h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition-colors ${
              activeFormats.includes('bold') ? 'bg-gray-200 text-gray-900' : ''
            }`}
            aria-label="Жирный"
          >
            <Bold size={18} />
          </button>

          <button
            type="button"
            onClick={() => handleToggleFormat('italic')}
            className={`h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition-colors ${
              activeFormats.includes('italic') ? 'bg-gray-200 text-gray-900' : ''
            }`}
            aria-label="Курсив"
          >
            <Italic size={18} />
          </button>

          <button
            type="button"
            onClick={() => handleToggleFormat('underline')}
            className={`h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition-colors ${
              activeFormats.includes('underline') ? 'bg-gray-200 text-gray-900' : ''
            }`}
            aria-label="Подчеркнутый"
          >
            <Underline size={18} />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={toggleEmojiPicker}
              className={`emoji-button h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition-colors ${
                showEmojiPicker ? 'bg-gray-200 text-gray-900' : ''
              }`}
              aria-label="Добавить эмодзи"
            >
              <Smile size={18} />
            </button>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="emoji-picker-container absolute top-12 left-0 z-[9999999999]">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  width={350}
                  height={400}
                  searchDisabled={false}
                  skinTonesDisabled={false}
                  previewConfig={{
                    defaultEmoji: '1f60a',
                    defaultCaption: 'Выберите эмодзи!',
                    showPreview: true,
                  }}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={insertLink}
            className="h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Добавить ссылку"
          >
            <Link size={18} />
          </button>

          <button
            type="button"
            onClick={toggleTextAlign}
            className="h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label={`Выравнивание: ${textAlign}`}
          >
            <AlignLeft size={18} />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleUndo}
            className="h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Отменить"
          >
            <RotateCcw size={18} />
          </button>

          <button
            type="button"
            onClick={handleRedo}
            className="h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Повторить"
          >
            <RotateCw size={18} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[300px] p-4 outline-none text-base leading-relaxed focus:bg-gray-50/30 transition-colors"
        style={{ textAlign }}
        onInput={handleInput}
        onKeyUp={handleKeyUp}
        onMouseUp={handleMouseUp}
        onClick={handleEditorClick}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
        role="textbox"
        aria-multiline="true"
        aria-label="Rich text editor"
      />

      <style jsx>{`
          [contenteditable]:empty:before {
              content: attr(data-placeholder);
              color: #9CA3AF;
              pointer-events: none;
          }

          [contenteditable]:focus:before {
              content: none;
          }

          [contenteditable] a {
              color: #3b82f6 !important;
              text-decoration: underline !important;
              cursor: pointer;
          }

          [contenteditable] a:hover {
              color: #1d4ed8 !important;
              background-color: rgba(59, 130, 246, 0.1);
          }

          [contenteditable]:focus {
              outline: none;
          }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
