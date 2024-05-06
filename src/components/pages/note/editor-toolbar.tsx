'use client';
import { Editor } from '@tiptap/react';
import React from 'react';

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading3,
  Heading4,
  AlignCenter,
  AlignLeft,
  AlignRight,
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap items-start gap-x-1 rounded-md border bg-transparent px-4 py-2">
      <Toggle
        size="sm"
        aria-label="Toggle heading 3"
        pressed={editor.isActive('heading', { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        aria-label="Toggle heading 4"
        pressed={editor.isActive('heading', { level: 4 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <Heading4 className="size-4" />
      </Toggle>

      {/* alignment */}
      <Toggle
        size="sm"
        aria-label="Toggle Left"
        pressed={editor.isActive({ textAlign: 'left' })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('left').run()
        }
      >
        <AlignLeft className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        aria-label="Toggle Center"
        pressed={editor.isActive({ textAlign: 'center' })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('center').run()
        }
      >
        <AlignCenter className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        aria-label="Toggle Right"
        pressed={editor.isActive({ textAlign: 'right' })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('right').run()
        }
      >
        <AlignRight className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        aria-label="Toggle Bold"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </Toggle>

      <Toggle
        size="sm"
        aria-label="Toggle Italic"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        aria-label="Toggle Ordered Lst"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Toggle>
      <Toggle
        size="sm"
        aria-label="Toggle Bullet List"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </Toggle>
    </div>
  );
}
