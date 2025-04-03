import { render, screen } from "@testing-library/react";
import AuthButtons from "./AuthButtons";
import { createServer } from "../../test/server";
import { MemoryRouter } from "react-router";
import { SWRConfig } from "swr";
import '@testing-library/jest-dom';

async function renderCompponent() {
    render(
        <SWRConfig value={{provider: ()=>new Map()}}>
        <MemoryRouter>
            <AuthButtons />
        </MemoryRouter>
        </SWRConfig>
    )
    await screen.findAllByRole('link')
}
describe("when user is not signed in", () => {
    createServer([
        {
            path: '/api/user',
            res: () => {
                return { user: null }
            }
        }
    ])

    test("sign in and sign up are visible", async () => {
        await renderCompponent()
        const signInButton = screen.getByRole('link', {
            name: /sign in/i
        })
        const signUpButton = screen.getByRole('link', {
            name: /sign up/i
        })

        expect(signInButton).toBeInTheDocument();
        expect(signInButton).toHaveAttribute('href', '/signin')
        expect(signUpButton).toBeInTheDocument();
        expect(signUpButton).toHaveAttribute('href', '/signup')
    })
    test("sign out is not visible", async () => {
        await renderCompponent()
        const signOutButton = screen.queryByRole('link', {
            name: /sign out/i
        })

        expect(signOutButton).not.toBeInTheDocument();
    })
})

// const pause = () => new Promise((resolve)=> {
//     setTimeout(resolve,100)
// })

describe("when the user is signed in", () => {
    createServer([
        {
            path: '/api/user',
            res: () => {
                return { user: { id: 3, email: "ajknans@gmIL.com" } }
            }
        }
    ])


    test("sign in and sign up are not visible", async () => {
        await renderCompponent()
        const signInButton = screen.queryByRole('link', {
            name: /sign in/i
        })
        const signUpButton = screen.queryByRole('link', {
            name: /sign up/i
        })

        expect(signInButton).not.toBeInTheDocument();
        expect(signUpButton).not.toBeInTheDocument();
    })
    test("sign out is visible", async () => {
        await renderCompponent()
        const signOutButton = screen.getByRole('link', {
            name: /sign out/i
        })

        expect(signOutButton).toBeInTheDocument();
        expect(signOutButton).toHaveAttribute('href', '/signout')
    })
})
