import { useReactFlow } from 'reactflow';

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleSubmit = async () => {
    const payload = JSON.stringify({
      nodes: getNodes().map(({ id, type, data }) => ({ id, type, data })),
      edges: getEdges().map(({ id, source, target }) => ({ id, source, target })),
    });
    console.log("Submitting to backend:", payload);

    const form = new FormData();
    form.append('pipeline', payload);

    const res = await fetch('http://localhost:8000/pipelines/parse', {
      method: 'POST',
      body: form,
    });

    const text = await res.text();   // grab raw response
    console.log('Raw backend response:', text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      alert('Backend did not return valid JSON.');
      return;
    }

    const { num_nodes, num_edges, is_dag, error } = data;
    alert(
      error
        ? `Backend error: ${error}`
        : `Nodes: ${num_nodes}\nEdges: ${num_edges}\nIs DAG: ${is_dag}`
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
