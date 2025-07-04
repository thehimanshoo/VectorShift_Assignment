import { useState, useEffect, useRef, useMemo } from 'react';
import BaseNode from '../components/BaseNode';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const ref = useRef(null);

  // detect {{variable}} occurrences
  const variables = useMemo(() => {
    return Array.from(
      new Set([...text.matchAll(/\{\{(\w+)\}\}/g)].map(m => m[1]))
    );
  }, [text]);

  // auto‑resize textarea height
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [text]);

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={variables.map(v => ({ id: `${id}-${v}` }))}
      outputs={[{ id: `${id}-output` }]}
    >
      <textarea
        ref={ref}
        value={text}
        onChange={e => setText(e.target.value)}
        rows={1}
        style={{ width: '100%', resize: 'none', overflow: 'hidden' }}
      />
    </BaseNode>
  );
};
