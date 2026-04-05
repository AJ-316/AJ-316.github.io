export type Token = {
    type: "kw" | "num" | "str" | "cmt" | "doc" | "plain";
    value: string;
};

function tokenizeJava(code: string): Token[] {
    const tokens: Token[] = [];

    const patterns = [
        {type: "doc", regex: /\/\*\*[\s\S]*?\*\//y},
        {type: "cmt", regex: /\/\*[\s\S]*?\*\//y},
        {type: "cmt", regex: /\/\/[^\n\r]*/y},
        {type: "str", regex: /"(?:\\.|[^"\\])*"/y},
        {type: "num", regex: /\b\d+\b/y},
        {type: "kw", regex: /\b(public|class|static|void|int|if|else|return|new|extends|package|import)\b/y},
    ];

    let i = 0;

    while (i < code.length) {
        let matched = false;

        for (const p of patterns) {
            p.regex.lastIndex = i;
            const m = p.regex.exec(code);

            if (m && m.index === i) {
                tokens.push({type: p.type as Token["type"], value: m[0]});
                i += m[0].length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            tokens.push({type: "plain", value: code[i]});
            i++;
        }
    }

    return tokens;
}

const CodeView = ({code}: { code: string }) => {
    const tokens = tokenizeJava(code);

    return (
        <pre className="whitespace-pre leading-6 text-lg">
            {tokens.map((t, i) => (
                <span key={i} className={`code-${t.type}`}>
                    {t.value}
                </span>
            ))}
        </pre>
    );
}

export default CodeView;