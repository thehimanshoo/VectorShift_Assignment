import { useStore } from './store';
import { shallow } from 'zustand/shallow';

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

export const NodeSidebar = () => {
  const { getNodeID, addNode } = useStore(
    (s) => ({ getNodeID: s.getNodeID, addNode: s.addNode }),
    shallow
  );

  /* drag‑and‑drop */
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType })
    );
    e.dataTransfer.effectAllowed = 'move';
  };

  /* single‑click add (drops at 50,50) */
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
    <aside style={{ width: 120, borderRight: '1px solid #ccc', padding: 8 }}>
      {NODE_TYPES.map((n) => (
        <div
          key={n.type}
          draggable
          onDragStart={(e) => onDragStart(e, n.type)}
          onClick={() => handleClick(n.type)}
          style={{
            padding: '6px 4px',
            marginBottom: 6,
            textAlign: 'center',
            border: '1px solid #888',
            borderRadius: 4,
            background: '#f8f8f8',
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          {n.label}
        </div>
      ))}
    </aside>
  );
};
