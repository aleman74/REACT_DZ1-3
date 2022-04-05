import './App.css';
import './css/main.css';

import Calendar from "./components/Calendar";


function App() {

    const now = new Date(2022, 2, 8);

    // внутри компонента App:
    return (
        <Calendar date={now} />
    );
}

export default App;
