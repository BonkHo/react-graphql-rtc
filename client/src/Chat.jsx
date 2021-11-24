import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
    useQuery,
} from "@apollo/client";
import { Container, Row, Col, FormInput, Button } from "shards-react";

const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
});

const getMessages = gql`
    query {
        messages {
            id
            user
            content
        }
    }
`;

const Messages = ({ user }) => {
    const { data } = useQuery(getMessages);
    if (!data) {
        return null;
    }

    return (
        <>
            {data.messages.map(({ id, user: messageUser, content }) => (
                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            user === messageUser ? "flex-end" : "flex-start",
                        paddingBottom: "1em",
                    }}
                >
                    {user !== messageUser && (
                        <div
                            style={{
                                height: 50,
                                width: 50,
                                marginRight: "0.5em",
                                border: "2px solid #e5e6ea",
                                borderRadius: 25,
                                textAlign: "center",
                                fontSize: "18pt",
                                paddingTop: 5,
                            }}
                        >
                            {messageUser.slice(0, 2).toUpperCase()}
                        </div>
                    )}
                    <div
                        style={{
                            background:
                                user === messageUser ? "#58bf56" : "#e5e6ea",
                            color: user === messageUser ? "#FFF" : "#000",
                            padding: "1em",
                            borderRadius: "1em",
                            maxWidth: "60%",
                        }}
                    >
                        {content}
                    </div>
                </div>
            ))}
        </>
    );
};

const Chat = () => {
    const [state, stateSet] = React.useState({
        user: "John",
        content: "",
    });
    return (
        <Container>
            <Messages user={state.user} />
            <Row>
                <Col xs={2} style={{ padding: 0 }}>
                    <FormInput
                        label="User"
                        value={state.user}
                        onChange={(e) =>
                            stateSet({ ...state, user: e.target.value })
                        }
                    />
                </Col>
                <Col xs={8}>
                    <FormInput
                        label="Content"
                        value={state.content}
                        onChange={(e) =>
                            stateSet({ ...state, user: e.target.value })
                        }
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default () => (
    <ApolloProvider client={client}>
        <Chat />
    </ApolloProvider>
);
