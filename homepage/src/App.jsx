import React from "react";
import ReactDOM from "react-dom";

import { Container } from "shards-react";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

const App = () => (
    <Container>
        <p>Top Bar</p>
        <h1>Chat</h1>
        <div>Chat Window</div>
        <p>Bottom Bar</p>
    </Container>
);

ReactDOM.render(<App />, document.getElementById("app"));
