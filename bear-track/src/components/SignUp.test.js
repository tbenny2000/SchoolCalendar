import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import SignUp from './SignUp';

jest.mock('../firebase.js', () => ({
    auth: jest.fn(() =>({
        createUserWithEmailAndPassword: jest.fn(),
    })),
}));

describe('SignUp Component',() =>{
    test('should sign up properly', async() =>{
        const{ getByLabelText, getByText} = render(<SignUp />);

        const Inputemail = getByLabelText('Email:');
        const password = getByLabelText('Password:');

        fireEvent.change(Inputemail,{target: {value: 'ajohnson@ggc.edu' } });
        fireEvent.change(password, {target: {value: 'VEkvMu3k' } });

        const signUpbt = getByText('Sign Up');

        fireEvent.click(signUpbt);

        await waitFor(() => expect(alert).toHaveBeenCalledWith('Successfully sign up'));
    });

    test('this handle sign up should fail', async() => {
        //sim a failing sign up by making up an incorrect createUserWithEmailAndPassword

        jest.spyOn(global.firebase.auth(), 'createUserWithEmailAndPassword').mockRejectValue(new Error('Error detected'));

        const { getByLabelText, getByText} = render(<SignUp />);

        const Inputemail = getByLabelText('Email:');
        const password = getByLabelText('Password:');

        fireEvent.change(Inputemail, { target: {value: 'jgore39@ggc.edu'}});
        fireEvent.change(password, {target: {value: 'JNFKope902*'}});

        const signUpbt = getByText('Sign Up');
        fireEvent.click(signUpbt);

        await waitFor(() => expect(alert).toHaveBeenCalledWith('Error detected'));
    });
});

