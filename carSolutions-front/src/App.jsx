import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer'; // Your Footer component

export function App() {
  return (
    <Router>
      <div>
        {/* Other Routes can go here */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
