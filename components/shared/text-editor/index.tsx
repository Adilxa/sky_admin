'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Smile,
  Link,
  AlignLeft,
  RotateCcw,
  RotateCw,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group';

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
  const editorRef = useRef<HTMLDivElement>(null);

  const executeCommand = (command: string, value: string | any = null): void => {
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

  const insertEmoji = (): void => {
    const emojis = ['😀', '😃', '😄', '😁', '😊', '😍', '🥰', '😘', '😗', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(randomEmoji));
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    editorRef.current?.focus();
    handleInput();
  };

  const insertLink = (): void => {
    const selection = window.getSelection();
    const selectedText = selection?.toString();

    if (selectedText && selectedText.trim()) {
      const url = prompt('Введите URL:', 'https://');
      if (url && url.trim()) {
        executeCommand('createLink', url);
      }
    } else {
      const url = prompt('Введите URL:', 'https://');
      if (url && url.trim()) {
        const linkText = prompt('Введите текст ссылки:', url);
        if (linkText) {
          const link = `<a href="${url}" style="color: #3b82f6; text-decoration: underline;">${linkText}</a>`;
          executeCommand('insertHTML', link);
        }
      }
    }
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

  const handleToggleChange = (value: string[]): void => {
    const newFormats = value as FormatType[];

    newFormats.forEach(format => {
      if (!activeFormats.includes(format)) {
        executeCommand(format);
      }
    });

    activeFormats.forEach(format => {
      if (!newFormats.includes(format)) {
        executeCommand(format);
      }
    });
  };

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

  return (
    <div className={`w-full border border-gray-200 rounded-3xl overflow-hidden bg-white ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-1">
          <ToggleGroup
            type="multiple"
            value={activeFormats}
            onValueChange={handleToggleChange}
            className="flex gap-1"
          >
            <ToggleGroupItem
              value="bold"
              aria-label="Жирный"
              className="h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100 data-[state=on]:bg-gray-200 data-[state=on]:text-gray-900 flex items-center justify-center"
            >
              <Bold size={18} />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              aria-label="Курсив"
              className="h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100 data-[state=on]:bg-gray-200 data-[state=on]:text-gray-900 flex items-center justify-center"
            >
              <Italic size={18} />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="underline"
              aria-label="Подчеркнутый"
              className="h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100 data-[state=on]:bg-gray-200 data-[state=on]:text-gray-900 flex items-center justify-center"
            >
              <Underline size={18} />
            </ToggleGroupItem>
          </ToggleGroup>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={insertEmoji}
            className="h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100"
            aria-label="Добавить эмодзи"
          >
            <Smile size={18} />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={insertLink}
            className="h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100"
            aria-label="Добавить ссылку"
          >
            <Link size={18} />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toggleTextAlign}
            className="h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100"
            aria-label={`Выравнивание: ${textAlign}`}
          >
            <AlignLeft size={18} />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUndo}
            className="h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100"
            aria-label="Отменить"
          >
            <ArrowLeft size={18} />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRedo}
            className="h-10 w-10 p-0 rounded-xl border border-gray-200 hover:bg-gray-100"
            aria-label="Повторить"
          >
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[200px] p-4 outline-none text-base leading-relaxed focus:bg-gray-50/30 transition-colors"
        style={{ textAlign }}
        onInput={handleInput}
        onKeyUp={handleKeyUp}
        onMouseUp={handleMouseUp}
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
          }

          [contenteditable] a:hover {
              color: #1d4ed8 !important;
          }

          [contenteditable]:focus {
              outline: none;
          }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
