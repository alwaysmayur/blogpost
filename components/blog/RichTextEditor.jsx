'use client';

import { useRef, useEffect } from 'react';
import styles from './RichTextEditor.module.css';

export default function RichTextEditor({ initialContent = '', onSave }) {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && initialContent) {
            editorRef.current.innerHTML = initialContent;
        }
    }, [initialContent]);

    const handleInput = () => {
        if (editorRef.current && onSave) {
            onSave(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        handleInput();
    };

    const insertLink = () => {
        const url = prompt('Enter URL:');
        if (url) {
            execCommand('createLink', url);
        }
    };

    const insertImage = () => {
        const url = prompt('Enter image URL:');
        if (url) {
            execCommand('insertImage', url);
        }
    };

    return (
        <div className={styles.editor__wrapper}>
            <div className={styles.toolbar}>
                <div className={styles.toolbar__group}>
                    <button
                        type="button"
                        onClick={() => execCommand('formatBlock', '<h1>')}
                        className={styles.toolbar__btn}
                        title="Heading 1"
                    >
                        H1
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('formatBlock', '<h2>')}
                        className={styles.toolbar__btn}
                        title="Heading 2"
                    >
                        H2
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('formatBlock', '<h3>')}
                        className={styles.toolbar__btn}
                        title="Heading 3"
                    >
                        H3
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('formatBlock', '<p>')}
                        className={styles.toolbar__btn}
                        title="Paragraph"
                    >
                        P
                    </button>
                </div>

                <div className={styles.toolbar__divider}></div>

                <div className={styles.toolbar__group}>
                    <button
                        type="button"
                        onClick={() => execCommand('bold')}
                        className={styles.toolbar__btn}
                        title="Bold"
                    >
                        <strong>B</strong>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('italic')}
                        className={styles.toolbar__btn}
                        title="Italic"
                    >
                        <em>I</em>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('underline')}
                        className={styles.toolbar__btn}
                        title="Underline"
                    >
                        <u>U</u>
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('strikeThrough')}
                        className={styles.toolbar__btn}
                        title="Strikethrough"
                    >
                        <s>S</s>
                    </button>
                </div>

                <div className={styles.toolbar__divider}></div>

                <div className={styles.toolbar__group}>
                    <button
                        type="button"
                        onClick={() => execCommand('insertUnorderedList')}
                        className={styles.toolbar__btn}
                        title="Bullet List"
                    >
                        • List
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('insertOrderedList')}
                        className={styles.toolbar__btn}
                        title="Numbered List"
                    >
                        1. List
                    </button>
                </div>

                <div className={styles.toolbar__divider}></div>

                <div className={styles.toolbar__group}>
                    <button
                        type="button"
                        onClick={insertLink}
                        className={styles.toolbar__btn}
                        title="Insert Link"
                    >
                        🔗 Link
                    </button>
                    <button
                        type="button"
                        onClick={insertImage}
                        className={styles.toolbar__btn}
                        title="Insert Image"
                    >
                        🖼️ Image
                    </button>
                </div>

                <div className={styles.toolbar__divider}></div>

                <div className={styles.toolbar__group}>
                    <button
                        type="button"
                        onClick={() => execCommand('formatBlock', '<blockquote>')}
                        className={styles.toolbar__btn}
                        title="Quote"
                    >
                        " Quote
                    </button>
                    <button
                        type="button"
                        onClick={() => execCommand('removeFormat')}
                        className={styles.toolbar__btn}
                        title="Clear Formatting"
                    >
                        ✕ Clear
                    </button>
                </div>
            </div>

            <div
                ref={editorRef}
                className={styles.editor}
                contentEditable
                onInput={handleInput}
                suppressContentEditableWarning
            />
        </div>
    );
}
