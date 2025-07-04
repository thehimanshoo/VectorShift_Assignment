import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

/* add nodeIDs={} so getNodeID never reads undefined */
export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    newIDs[type] = (newIDs[type] ?? 0) + 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => set({ nodes: [...get().nodes, node] }),

  onNodesChange: (ch) =>
    set({ nodes: applyNodeChanges(ch, get().nodes) }),
  onEdgesChange: (ch) =>
    set({ edges: applyEdgeChanges(ch, get().edges) }),
  onConnect: (conn) =>
    set({
      edges: addEdge(
        {
          ...conn,
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
        },
        get().edges
      ),
    }),
  updateNodeField: (nodeId, field, value) =>
    set({
      nodes: get().nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, [field]: value } } : n
      ),
    }),
}));
