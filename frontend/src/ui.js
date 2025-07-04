// ui.js
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

/* import ALL node components */
import { InputNode }  from './nodes/inputNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode }   from './nodes/textNode';
import { LLMNode }    from './nodes/llmNode';

import { MathNode }   from './nodes/mathNode';
import { MergeNode }  from './nodes/mergeNode';
import { FilterNode } from './nodes/filterNode';
import { DelayNode }  from './nodes/delayNode';
import { AudioNode }  from './nodes/audioNode';

import 'reactflow/dist/style.css';

const gridSize   = 20;
const proOptions = { hideAttribution: true };

/* 1) map uses the SAME keys users drag / click */
const nodeTypes = {
  input:  InputNode,
  output: OutputNode,
  text:   TextNode,
  llm:    LLMNode,
  math:   MathNode,
  merge:  MergeNode,
  filter: FilterNode,
  delay:  DelayNode,
  audio:  AudioNode,
};

const selector = (s) => ({
  nodes:          s.nodes,
  edges:          s.edges,
  getNodeID:      s.getNodeID,
  addNode:        s.addNode,
  onNodesChange:  s.onNodesChange,
  onEdgesChange:  s.onEdgesChange,
  onConnect:      s.onConnect,
});

export const PipelineUI = () => {
  const refWrapper                 = useRef(null);
  const [rfInstance, setInstance]  = useState(null);
  const {
    nodes, edges,
    getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect,
  } = useStore(selector, shallow);

  const getInitData = (id, type) => ({ id, nodeType: type });

  /* 2) accept drop from sidebar */
  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData('application/reactflow');
      if (!raw || !rfInstance) return;
      const { nodeType: type } = JSON.parse(raw);
      if (!type) return;

      const bounds   = refWrapper.current.getBoundingClientRect();
      const position = rfInstance.project({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });

      const id = getNodeID(type);
      addNode({ id, type, position, data: getInitData(id, type) });
    },
    [rfInstance, getNodeID, addNode]
  );

  return (
    <div ref={refWrapper} style={{ width: '100%', height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}     /* 3) registered here */
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={(e)=>{e.preventDefault(); e.dataTransfer.dropEffect='move';}}
        onInit={setInstance}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
