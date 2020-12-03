import Chat from "./Chat"
import {render, screen} from "@testing-library/react";

test('renders Send Button for Chat Functionality', () => {
    render(<Chat/>);
    const buttonElement = screen.getByText("Send");
    expect(buttonElement).toBeInTheDocument();
});

