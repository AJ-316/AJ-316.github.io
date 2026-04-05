import {useEffect, useRef, useState} from "react";

interface EditorItemProps {
    html?: string;
    children?: React.ReactNode;
    className?: string;
}

function EditorItem({children, className, html}: EditorItemProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [rows, setRows] = useState(1);

    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        const resizeObserver = new ResizeObserver(() => {
            const height = content.scrollHeight;
            const rowSpan = Math.ceil(height / 24);
            setRows(rowSpan);
        });

        resizeObserver.observe(content);

        return () => resizeObserver.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            style={{gridRow: `span ${rows}`}}
            className={className}
        >
            <div
                ref={contentRef}
                /*dangerouslySetInnerHTML={html ? { __html: html } : undefined}*/
            >
                {children}
            </div>
        </div>
    );
}

export default EditorItem;