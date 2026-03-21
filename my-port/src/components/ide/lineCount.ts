import { useEffect, useRef, useState } from "react";

export const useLineCount = (lineHeight: number = 24) => {
    const ref = useRef<HTMLDivElement>(null);
    const [lineCount, setLineCount] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const update = () => {
            const contentHeight = el.scrollHeight; // 🔥 key fix
            setLineCount(Math.ceil(contentHeight / lineHeight));
        };

        update();

        const observer = new ResizeObserver(update);
        observer.observe(el);

        return () => observer.disconnect();
    }, [lineHeight]);

    return { ref, lineCount };
};