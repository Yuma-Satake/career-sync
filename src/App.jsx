import { Button } from '@mui/material';

function App() {
  const handleClick = () => {
    alert('Hello World');
  };

  return (
    <>
      <h1>CareerSync</h1>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Hello World
      </Button>
    </>
  );
}

export default App;
