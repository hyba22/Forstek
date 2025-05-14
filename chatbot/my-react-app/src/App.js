import React, { useState } from "react";
import Chat from "./Components/Chat";

function App() {
    const [value, setValue] = useState(10);

    return (
        <div className="App">
            {/* Uncomment these to use other components */}
            {/* <Heading data={"Hello Developers"} value={value} />
            <Para data={"Welcome to the Course"} />
            <p className="display-2">{value}</p>
            <button onClick={() => setValue(value - 1)}> - </button>
            <button onClick={() => setValue(value + 1)}> + </button> */}
            <Chat /> {/* Fixed: Added self-closing tag */}
        </div>
    );
}

export default App;