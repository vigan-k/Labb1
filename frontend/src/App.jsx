import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [planer, setPlaner] = useState([]);
  const [beskrivning, setBeskrivning] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');


  useEffect(() => {
    fetchPlaner();
  }, []);

  const fetchPlaner = async () => {
    try {
      const response = await axios.get('/planer');
      setPlaner(response.data);
    } catch (error) {
      console.error('Error fetching planer:', error);
    }
  };

  const addPlan = async () => {
    try {
      await axios.post('/planer', { beskrivning });
      setBeskrivning('');
      fetchPlaner();
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

  const deletePlan = async (id) => {
    try {
      await axios.delete(`/planer/${id}`);
      fetchPlaner();
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const updatePlan = async () => {
    try {
      await axios.put(`/planer/${editId}`, { beskrivning: editText });
      setEditId(null);
      setEditText('');
      fetchPlaner();
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  return (
    <div>
      <h1>Planer för veckan</h1>
        <input
          type="text"
          placeholder="Lägg till en ny plan"
          value={beskrivning}
          onChange={(e) => setBeskrivning(e.target.value)}
      />
      <button onClick={addPlan}>Lägg till</button>
      <ul>
         {planer.map((plan) => (
          <li key={plan.id}>
            {editId === plan.id ? (
              <div>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={updatePlan}>Spara</button>
                <button onClick={() => setEditId(null)}>Avbryt</button>
              </div>
            ) : (
              <>
                {plan.beskrivning}
                <button onClick={() => {
                  setEditId(plan.id);
                  setEditText(plan.beskrivning);
                }}>Redigera</button>
                <button onClick={() => deletePlan(plan.id)}>Radera</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
