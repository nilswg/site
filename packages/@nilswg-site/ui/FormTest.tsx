'use client';

import type { FC } from 'react';
import { useCallback } from 'react';
import { Form } from './Form';

export const FormTest: FC = () => {
    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await fetch('/api/form', {
            method: 'POST',
            body: new FormData(e.currentTarget),
        }).then((resp) => resp.json());

        alert('received: ' + JSON.stringify(data));
    }, []);

    return (
        <div className="mt-navbar flex h-screen items-center placeholder:bg-transparent placeholder-shown:bg-transparent">
            <Form onSubmit={onSubmit}>
                <div className="flex w-full items-center gap-2">
                    <div className="w-full">
                        <Form.Label>Name</Form.Label>
                        <Form.Input type="text" name="name" minLength={6} />
                    </div>
                    <Form.SendButton className="w-[10rem]" text="Send" />
                </div>
            </Form>
        </div>
    );
};
