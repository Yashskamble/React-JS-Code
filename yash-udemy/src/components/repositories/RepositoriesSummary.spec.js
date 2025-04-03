import {render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

import '@testing-library/jest-dom'

test("display info of repo", ()=>{
    const repository = {
        language: "Javascript",
        stargazers_count: 7,
        forks: 30,
        open_issues: 2
    }

    render(<RepositoriesSummary repository={repository}/>)

    // const language = screen.getByText("Javascript")
    // const stars = screen.getByText(7)
    // expect(language).toBeInTheDocument()
    // expect(stars).toBeInTheDocument()

    for ( let key in repository){
        const val = repository[key];
        const ele = screen.getByText(new RegExp(val))

        expect(ele).toBeInTheDocument()
    }


})
