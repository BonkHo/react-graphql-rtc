import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
    useQuery,
} from "@apollo/client";
import { Container } from "shards-react";

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
    return (
        <Container>
            <Messages user="James" />
        </Container>
    );
};

export default () => (
    <ApolloProvider client={client}>
        <Chat />
    </ApolloProvider>
);
