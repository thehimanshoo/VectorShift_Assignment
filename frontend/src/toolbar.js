import { useStore } from './store';
import { shallow }  from 'zustand/shallow';

import './toolbar.css';

/** Every node support */
const NODE_TYPES = [
  { type: 'input',  label: 'Input'  },
  { type: 'output', label: 'Output' },
  { type: 'text',   label: 'Text'   },
  { type: 'llm',    label: 'LLM'    },
  { type: 'math',   label: 'Math'   },
  { type: 'filter', label: 'Filter' },
  { type: 'merge',  label: 'Merge'  },
  { type: 'delay',  label: 'Delay'  },
  { type: 'audio',  label: 'Audio'  },
];

const selector = (s) => ({
  getNodeID: s.getNodeID,
  addNode:   s.addNode,
});

export const PipelineToolbar = () => {
  const { getNodeID, addNode } = useStore(selector, shallow);

  /* ---------- drag‑start handler ---------- */
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType })
    );
    e.dataTransfer.effectAllowed = 'move';
  };

  /* ---------- click‑to‑add (drops at 50,50) ---------- */
  const handleClick = (nodeType) => {
    const id = getNodeID(nodeType);
    addNode({
      id,
      type: nodeType,
      position: { x: 50, y: 50 },
      data: { id, nodeType },
    });
  };

  return (
    <div className="vs-toolbar">
      {NODE_TYPES.map((n) => (
        <div
          key={n.type}
          className="vs-toolbar-item"
          draggable
          onDragStart={(e) => onDragStart(e, n.type)}
          onClick={() => handleClick(n.type)}
        >
          {n.label}
        </div>
      ))}
    </div>
  );
};
