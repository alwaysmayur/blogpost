'use native';
'use client';

import { useState } from 'react';
import styles from './MarkdownEditor.module.css';

export default function MarkdownEditor({ initialContent, onSave, onCancel }) {
    const [content, setContent] = useState(initialContent || '');

    const handleSave = () => {
        if (onSave) {
            onSave(content);
        }
    };

    return (
        <div className={styles.editor}>
            <div className={styles.editor_header}>
                <h3 className={styles.editor_title}>Edit Article</h3>
                <div className={styles.editor_actions}>
                    <button onClick={onCancel} className={styles.btn_cancel}>
                        Cancel
                    </button>
                    <button onClick={handleSave} className={styles.btn_save}>
                        Save Changes
                    </button>
                </div>
            </div>
            <textarea
                className={styles.editor_textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your content in Markdown..."
            />
            <div className={styles.editor_preview}>
                <h4 className={styles.preview_title}>Preview</h4>
                <div className={styles.preview_content} dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
}
