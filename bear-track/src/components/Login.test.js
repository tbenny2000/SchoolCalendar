import React from "react";
import {render, fireEvent, waitFor, getByLabelText} from '@testing-library/react';
import Login from "./Login";

jest.mock('../firebase.js', () => ({
    auth: jest.fn(() => ({
        signInWithEmailAndPassword: jest.fn(),
    })),
}));

describe('Login Component', () =>{
    test('Should be a successful login', async() =>{
        const { getByLabelText, getByText} = render(<Login />);

        const email = getByLabelText('Email:');
        const password = getByLabelText('Password:');

        fireEvent.change(email, {target: {value: 'bparker@ggc.edu'}});
        fireEvent.change(password, {target: { value: 'v6TsxTGR'}});

        const loginbt = getByText('Login');
        fireEvent.click(loginbt);

        await waitFor(() => expect(alert).toHaveBeenCalledWith('Succesful login'));
    });
});