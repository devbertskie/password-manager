'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorToolbar from '@/components/pages/note/editor-toolbar';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

interface TipTapEditorProps {
  content: any;
  onChange: (content: string) => void;
  isEditable: boolean;
}

const TipTapEditor = ({ content, onChange, isEditable }: TipTapEditorProps) => {
  const editor = useEditor({
    editable: isEditable,
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'text-sm',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
      Placeholder.configure({
        placeholder: 'What is this about?',
        emptyEditorClass:
          'before:text-muted-foreground/60 before:text-[14px] before:h-0 before:pointer-events-none before:content-[attr(data-placeholder)]',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class:
          'rounded-md border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[200px] font-lexend disabled:cursor-not-allowed ring-offset-background border p-4 prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl',
      },
    },
    onUpdate({ editor }) {
      const result = editor.getJSON();

      const str = JSON.stringify(result);
      onChange(str);
    },
  });

  useEffect(() => {
    if (!editor) return undefined;

    if (!isEditable) {
      const cnt = JSON.parse(content);
      editor.commands.setContent(cnt);
      editor.setEditable(false);
    }
    editor.setEditable(isEditable);
  }, [editor, isEditable, content]);
  return (
    <div className="flex min-h-[250px] flex-col justify-stretch space-y-4">
      {isEditable && <EditorToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
