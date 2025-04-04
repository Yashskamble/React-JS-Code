import {render, screen} from "@testing-library/react"
import RepositoriesListItem from "./RepositoriesListItem"
import { MemoryRouter } from "react-router-dom"



function renderComponent() {
    const repository = {
        full_name: "facebook/react",
        language: "Javascript", 
        description: "A js library", 
        owner : {
            login: "facebook",
        }, 
        name: "react",
        html_url: "https://github.com/facebook/react"
    }
    render(
    <MemoryRouter>
    <RepositoriesListItem repository={repository}/>
    </MemoryRouter>
    )

    return {repository};
}

test("Shows a link to github homepage for this repo", async ()  => {
    const { repository } = renderComponent();
    await screen.findByRole("img", {name: "Javascript"})
    const link  = screen.getByRole("link", { 
        name: /github repository/i,
    })
    expect(link).toHaveAttribute('href', repository.html_url)
})

test("shows a fileicon with appropriate icon", async ()=> {
    renderComponent();

    const icon  = await screen.findByRole('img', {name: 'Javascript'})
    expect(icon).toHaveClass('js-icon')
})
test("Shows a link to code editor page", async ()  => {
    const { repository } = renderComponent();
    await screen.findByRole("img", {name: "Javascript"})
    const link  = await screen.findByRole('link', {
        name: new RegExp(repository.owner.login)
    });
    expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)
})
//