import { useState } from 'react';
import BaseNode from './BaseNode';

const normalizeConnectors = (connectors, nodeId, direction) => 
  (connectors || []).map((conn, i) => ({
    ...conn,
    id: `${nodeId}-${direction}-${conn.id || i}`,
    type: conn.type || 'default'
  }));

export const createNode = (config = {}) => ({ id, data = {} }) => (
  <BaseNode
    id={id}
    title={config.title || 'Untitled'}
    inputs={normalizeConnectors(config.inputs, id, 'input')}
    outputs={normalizeConnectors(config.outputs, id, 'output')}
  >
    {typeof config.content === 'function'
      ? config.content(data)
      : config.content}
  </BaseNode>
);

export const createStatefulNode = (config = {}) => {
  if (!config.render) throw new Error('Missing render function');
  
  return function StatefulNode({ id, data = {} }) {
    const [state, setState] = useState(data?.initialState ?? config.initialState);
    return createNode({
      ...config,
      content: config.render(state, setState, data)
    })({ id, data });
  };
};

export const NODE_TEMPLATES = {
  BASIC: (title, content, options) => 
    createNode({ title, content, ...options }),
  IO: (title, inputNames = [], outputNames = [], content = null) =>
    createNode({
      title,
      inputs: inputNames.map(name => ({ id: name })),
      outputs: outputNames.map(name => ({ id: name })),
      content
    })
};